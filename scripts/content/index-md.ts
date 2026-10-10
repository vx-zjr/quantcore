// 生成 content/INDEX.md：全部节点的一行式目录，供 AI 低成本获取全局地图。
import fs from 'node:fs';
import path from 'node:path';
import { KINDS, type ContentData } from '../../src/content/types.ts';
import { CONTENT_DIR } from './loader.ts';

export const INDEX_FILE = 'INDEX.md';

export function renderIndex(data: ContentData): string {
  const { taxonomy, nodes } = data;
  const lines: string[] = [
    '# 内容索引',
    '',
    '> 自动生成，请勿手改。运行 `npm run content:index` 更新（dev 服务器运行时会自动更新）。',
    '> 文件路径规则：`content/<dir>/<id>.md`。状态：○ 未开始 ◐ 进行中 ● 已完成。',
    '',
  ];
  const mark = { todo: '○', doing: '◐', done: '●' } as const;
  const counts = KINDS.map((k) => `${taxonomy.kinds[k].label} ${nodes.filter((n) => n.kind === k).length}`);
  lines.push(`共 ${nodes.length} 个节点：${counts.join(' · ')}`, '');

  for (const k of KINDS) {
    const def = taxonomy.kinds[k];
    const list = nodes
      .filter((n) => n.kind === k)
      .sort((a, b) => (a.phase ?? 0) - (b.phase ?? 0) || b.importance - a.importance || a.id.localeCompare(b.id));
    lines.push(`## ${def.label}（${k} · content/${def.dir}/ · ${list.length}）`, '');
    if (!list.length) lines.push('_（空）_');
    for (const n of list) {
      const extra: string[] = [];
      if (n.category) extra.push(taxonomy.categories[k]?.[n.category]?.label ?? n.category);
      if (k === 'skill') extra.push(`L${n.level ?? 0}→L${n.target ?? 0}`);
      if (k === 'source' && n.format) extra.push(taxonomy.formats[n.format]?.label ?? n.format);
      if (n.review) extra.push(`复核 ${n.review}`);
      const st = n.status ? `${mark[n.status]} ` : '';
      const ex = extra.length ? ` _(${extra.join(' · ')})_` : '';
      lines.push(`- ${st}\`${n.id}\` **${n.title}** — ${n.summary}${ex}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

/** 内容变化时才写入，避免触发无意义的文件监听循环。返回是否写入。 */
export function writeIndexIfChanged(root: string, data: ContentData): boolean {
  const file = path.join(root, CONTENT_DIR, INDEX_FILE);
  const next = renderIndex(data);
  const prev = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (prev === next) return false;
  fs.writeFileSync(file, next);
  return true;
}

export function isIndexFresh(root: string, data: ContentData): boolean {
  const file = path.join(root, CONTENT_DIR, INDEX_FILE);
  return fs.existsSync(file) && fs.readFileSync(file, 'utf8') === renderIndex(data);
}
