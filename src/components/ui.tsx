import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../content/store';
import type { Kind, QNode, Status } from '../content/types';
import { kindColor, nodeHref } from '../content/utils';

export function KindDot({ kind, size = 8 }: { kind: Kind; size?: number }) {
  const { data } = useContent();
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, background: kindColor(data.taxonomy, kind) }}
    />
  );
}

export function KindChip({ kind }: { kind: Kind }) {
  const { data } = useContent();
  return (
    <span className="chip">
      <KindDot kind={kind} />
      {data.taxonomy.kinds[kind]?.label ?? kind}
    </span>
  );
}

/** 状态图标：空心圈 / 半填充 / 实心（SVG，避免字体对 ◐ 的渲染差异） */
export function StatusIcon({ status }: { status?: Status }) {
  if (!status) return null;
  const c = status === 'todo' ? 'var(--color-muted)' : 'var(--color-accent)';
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="inline-block align-[-1px]">
      <circle cx="5" cy="5" r="4" fill={status === 'done' ? c : 'none'} stroke={c} strokeWidth="1.5" />
      {status === 'doing' && <path d="M5 1 A4 4 0 0 0 5 9 Z" fill={c} />}
    </svg>
  );
}

/** 状态切换：dev 模式可写回文件，只读模式显示徽标 */
export function StatusControl({ node, compact }: { node: QNode; compact?: boolean }) {
  const { data, editable, updateNode } = useContent();
  const [busy, setBusy] = useState(false);
  const statuses = data.taxonomy.statuses;
  if (!node.status && !editable) return null;
  if (!editable) {
    return (
      <span className="chip">
        <StatusIcon status={node.status} />
        {statuses[node.status!]?.label}
      </span>
    );
  }
  const set = async (s: Status) => {
    if (s === node.status) return;
    setBusy(true);
    try {
      await updateNode(node.id, { status: s });
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div role="radiogroup" aria-label="进度" className="inline-flex rounded-lg border border-line p-0.5 text-xs">
      {(Object.keys(statuses) as Status[]).map((s) => (
        <button
          key={s}
          role="radio"
          aria-checked={node.status === s}
          disabled={busy}
          onClick={() => void set(s)}
          className={`rounded-md px-2 py-0.5 transition-colors ${
            node.status === s ? 'bg-raised text-ink font-medium' : 'text-muted hover:text-ink'
          }`}
          title={statuses[s].label}
        >
          <StatusIcon status={s} />
          {!compact && <span className="ml-1">{statuses[s].label}</span>}
        </button>
      ))}
    </div>
  );
}

/** 1-5 分值（评分/重要度），dev 模式可点击修改 */
export function Score({
  value,
  max = 5,
  onChange,
  label,
}: {
  value: number;
  max?: number;
  onChange?: (v: number) => void;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${label} ${value}/${max}`} title={`${label} ${value}/${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const on = i < value;
        const dot = (
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: on ? 'var(--color-accent)' : 'var(--color-grid)' }}
          />
        );
        return onChange ? (
          <button key={i} className="p-0.5" onClick={() => onChange(i + 1)} aria-label={`${label}设为 ${i + 1}`}>
            {dot}
          </button>
        ) : (
          <span key={i} className="p-0.5">
            {dot}
          </span>
        );
      })}
    </span>
  );
}

export function NodeLink({ id, className = '' }: { id: string; className?: string }) {
  const { byId } = useContent();
  const n = byId.get(id);
  if (!n) return <span className="text-critical">{id}（不存在）</span>;
  return (
    <Link to={nodeHref(id)} className={`inline-flex items-center gap-1.5 hover:underline ${className}`}>
      <KindDot kind={n.kind} />
      <span>{n.title}</span>
    </Link>
  );
}

export function Section({
  title,
  right,
  children,
  className = '',
}: {
  title: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`card min-w-0 p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="section-title">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({ title, desc, right }: { title: string; desc?: ReactNode; right?: ReactNode }) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {desc && <p className="mt-1 max-w-3xl text-sm text-ink-2">{desc}</p>}
      </div>
      {right}
    </header>
  );
}

/** 进度条：done 深色 + doing 浅色，未开始为轨道 */
export function ProgressBar({ done, doing, total }: { done: number; doing: number; total: number }) {
  const pct = (v: number) => (total ? (v / total) * 100 : 0);
  return (
    <div
      className="flex h-2 w-full overflow-hidden rounded-full"
      style={{ background: 'var(--color-grid)' }}
      role="img"
      aria-label={`已完成 ${done}，进行中 ${doing}，共 ${total}`}
    >
      <div style={{ width: `${pct(done)}%`, background: 'var(--color-prog-done)' }} />
      {doing > 0 && (
        <div
          style={{
            width: `${pct(doing)}%`,
            background: 'var(--color-prog-doing)',
            borderLeft: done ? '2px solid var(--color-surface)' : undefined,
          }}
        />
      )}
    </div>
  );
}

export function CopyButton({ text, label = '复制', className = '' }: { text: string; label?: string; className?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      className={`btn ${className}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
    >
      {ok ? '✓ 已复制' : label}
    </button>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="py-6 text-center text-sm text-muted">{children}</p>;
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-ink-2">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
    </div>
  );
}
