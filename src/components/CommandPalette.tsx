import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../content/store';
import { nodeHref, searchNodes } from '../content/utils';
import { KindDot } from './ui';

/** ⌘K / Ctrl+K 全局搜索 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { nodes, data } = useContent();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const results = useMemo(() => searchNodes(nodes, q, 20), [nodes, q]);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  const go = (i: number) => {
    const n = results[i];
    if (!n) return;
    navigate(nodeHref(n.id));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[12vh]"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label="搜索"
    >
      <div className="card w-full max-w-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="w-full border-b border-line bg-transparent px-4 py-3 text-base outline-none"
          placeholder="搜索知识、技能、信息源…（↑↓ 选择，Enter 打开，Esc 关闭）"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            }
            if (e.key === 'Enter') go(active);
          }}
        />
        <ul className="max-h-[50vh] overflow-y-auto py-1">
          {q && results.length === 0 && <li className="px-4 py-6 text-center text-sm text-muted">无结果</li>}
          {results.map((n, i) => (
            <li key={n.id}>
              <button
                className={`flex w-full items-start gap-3 px-4 py-2 text-left ${i === active ? 'bg-raised' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(i)}
              >
                <span className="mt-1.5">
                  <KindDot kind={n.kind} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">
                    {n.title}
                    <span className="ml-2 text-xs font-normal text-muted">{data.taxonomy.kinds[n.kind].label}</span>
                  </span>
                  <span className="block truncate text-xs text-ink-2">{n.summary}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
