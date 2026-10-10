import ReactMarkdown, { defaultUrlTransform, type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import { useContent } from '../content/store';
import { taskLineNumbers } from '../content/tasks';

const WIKI_RE = /\[\[([a-z0-9-]+)(?:\|([^\]]*))?\]\]/g;

/** 把 [[id]] / [[id|文字]] 转成普通链接（跳过代码块与行内代码） */
function preprocess(md: string, titleOf: (id: string) => string | undefined) {
  return md
    .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part.replace(WIKI_RE, (_, id: string, text?: string) => {
            const label = text || titleOf(id) || id;
            return `[${label.replace(/[[\]]/g, '')}](wiki:${id})`;
          }),
    )
    .join('');
}

interface Props {
  source: string;
  /** 提供时任务项（- [ ]）可点击勾选，index 为正文中第几个任务项 */
  onToggleTask?: (index: number, checked: boolean) => void;
}

export function Markdown({ source, onToggleTask }: Props) {
  const { byId } = useContent();
  // 任务项所在的源码行号（与 scripts/content/writer.ts 的计数规则一致），用于把点击映射到第几个任务项
  const taskLines = taskLineNumbers(source);
  const components: Components = {
    li({ node, className, children }) {
      return (
        <li className={className} data-line={node?.position?.start.line}>
          {children}
        </li>
      );
    },
    a({ href = '', children }) {
      if (href.startsWith('wiki:')) {
        const id = href.slice(5);
        const ok = byId.has(id);
        return (
          <Link to={`/n/${id}`} className={`wiki${ok ? '' : ' broken'}`} title={ok ? byId.get(id)!.summary : '节点不存在'}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      );
    },
    input({ type, checked }) {
      if (type !== 'checkbox') return <input type={type} />;
      return (
        <input
          type="checkbox"
          checked={!!checked}
          disabled={!onToggleTask}
          onChange={(e) => {
            const line = Number(e.currentTarget.closest<HTMLElement>('li[data-line]')?.dataset.line);
            const idx = taskLines.indexOf(line);
            if (idx >= 0) onToggleTask?.(idx, e.target.checked);
          }}
          style={{ cursor: onToggleTask ? 'pointer' : 'default' }}
        />
      );
    },
  };
  return (
    <div className="prose-qc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
        urlTransform={(url) => (url.startsWith('wiki:') ? url : defaultUrlTransform(url))}
      >
        {preprocess(source, (id) => byId.get(id)?.title)}
      </ReactMarkdown>
    </div>
  );
}
