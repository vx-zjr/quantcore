// Vite 插件：
//  1. 提供 `virtual:content` 模块（全部节点 + taxonomy + profile + 健康问题）
//  2. dev 模式监听 content/，变化时推送 `content:update` 事件并自动更新 INDEX.md
//  3. dev 模式提供写回接口：
//     GET  /__api/content          → ContentData
//     POST /__api/nodes/:id        → { patch } 修改允许的 frontmatter 字段
//     POST /__api/nodes/:id/tasks  → { index, checked } 勾选正文第 index 个任务项
//     POST /__api/inbox            → { title, body?, url? } 新建收件箱条目
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin, ViteDevServer } from 'vite';
import type { ContentData, InboxInput, NodePatch } from '../src/content/types.ts';
import { CONTENT_DIR, loadContent } from './content/loader.ts';
import { INDEX_FILE, writeIndexIfChanged } from './content/index-md.ts';
import { createInbox, toggleTask, updateNode } from './content/writer.ts';

const VIRTUAL_ID = 'virtual:content';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function readJson<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      try {
        resolve((raw ? JSON.parse(raw) : {}) as T);
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

export function contentPlugin(): Plugin {
  let root = process.cwd();
  let cache: ContentData | null = null;
  const reload = () => (cache = loadContent(root));
  const current = () => cache ?? reload();

  return {
    name: 'quantcore-content',
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const data = current();
      const errors = data.issues.filter((i) => i.level === 'error');
      if (errors.length && this.environment?.mode === 'build') {
        this.warn(`内容存在 ${errors.length} 个错误，运行 npm run content:check 查看`);
      }
      return `export default ${JSON.stringify(data)};`;
    },
    configureServer(server: ViteDevServer) {
      const contentDir = path.join(root, CONTENT_DIR);
      server.watcher.add(contentDir);

      const push = () => {
        const data = reload();
        writeIndexIfChanged(root, data);
        const graph = server.environments.client.moduleGraph;
        const mod = graph.getModuleById(RESOLVED_ID);
        if (mod) graph.invalidateModule(mod);
        server.ws.send({ type: 'custom', event: 'content:update', data });
        return data;
      };

      let timer: ReturnType<typeof setTimeout> | undefined;
      const onFsEvent = (file: string) => {
        if (!file.startsWith(contentDir) || path.basename(file) === INDEX_FILE) return;
        if (!/\.(md|ya?ml)$/.test(file)) return;
        clearTimeout(timer);
        timer = setTimeout(push, 60);
      };
      server.watcher.on('add', onFsEvent);
      server.watcher.on('change', onFsEvent);
      server.watcher.on('unlink', onFsEvent);

      // 启动时同步一次 INDEX.md
      writeIndexIfChanged(root, current());

      server.middlewares.use('/__api', async (req, res) => {
        try {
          const url = new URL(req.url ?? '/', 'http://local');
          if (req.method === 'GET' && url.pathname === '/content') {
            return send(res, 200, current());
          }
          const nodeMatch = /^\/nodes\/([a-z0-9-]+)$/.exec(url.pathname);
          if (req.method === 'POST' && nodeMatch) {
            const { patch } = await readJson<{ patch: NodePatch }>(req);
            updateNode(root, current(), nodeMatch[1], patch ?? {});
            return send(res, 200, { ok: true, data: push() });
          }
          const taskMatch = /^\/nodes\/([a-z0-9-]+)\/tasks$/.exec(url.pathname);
          if (req.method === 'POST' && taskMatch) {
            const { index, checked } = await readJson<{ index: number; checked: boolean }>(req);
            toggleTask(root, current(), taskMatch[1], Number(index), Boolean(checked));
            return send(res, 200, { ok: true, data: push() });
          }
          if (req.method === 'POST' && url.pathname === '/inbox') {
            const input = await readJson<InboxInput>(req);
            const id = createInbox(root, current(), input);
            return send(res, 200, { ok: true, id, data: push() });
          }
          send(res, 404, { ok: false, error: 'not found' });
        } catch (e) {
          send(res, 400, { ok: false, error: (e as Error).message });
        }
      });
    },
  };
}
