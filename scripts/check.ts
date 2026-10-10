// npm run content:check —— 校验全部内容。有 error 时以非零码退出。
// 用法：npm run content:check [-- --quiet]   （--quiet 隐藏 info 级提示）
import { loadContent } from './content/loader.ts';
import { isIndexFresh } from './content/index-md.ts';

const quiet = process.argv.includes('--quiet');
const root = process.cwd();
const data = loadContent(root);
const issues = [...data.issues];
if (!isIndexFresh(root, data)) {
  issues.unshift({ level: 'error', path: 'content/INDEX.md', message: 'INDEX.md 已过期，运行 npm run content:index' });
}

const icon = { error: '✖', warn: '⚠', info: '·' } as const;
for (const i of issues) {
  if (quiet && i.level === 'info') continue;
  console.log(`${icon[i.level]} [${i.level}] ${i.path ?? ''}${i.nodeId ? ` (${i.nodeId})` : ''}  ${i.message}`);
}

const count = (l: string) => issues.filter((i) => i.level === l).length;
const byKind = new Map<string, number>();
for (const n of data.nodes) byKind.set(n.kind, (byKind.get(n.kind) ?? 0) + 1);
console.log(
  `\n节点 ${data.nodes.length}（${[...byKind].map(([k, v]) => `${k} ${v}`).join(', ')}）` +
    `  错误 ${count('error')}  警告 ${count('warn')}  提示 ${count('info')}`,
);
process.exit(count('error') ? 1 : 0);
