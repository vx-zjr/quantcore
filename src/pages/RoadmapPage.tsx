import { Link } from 'react-router-dom';
import { taskStats } from '../content/tasks';
import { NodeLink, PageHeader, ProgressBar, StatusControl } from '../components/ui';
import { useContent } from '../content/store';
import { nodeHref } from '../content/utils';

export function RoadmapPage() {
  const { data, byKind } = useContent();
  const phases = [...byKind('roadmap')].sort((a, b) => (a.phase ?? 0) - (b.phase ?? 0));

  return (
    <div>
      <PageHeader
        title="路线图"
        desc="分阶段推进。每个阶段有交付物与退出标准——全部勾选才进入下一阶段。点开阶段详情可直接勾选任务项（开发模式）。"
      />
      <ol className="relative space-y-4 border-l-2 border-grid pl-6">
        {phases.map((p) => {
          const ts = taskStats(p.body);
          const doing = p.status === 'doing';
          return (
            <li key={p.id} className="relative">
              <span
                className="absolute top-5 -left-[33px] flex h-4 w-4 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: p.status === 'todo' ? 'var(--color-axis)' : 'var(--color-k6)',
                  background: p.status === 'done' ? 'var(--color-k6)' : 'var(--color-page)',
                }}
                aria-hidden
              />
              <div className={`card p-4 ${doing ? 'ring-2 ring-[var(--color-k6)]' : ''}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-ink-2">
                      Phase {p.phase}
                      {doing && <span className="ml-2 font-medium text-ink">← 当前</span>}
                    </div>
                    <Link to={nodeHref(p.id)} className="text-lg font-semibold hover:underline">
                      {p.title}
                    </Link>
                    <p className="mt-1 text-sm text-ink-2">{p.summary}</p>
                  </div>
                  <StatusControl node={p} />
                </div>
                {ts.total > 0 && (
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs text-ink-2">
                      <span>任务项</span>
                      <span className="tabular">
                        {ts.done} / {ts.total}
                      </span>
                    </div>
                    <ProgressBar done={ts.done} doing={0} total={ts.total} />
                  </div>
                )}
                {p.prereqs.length + p.related.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <span className="text-xs text-muted">依赖/关联：</span>
                    {[...new Set([...p.prereqs, ...p.related])].slice(0, 10).map((id) => (
                      <NodeLink key={id} id={id} className="text-xs" />
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-xs text-muted">
        共 {phases.length} 个阶段 · 定义在 content/{data.taxonomy.kinds.roadmap.dir}/
      </p>
    </div>
  );
}
