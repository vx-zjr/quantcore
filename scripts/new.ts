// npm run content:new -- <kind> <id> [标题]
// 基于 content/_meta/templates/<kind>.md 创建新节点，例如：
//   npm run content:new -- knowledge kelly-criterion "凯利公式"
import fs from 'node:fs';
import path from 'node:path';
import { KINDS, type Kind } from '../src/content/types.ts';
import { CONTENT_DIR, META_DIR, loadContent, localToday } from './content/loader.ts';

const [kind, id, ...titleParts] = process.argv.slice(2);
const usage = `用法：npm run content:new -- <${KINDS.join('|')}> <kebab-id> [标题]`;

if (!kind || !id || !(KINDS as readonly string[]).includes(kind)) {
  console.error(usage);
  process.exit(1);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
  console.error(`id 必须是 kebab-case：${id}`);
  process.exit(1);
}

const root = process.cwd();
const data = loadContent(root);
if (data.nodes.some((n) => n.id === id)) {
  console.error(`id 已存在：${id}`);
  process.exit(1);
}
const dir = data.taxonomy.kinds[kind as Kind].dir;
const tpl = path.join(root, CONTENT_DIR, META_DIR, 'templates', `${kind}.md`);
const target = path.join(root, CONTENT_DIR, dir, `${id}.md`);
const title = titleParts.join(' ') || id;
const text = fs
  .readFileSync(tpl, 'utf8')
  .replaceAll('{{id}}', id)
  .replaceAll('{{title}}', title)
  .replaceAll('{{today}}', localToday());
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, text);
console.log(`已创建 ${path.relative(root, target)}，请补全 summary/正文后运行 npm run check`);
