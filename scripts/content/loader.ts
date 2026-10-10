// 读取 content/ 下全部节点，解析 frontmatter、校验、计算反向链接与健康问题。
// 被三处复用：Vite 插件（dev/build）、scripts/check.ts、scripts/index.ts。
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import {
  KINDS,
  type ContentData,
  type Issue,
  type Kind,
  type Profile,
  type QNode,
  type Taxonomy,
} from '../../src/content/types.ts';
import { buildNodeSchema, KNOWN_FIELDS } from './schema.ts';

export const CONTENT_DIR = 'content';
export const META_DIR = '_meta';

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const WIKI_RE = /\[\[([a-z0-9-]+)(?:\|[^\]]*)?\]\]/g;

/** 本地日期 YYYY-MM-DD */
export function localToday(): string {
  return new Date().toLocaleDateString('sv-SE');
}

export function splitFrontmatter(raw: string): { fm: string; body: string } | null {
  const m = FM_RE.exec(raw);
  return m ? { fm: m[1], body: m[2] } : null;
}

function readYaml<T>(file: string): T {
  return YAML.parse(fs.readFileSync(file, 'utf8')) as T;
}

/** YAML 里未加引号的日期可能被解析成 Date，统一转回字符串 */
function normalizeDates(obj: Record<string, unknown>) {
  for (const [k, v] of Object.entries(obj)) {
    if (v instanceof Date) obj[k] = v.toISOString().slice(0, 10);
  }
}

function listMarkdown(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.md'))
    .map((d) => path.join(d.parentPath, d.name))
    .sort();
}

export function loadContent(root: string = process.cwd()): ContentData {
  const contentDir = path.join(root, CONTENT_DIR);
  const metaDir = path.join(contentDir, META_DIR);
  const taxonomy = readYaml<Taxonomy>(path.join(metaDir, 'taxonomy.yaml'));
  const profile = readYaml<Profile>(path.join(metaDir, 'profile.yaml')) ?? {};
  const today = localToday();
  const schema = buildNodeSchema(taxonomy);
  const issues: Issue[] = [];
  const nodes: QNode[] = [];

  const dirToKind = new Map<string, Kind>();
  for (const k of KINDS) {
    const def = taxonomy.kinds[k];
    if (!def) issues.push({ level: 'error', message: `taxonomy.yaml 缺少 kinds.${k}` });
    else dirToKind.set(def.dir, k);
  }

  for (const dirName of dirToKind.keys()) {
    for (const abs of listMarkdown(path.join(contentDir, dirName))) {
      const rel = path.relative(root, abs).split(path.sep).join('/');
      const raw = fs.readFileSync(abs, 'utf8');
      const split = splitFrontmatter(raw);
      if (!split) {
        issues.push({ level: 'error', path: rel, message: '缺少 frontmatter（文件需以 --- 开头）' });
        continue;
      }
      let fm: Record<string, unknown>;
      try {
        fm = (YAML.parse(split.fm) ?? {}) as Record<string, unknown>;
      } catch (e) {
        issues.push({ level: 'error', path: rel, message: `frontmatter YAML 解析失败：${(e as Error).message}` });
        continue;
      }
      normalizeDates(fm);

      const result = schema.safeParse(fm);
      const data = (result.success ? result.data : fm) as Record<string, unknown>;
      if (!result.success) {
        for (const iss of result.error.issues) {
          issues.push({
            level: 'error',
            path: rel,
            nodeId: typeof fm.id === 'string' ? fm.id : undefined,
            message: `${iss.path.join('.') || '(root)'}: ${iss.message}`,
          });
        }
      }
      if (typeof data.id !== 'string' || typeof data.title !== 'string' || typeof data.kind !== 'string') {
        continue; // 无法作为节点展示
      }
      const id = data.id;
      const fileId = path.basename(abs, '.md');
      if (fileId !== id) {
        issues.push({ level: 'error', path: rel, nodeId: id, message: `id「${id}」与文件名「${fileId}」不一致` });
      }
      const expectedKind = dirToKind.get(dirName);
      if (data.kind !== expectedKind) {
        issues.push({
          level: 'error',
          path: rel,
          nodeId: id,
          message: `kind「${String(data.kind)}」与所在目录 ${dirName}/（应为 ${expectedKind}）不一致`,
        });
      }
      for (const key of Object.keys(fm)) {
        if (!KNOWN_FIELDS.includes(key)) {
          issues.push({
            level: 'warn',
            path: rel,
            nodeId: id,
            message: `未知字段「${key}」（拼写错误？新增字段需同步 types.ts/schema.ts/AGENTS.md）`,
          });
        }
      }

      const body = split.body.trim();
      const mentions = [...new Set([...body.matchAll(WIKI_RE)].map((m) => m[1]))];
      const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
      nodes.push({
        ...(data as Partial<QNode>),
        id,
        title: data.title,
        kind: data.kind as Kind,
        summary: typeof data.summary === 'string' ? data.summary : '',
        domains: arr(data.domains),
        tags: arr(data.tags),
        related: arr(data.related),
        prereqs: arr(data.prereqs),
        importance: typeof data.importance === 'number' ? data.importance : 3,
        confidence: (data.confidence as QNode['confidence']) ?? 'medium',
        path: rel,
        body,
        mentions,
        backlinks: [],
        stale: typeof data.review === 'string' && data.review < today,
        chars: body.replace(/\s+/g, '').length,
      });
    }
  }

  // —— 跨节点检查 ——
  const byId = new Map<string, QNode>();
  for (const n of nodes) {
    const prev = byId.get(n.id);
    if (prev) {
      issues.push({ level: 'error', nodeId: n.id, path: n.path, message: `id 重复（另见 ${prev.path}）` });
    } else byId.set(n.id, n);
  }

  const back = new Map<string, Set<string>>();
  for (const n of nodes) {
    const refs: [string, string[]][] = [
      ['related', n.related],
      ['prereqs', n.prereqs],
      ['正文 [[链接]]', n.mentions],
    ];
    for (const [field, ids] of refs) {
      for (const target of ids) {
        if (target === n.id) {
          issues.push({ level: 'warn', nodeId: n.id, path: n.path, message: `${field} 引用了自身` });
        } else if (!byId.has(target)) {
          issues.push({ level: 'error', nodeId: n.id, path: n.path, message: `${field} 指向不存在的节点「${target}」` });
        } else {
          if (!back.has(target)) back.set(target, new Set());
          back.get(target)!.add(n.id);
        }
      }
    }
  }
  for (const n of nodes) {
    n.backlinks = [...(back.get(n.id) ?? [])].sort();
    if (n.stale) {
      issues.push({ level: 'warn', nodeId: n.id, path: n.path, message: `已过复核日期 ${n.review}，需核实时效性内容` });
    }
    const degree = n.related.length + n.prereqs.length + n.mentions.length + n.backlinks.length;
    if (degree === 0 && n.kind !== 'inbox' && n.kind !== 'journal') {
      issues.push({ level: 'info', nodeId: n.id, path: n.path, message: '孤立节点：没有任何关联，考虑补充 related' });
    }
    if (n.chars < 40 && n.kind !== 'inbox') {
      issues.push({ level: 'info', nodeId: n.id, path: n.path, message: '正文过短，待扩写' });
    }
  }

  const order: Record<Issue['level'], number> = { error: 0, warn: 1, info: 2 };
  issues.sort((a, b) => order[a.level] - order[b.level] || (a.path ?? '').localeCompare(b.path ?? ''));
  nodes.sort((a, b) => a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));

  return { today, taxonomy, profile, nodes, issues };
}
