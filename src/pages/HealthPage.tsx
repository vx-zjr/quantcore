import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyButton, Empty, PageHeader, Section } from '../components/ui';
import { useContent } from '../content/store';
import type { IssueLevel } from '../content/types';
import { aiPrompt, nodeHref } from '../content/utils';

const LEVEL: Record<IssueLevel, { icon: string; label: string; color: string }> = {
  error: { icon: '✖', label: '错误', color: 'var(--color-critical)' },
  warn: { icon: '▲', label: '警告', color: 'var(--color-warning)' },
  info: { icon: '●', label: '提示', color: 'var(--color-muted)' },
};

export function HealthPage() {
  const { data, nodes, byId } = useContent();
  const [level, setLevel] = useState<IssueLevel | ''>('');
  const issues = data.issues.filter((i) => !level || i.level === level);
  const stale = nodes.filter((n) => n.stale);
  const soon = nodes
    .filter((n) => n.review && !n.stale)
    .sort((a, b) => (a.review ?? '').localeCompare(b.review ?? ''))
    .slice(0, 8);
  const lowConf = nodes.filter((n) => n.confidence === 'low');
  // 信息源本就应简短，阈值更低
  const short = nodes
    .filter((n) => n.kind !== 'inbox' && n.chars < (n.kind === 'source' ? 150 : 300))
    .sort((a, b) => a.chars - b.chars);
  const count = (l: IssueLevel) => data.issues.filter((i) => i.level === l).length;
  const errorLines = data.issues
    .filter((i) => i.level !== 'info')
    .map((i) => `${i.path ?? ''} ${i.message}`);

  return (
    <div className="space-y-5">
      <PageHeader
        title="内容维护"
        desc={
          <>
            校验结果与 <code className="rounded bg-raised px-1">npm run content:check</code> 一致。每个区块都可以一键复制给 AI
            的指令，粘贴到 Claude Code / Codex / Cursor 即可执行。
          </>
        }
      />

      <div className="flex flex-wrap gap-2">
        {(['', 'error', 'warn', 'info'] as const).map((l) => (
          <button
            key={l || 'all'}
            className={`chip cursor-pointer ${level === l ? 'bg-raised !text-ink' : ''}`}
            onClick={() => setLevel(l)}
            aria-pressed={level === l}
          >
            {l ? (
              <>
                <span style={{ color: LEVEL[l].color }}>{LEVEL[l].icon}</span> {LEVEL[l].label}{' '}
                <span className="tabular">{count(l)}</span>
              </>
            ) : (
              <>全部 {data.issues.length}</>
            )}
          </button>
        ))}
        {errorLines.length > 0 && (
          <CopyButton text={aiPrompt('fix-issues', errorLines)} label="复制修复指令" className="ml-auto !py-1 text-xs" />
        )}
      </div>

      <Section title="校验问题">
        {issues.length === 0 ? (
          <Empty>
            <span style={{ color: 'var(--color-good)' }}>✓</span> 没有问题
          </Empty>
        ) : (
          <ul className="divide-y divide-line text-sm">
            {issues.map((i, idx) => (
              <li key={idx} className="flex gap-3 py-2">
                <span style={{ color: LEVEL[i.level].color }} aria-label={LEVEL[i.level].label}>
                  {LEVEL[i.level].icon}
                </span>
                <div className="min-w-0">
                  <div>{i.message}</div>
                  <div className="text-xs text-muted">
                    {i.nodeId && byId.has(i.nodeId) ? (
                      <Link to={nodeHref(i.nodeId)} className="hover:underline">
                        {i.path}
                      </Link>
                    ) : (
                      i.path
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <div className="grid gap-5 lg:grid-cols-2">
        <Section
          title={`已过复核日期（${stale.length}）`}
          right={stale.length > 0 && <CopyButton text={aiPrompt('review-stale', stale)} label="复制 AI 指令" className="!py-1 text-xs" />}
        >
          {stale.length === 0 ? (
            <div>
              <p className="text-sm text-ink-2">暂无过期节点。即将到期：</p>
              <ul className="mt-2 space-y-1 text-sm">
                {soon.map((n) => (
                  <li key={n.id} className="flex justify-between gap-2">
                    <Link to={nodeHref(n.id)} className="truncate hover:underline">
                      {n.title}
                    </Link>
                    <span className="shrink-0 text-xs text-muted tabular">{n.review}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="space-y-1 text-sm">
              {stale.map((n) => (
                <li key={n.id} className="flex justify-between gap-2">
                  <Link to={nodeHref(n.id)} className="truncate hover:underline">
                    {n.title}
                  </Link>
                  <span className="shrink-0 text-xs tabular" style={{ color: 'var(--color-critical)' }}>
                    {n.review}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title={`低置信度内容（${lowConf.length}）`}
          right={lowConf.length > 0 && <CopyButton text={aiPrompt('verify', lowConf)} label="复制核实指令" className="!py-1 text-xs" />}
        >
          {lowConf.length === 0 ? (
            <Empty>无</Empty>
          ) : (
            <ul className="space-y-1 text-sm">
              {lowConf.map((n) => (
                <li key={n.id}>
                  <Link to={nodeHref(n.id)} className="hover:underline">
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title={`篇幅较短，可扩写（${short.length}）`}
          right={
            short.length > 0 && (
              <CopyButton text={aiPrompt('expand', short.slice(0, 8))} label="复制扩写指令（前 8 个）" className="!py-1 text-xs" />
            )
          }
          className="lg:col-span-2"
        >
          {short.length === 0 ? (
            <Empty>无</Empty>
          ) : (
            <ul className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              {short.map((n) => (
                <li key={n.id} className="flex justify-between gap-2">
                  <Link to={nodeHref(n.id)} className="truncate hover:underline">
                    {n.title}
                  </Link>
                  <span className="shrink-0 text-xs text-muted tabular">{n.chars} 字</span>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
}
