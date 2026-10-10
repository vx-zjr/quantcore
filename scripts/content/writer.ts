// 写回 frontmatter / 新建收件箱条目。保留 YAML 原有顺序与注释，只改动指定字段。
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import {
  EDITABLE_FIELDS,
  STATUSES,
  type ContentData,
  type InboxInput,
  type NodePatch,
} from '../../src/content/types.ts';
import { CONTENT_DIR, localToday, splitFrontmatter } from './loader.ts';

function validatePatch(patch: NodePatch): string | null {
  for (const [k, v] of Object.entries(patch)) {
    if (!(EDITABLE_FIELDS as readonly string[]).includes(k)) return `字段 ${k} 不允许从 UI 修改`;
    if (k === 'status' && !(STATUSES as readonly string[]).includes(v as string)) return `status 非法：${v}`;
    if (k === 'level' || k === 'target') {
      if (!Number.isInteger(v) || (v as number) < 0 || (v as number) > 5) return `${k} 必须是 0-5 的整数`;
    }
    if (k === 'rating' || k === 'importance') {
      if (!Number.isInteger(v) || (v as number) < 1 || (v as number) > 5) return `${k} 必须是 1-5 的整数`;
    }
  }
  return null;
}

export function updateNode(root: string, data: ContentData, id: string, patch: NodePatch): void {
  const node = data.nodes.find((n) => n.id === id);
  if (!node) throw new Error(`节点不存在：${id}`);
  const err = validatePatch(patch);
  if (err) throw new Error(err);

  const abs = path.resolve(root, node.path);
  if (!abs.startsWith(path.resolve(root, CONTENT_DIR) + path.sep)) throw new Error('非法路径');
  const raw = fs.readFileSync(abs, 'utf8');
  const split = splitFrontmatter(raw);
  if (!split) throw new Error('文件缺少 frontmatter');

  const doc = YAML.parseDocument(split.fm);
  for (const [k, v] of Object.entries(patch)) doc.set(k, v);
  doc.set('updated', localToday());
  const fm = doc.toString({ lineWidth: 0, flowCollectionPadding: false }).trimEnd();
  const body = split.body.startsWith('\n') ? split.body : `\n${split.body}`;
  fs.writeFileSync(abs, `---\n${fm}\n---\n${body}`);
}

// 与 src/content/tasks.ts 的 TASK_RE 保持一致
const TASK_RE = /^(\s*[-*+] \[)([ xX])(\] )/;

/** 勾选/取消正文中第 index 个任务项（- [ ] / - [x]），跳过代码块 */
export function toggleTask(root: string, data: ContentData, id: string, index: number, checked: boolean): void {
  const node = data.nodes.find((n) => n.id === id);
  if (!node) throw new Error(`节点不存在：${id}`);
  const abs = path.resolve(root, node.path);
  const raw = fs.readFileSync(abs, 'utf8');
  const split = splitFrontmatter(raw);
  if (!split) throw new Error('文件缺少 frontmatter');

  const lines = split.body.split('\n');
  let inFence = false;
  let i = -1;
  let hit = false;
  for (let li = 0; li < lines.length; li++) {
    if (/^\s*```/.test(lines[li])) inFence = !inFence;
    if (inFence || !TASK_RE.test(lines[li])) continue;
    if (++i === index) {
      lines[li] = lines[li].replace(TASK_RE, `$1${checked ? 'x' : ' '}$3`);
      hit = true;
      break;
    }
  }
  if (!hit) throw new Error(`第 ${index} 个任务项不存在`);

  const doc = YAML.parseDocument(split.fm);
  doc.set('updated', localToday());
  const fm = doc.toString({ lineWidth: 0, flowCollectionPadding: false }).trimEnd();
  const body = lines.join('\n');
  fs.writeFileSync(abs, `---\n${fm}\n---\n${body.startsWith('\n') ? body : `\n${body}`}`);
}

export function createInbox(root: string, data: ContentData, input: InboxInput): string {
  const title = input.title?.trim();
  if (!title) throw new Error('标题不能为空');
  const dir = data.taxonomy.kinds.inbox.dir;
  const now = new Date();
  const stamp = now.toLocaleString('sv-SE').replace(/[-: ]/g, '').slice(0, 14); // YYYYMMDDHHmmss
  let id = `inbox-${stamp}`;
  let i = 2;
  while (data.nodes.some((n) => n.id === id)) id = `inbox-${stamp}-${i++}`;

  const body = (input.body ?? '').trim();
  const fm = new YAML.Document({
    id,
    title,
    kind: 'inbox',
    summary: (body.split('\n')[0] || title).slice(0, 120),
    status: 'todo',
    created: localToday(),
    tags: [],
  });
  const lines = [body];
  if (input.url) lines.push('', `链接：<${input.url}>`);
  lines.push('', '<!-- 待 AI 按 playbooks/process-inbox.md 处理：归类为正式节点后将 status 置为 done 或删除本文件 -->');
  const file = path.join(root, CONTENT_DIR, dir, `${id}.md`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `---\n${fm.toString({ lineWidth: 0, flowCollectionPadding: false }).trimEnd()}\n---\n\n${lines.join('\n').trim()}\n`);
  return id;
}
