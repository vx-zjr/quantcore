// npm run content:index —— 重新生成 content/INDEX.md
import { loadContent } from './content/loader.ts';
import { writeIndexIfChanged } from './content/index-md.ts';

const root = process.cwd();
const data = loadContent(root);
const changed = writeIndexIfChanged(root, data);
console.log(changed ? `已更新 content/INDEX.md（${data.nodes.length} 个节点）` : 'content/INDEX.md 已是最新');
