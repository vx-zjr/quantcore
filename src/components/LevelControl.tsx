import { useState } from 'react';
import { useContent } from '../content/store';
import type { QNode } from '../content/types';

/** 技能等级 0-5：dev 模式可点击写回 level / target */
export function LevelControl({ node, field }: { node: QNode; field: 'level' | 'target' }) {
  const { data, editable, updateNode } = useContent();
  const [busy, setBusy] = useState(false);
  const value = node[field] ?? 0;
  const levels = data.taxonomy.levels;
  const name = field === 'level' ? '当前' : '目标';
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label={`${name}等级`}>
      <span className="w-8 text-xs text-ink-2">{name}</span>
      {[0, 1, 2, 3, 4, 5].map((v) => {
        const on = v === value;
        const cls = `h-6 w-6 rounded-md border text-xs tabular transition-colors ${
          on ? 'border-transparent font-semibold text-white' : 'border-line text-ink-2'
        } ${editable && !on ? 'hover:bg-raised' : ''}`;
        const style = on ? { background: field === 'level' ? 'var(--color-k1)' : 'var(--color-k2)' } : undefined;
        const title = `L${v} ${levels[String(v)]?.label ?? ''}${levels[String(v)]?.desc ? '：' + levels[String(v)]?.desc : ''}`;
        return editable ? (
          <button
            key={v}
            role="radio"
            aria-checked={on}
            disabled={busy}
            className={cls}
            style={style}
            title={title}
            onClick={async () => {
              if (on) return;
              setBusy(true);
              try {
                await updateNode(node.id, { [field]: v });
              } catch (e) {
                alert((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            {v}
          </button>
        ) : (
          <span key={v} className={`${cls} inline-flex items-center justify-center`} style={style} title={title}>
            {v}
          </span>
        );
      })}
    </div>
  );
}
