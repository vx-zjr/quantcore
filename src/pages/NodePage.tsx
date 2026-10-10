import { Link, useParams } from 'react-router-dom';
import { LevelControl } from '../components/LevelControl';
import { Markdown } from '../components/Markdown';
import { taskStats } from '../content/tasks';
import { CopyButton, KindChip, NodeLink, ProgressBar, Score, Section, StatusControl } from '../components/ui';
import { useContent } from '../content/store';
import { aiPrompt, label } from '../content/utils';

const CONF = { high: '高', medium: '中', low: '低' } as const;

export function NodePage() {
  const { id = '' } = useParams();
  const { data, byId, editable, updateNode, toggleTask } = useContent();
  const t = data.taxonomy;
  const n = byId.get(id);

  if (!n) {
    return (
      <div className="card p-8 text-center">
        <p className="text-lg font-medium">节点「{id}」不存在</p>
        <p className="mt-2 text-sm text-ink-2">可能已被重命名或删除。</p>
        <Link to="/" className="btn mt-4">
          返回总览
        </Link>
      </div>
    );
  }

  const issues = data.issues.filter((i) => i.nodeId === n.id);
  const ts = taskStats(n.body);
  const others = [...new Set([...n.related, ...n.mentions])].filter((x) => !n.prereqs.includes(x));
  const isStrategy = n.kind === 'industry' && n.category === 'strategy';

  return (
    <article className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <KindChip kind={n.kind} />
          {n.category && <span className="chip">{label(t.categories[n.kind], n.category)}</span>}
          {n.domains.map((d) => (
            <span key={d} className="chip">
              {label(t.domains, d)}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{n.title}</h1>
        <p className="mt-2 text-base text-ink-2">{n.summary}</p>

        {n.stale && (
          <div className="mt-4 rounded-lg border border-line p-3 text-sm" style={{ background: 'var(--color-raised)' }}>
            <span style={{ color: 'var(--color-warning)' }}>▲</span> 复核日期 {n.review} 已过：其中的规则、数据或机构信息可能已变化，阅读时请自行核实。
          </div>
        )}
        {issues.length > 0 && (
          <ul className="mt-4 space-y-1 rounded-lg border border-line p-3 text-sm">
            {issues.map((i, k) => (
              <li key={k}>
                <span style={{ color: i.level === 'error' ? 'var(--color-critical)' : 'var(--color-warning)' }}>
                  {i.level === 'error' ? '✖' : i.level === 'warn' ? '▲' : '●'}
                </span>{' '}
                {i.message}
              </li>
            ))}
          </ul>
        )}

        {ts.total > 0 && (
          <div className="mt-5 max-w-sm">
            <div className="mb-1 flex justify-between text-xs text-ink-2">
              <span>任务项{editable ? '（可直接勾选）' : ''}</span>
              <span className="tabular">
                {ts.done} / {ts.total}
              </span>
            </div>
            <ProgressBar done={ts.done} doing={0} total={ts.total} />
          </div>
        )}

        <div className="mt-6">
          <Markdown
            source={n.body}
            onToggleTask={editable ? (i, c) => void toggleTask(n.id, i, c).catch((e) => alert(e.message)) : undefined}
          />
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <Section title="属性">
          <dl className="space-y-2.5 text-sm">
            {n.status && (
              <div>
                <dt className="mb-1 text-xs text-ink-2">进度</dt>
                <dd>
                  <StatusControl node={n} />
                </dd>
              </div>
            )}
            {n.kind === 'skill' && (
              <div className="space-y-1">
                <dt className="text-xs text-ink-2">等级</dt>
                <dd className="space-y-1">
                  <LevelControl node={n} field="level" />
                  <LevelControl node={n} field="target" />
                </dd>
              </div>
            )}
            <Row k="重要度">
              <Score
                value={n.importance}
                label="重要度"
                onChange={editable ? (v) => void updateNode(n.id, { importance: v }) : undefined}
              />
            </Row>
            {n.kind === 'source' && (
              <>
                <Row k="评分">
                  <Score
                    value={n.rating ?? 0}
                    label="评分"
                    onChange={editable ? (v) => void updateNode(n.id, { rating: v }) : undefined}
                  />
                </Row>
                <Row k="形态">{label(t.formats, n.format)}</Row>
                <Row k="费用">{label(t.costs, n.cost)}</Row>
                <Row k="市场">{n.markets?.map((m) => label(t.markets, m)).join('、')}</Row>
                {n.url && (
                  <Row k="链接">
                    <a href={n.url} target="_blank" rel="noreferrer noopener" className="break-all text-accent-ink hover:underline">
                      打开 ↗
                    </a>
                  </Row>
                )}
              </>
            )}
            {isStrategy && (
              <>
                <Row k="持有周期">{label(t.horizons, n.horizon)}</Row>
                <Row k="个人适配">
                  <Score value={n.retailFit ?? 0} label="个人适配度" />
                </Row>
                <Row k="进入门槛">
                  <Score value={n.barrier ?? 0} label="门槛" />
                </Row>
                <Row k="容量">
                  <Score value={n.capacity ?? 0} label="容量" />
                </Row>
              </>
            )}
            {n.phase !== undefined && <Row k="阶段">Phase {n.phase}</Row>}
            {n.date && <Row k="日期">{n.date}</Row>}
            <Row k="置信度">{CONF[n.confidence]}</Row>
            {n.updated && <Row k="更新">{n.updated}</Row>}
            {n.review && <Row k="复核">{n.review}</Row>}
            {n.tags.length > 0 && (
              <div>
                <dt className="mb-1 text-xs text-ink-2">标签</dt>
                <dd className="flex flex-wrap gap-1">
                  {n.tags.map((g) => (
                    <span key={g} className="chip">
                      {g}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </Section>

        {(n.prereqs.length > 0 || others.length > 0 || n.backlinks.length > 0) && (
          <Section title="关联">
            <div className="space-y-3 text-sm">
              <LinkList title="前置" ids={n.prereqs} />
              <LinkList title="相关" ids={others} />
              <LinkList title="被引用" ids={n.backlinks.filter((b) => !others.includes(b) && !n.prereqs.includes(b))} />
            </div>
          </Section>
        )}

        <Section title="交给 AI">
          <p className="mb-2 text-xs text-ink-2">
            文件：<code className="break-all rounded bg-raised px-1">{n.path}</code>
          </p>
          <div className="flex flex-wrap gap-1.5">
            <CopyButton text={n.path} label="复制路径" className="!py-1 text-xs" />
            <CopyButton text={aiPrompt('expand', [n])} label="扩写" className="!py-1 text-xs" />
            <CopyButton text={aiPrompt('verify', [n])} label="核实更新" className="!py-1 text-xs" />
            <CopyButton text={aiPrompt('link', [n])} label="补充关联" className="!py-1 text-xs" />
          </div>
        </Section>
      </aside>
    </article>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-xs text-ink-2">{k}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

function LinkList({ title, ids }: { title: string; ids: string[] }) {
  if (!ids.length) return null;
  return (
    <div>
      <div className="mb-1 text-xs text-ink-2">{title}</div>
      <ul className="space-y-1">
        {ids.map((id) => (
          <li key={id}>
            <NodeLink id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
