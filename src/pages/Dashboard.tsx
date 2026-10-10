import { Link } from 'react-router-dom';
import { InboxCapture } from '../components/InboxCapture';
import { KindDot, NodeLink, PageHeader, ProgressBar, Section, Stat, StatusControl } from '../components/ui';
import { useContent } from '../content/store';
import { KINDS } from '../content/types';
import { nextSteps, nodeHref, profileCompleteness, skillGap, statusCounts } from '../content/utils';

export function Dashboard() {
  const { data, byKind, byId, nodes } = useContent();
  const t = data.taxonomy;
  const profile = data.profile;

  const phases = [...byKind('roadmap')].sort((a, b) => (a.phase ?? 0) - (b.phase ?? 0));
  const current = phases.find((p) => p.status === 'doing') ?? phases.find((p) => p.status !== 'done');
  const skills = byKind('skill');
  const avg = (f: (n: (typeof skills)[number]) => number) =>
    skills.length ? (skills.reduce((s, n) => s + f(n), 0) / skills.length).toFixed(1) : '–';
  const gaps = [...skills].sort((a, b) => skillGap(b) * b.importance - skillGap(a) * a.importance).slice(0, 6);
  const pc = profileCompleteness(profile);
  const openQs = Array.isArray(profile.open_questions) ? (profile.open_questions as string[]) : [];
  const inboxTodo = byKind('inbox').filter((n) => n.status !== 'done');
  const errors = data.issues.filter((i) => i.level === 'error').length;
  const warns = data.issues.filter((i) => i.level === 'warn').length;
  const stale = nodes.filter((n) => n.stale).length;
  const recent = [...nodes]
    .filter((n) => n.updated)
    .sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? ''))
    .slice(0, 6);
  const steps = nextSteps(data, byId);

  const k = statusCounts(byKind('knowledge'));
  const m = statusCounts(byKind('mindset'));
  const sources = byKind('source');
  const s = statusCounts(sources);

  return (
    <div className="space-y-5">
      <PageHeader
        title="总览"
        desc="个人量化中心：先建立判断力，再写代码。所有内容都是 content/ 下的 Markdown 文件，AI 按 AGENTS.md 持续维护。"
      />

      {current && (
        <Link to={nodeHref(current.id)} className="card block p-5 hover:bg-raised">
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
            <KindDot kind="roadmap" />
            当前阶段 · Phase {current.phase}
            <span className="text-muted">
              （共 {phases.length} 个阶段，已完成 {phases.filter((p) => p.status === 'done').length}）
            </span>
          </div>
          <div className="mt-1 text-lg font-semibold">{current.title}</div>
          <p className="mt-1 text-sm text-ink-2">{current.summary}</p>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="知识点掌握" value={`${k.done} / ${k.done + k.doing + k.todo}`} sub={`学习中 ${k.doing}`} />
        <Stat label="技能平均等级" value={`L${avg((n) => n.level ?? 0)}`} sub={`目标均值 L${avg((n) => n.target ?? 0)}`} />
        <Stat label="信息源已消化" value={`${s.done} / ${sources.length}`} sub={`在读/在用 ${s.doing}`} />
        <Stat
          label="待处理"
          value={inboxTodo.length + stale}
          sub={`收件箱 ${inboxTodo.length} · 待复核 ${stale}`}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <div className="min-w-0 space-y-5 lg:col-span-3">
          <Section title="学习进度">
            <div className="space-y-3">
              {[
                { kind: 'knowledge' as const, c: k, to: '/knowledge' },
                { kind: 'mindset' as const, c: m, to: '/mindset' },
                { kind: 'source' as const, c: s, to: '/sources' },
              ].map(({ kind, c, to }) => {
                const total = c.todo + c.doing + c.done;
                return (
                  <Link key={kind} to={to} className="block">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <KindDot kind={kind} /> {t.kinds[kind].label}
                      </span>
                      <span className="text-xs text-ink-2 tabular">
                        完成 {c.done} · 进行中 {c.doing} · 共 {total}
                      </span>
                    </div>
                    <ProgressBar done={c.done} doing={c.doing} total={total} />
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 flex gap-4 text-[11px] text-muted">
              <span className="flex items-center gap-1">
                <i className="inline-block h-2 w-3 rounded-sm" style={{ background: 'var(--color-prog-done)' }} /> 已完成
              </span>
              <span className="flex items-center gap-1">
                <i className="inline-block h-2 w-3 rounded-sm" style={{ background: 'var(--color-prog-doing)' }} /> 进行中
              </span>
              <span className="flex items-center gap-1">
                <i className="inline-block h-2 w-3 rounded-sm" style={{ background: 'var(--color-grid)' }} /> 未开始
              </span>
            </div>
          </Section>

          <Section title="建议下一步学习" right={<span className="text-xs text-muted">重要度高且前置已满足</span>}>
            <ul className="divide-y divide-line">
              {steps.map((n) => (
                <li key={n.id} className="flex items-center justify-between gap-3 py-2">
                  <div className="min-w-0 flex-1">
                    <NodeLink id={n.id} className="font-medium" />
                    <p className="truncate text-xs text-ink-2">{n.summary}</p>
                  </div>
                  <div className="shrink-0">
                    <StatusControl node={n} compact />
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            title="技能差距 Top 6"
            right={
              <Link to="/skills" className="text-xs text-accent-ink hover:underline">
                全部技能 →
              </Link>
            }
          >
            <ul className="space-y-2.5">
              {gaps.map((n) => (
                <li key={n.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <NodeLink id={n.id} />
                    <span className="text-xs text-ink-2 tabular">
                      L{n.level ?? 0} → L{n.target ?? 0}
                    </span>
                  </div>
                  <SkillBar level={n.level ?? 0} target={n.target ?? 0} />
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="min-w-0 space-y-5 lg:col-span-2">
          <Section
            title="我的画像"
            right={<span className="text-xs text-muted tabular">已填 {pc.filled}/{pc.total}</span>}
          >
            {pc.filled < pc.total ? (
              <div className="space-y-2 text-sm">
                <p className="text-ink-2">
                  画像决定了哪些策略、工具和路径适合你。编辑 <code className="rounded bg-raised px-1">content/_meta/profile.yaml</code>
                  ，或把下面的问题交给 AI 与你逐一确认：
                </p>
                <ul className="list-disc space-y-1 pl-5 text-ink-2">
                  {openQs.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <dl className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries(profile)
                  .filter(([key]) => key !== 'open_questions')
                  .map(([key, v]) => (
                    <div key={key} className="contents">
                      <dt className="text-ink-2">{key}</dt>
                      <dd className="col-span-2">{Array.isArray(v) ? v.join('、') : String(v)}</dd>
                    </div>
                  ))}
              </dl>
            )}
          </Section>

          <Section title="随手记录 → 收件箱">
            <InboxCapture />
          </Section>

          <Section
            title="内容健康"
            right={
              <Link to="/health" className="text-xs text-accent-ink hover:underline">
                详情 →
              </Link>
            }
          >
            <ul className="space-y-1 text-sm">
              <li>
                <span style={{ color: 'var(--color-critical)' }}>✖</span> 错误 <b className="tabular">{errors}</b>
                <span className="ml-4" style={{ color: 'var(--color-warning)' }}>
                  ▲
                </span>{' '}
                警告 <b className="tabular">{warns}</b>
              </li>
              <li className="text-xs text-ink-2">
                {KINDS.map((kk) => `${t.kinds[kk].label} ${byKind(kk).length}`).join(' · ')}
              </li>
            </ul>
          </Section>

          <Section title="最近更新">
            <ul className="space-y-1.5 text-sm">
              {recent.map((n) => (
                <li key={n.id} className="flex items-center justify-between gap-2">
                  <NodeLink id={n.id} className="min-w-0 truncate" />
                  <span className="shrink-0 text-xs text-muted tabular">{n.updated}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

/** 子弹图：实心条=当前等级，竖线=目标等级 */
export function SkillBar({ level, target }: { level: number; target: number }) {
  return (
    <div
      className="relative h-2 w-full rounded-full"
      style={{ background: 'var(--color-grid)' }}
      role="img"
      aria-label={`当前 L${level}，目标 L${target}`}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ width: `${(level / 5) * 100}%`, background: 'var(--color-k1)' }}
      />
      <div
        className="absolute -top-1 -bottom-1 w-0.5 rounded"
        style={{ left: `calc(${(target / 5) * 100}% - 1px)`, background: 'var(--color-k2)' }}
      />
    </div>
  );
}
