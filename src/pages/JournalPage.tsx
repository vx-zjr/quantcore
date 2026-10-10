import { Link } from 'react-router-dom';
import { InboxCapture } from '../components/InboxCapture';
import { CopyButton, Empty, PageHeader, Section, StatusControl } from '../components/ui';
import { useContent } from '../content/store';
import { aiPrompt, label, nodeHref } from '../content/utils';

export function JournalPage() {
  const { data, byKind } = useContent();
  const t = data.taxonomy;
  const journal = [...byKind('journal')].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  const inbox = [...byKind('inbox')].sort(
    (a, b) => (a.status === 'done' ? 1 : 0) - (b.status === 'done' ? 1 : 0) || b.id.localeCompare(a.id),
  );
  const pending = inbox.filter((n) => n.status !== 'done');

  return (
    <div className="space-y-5">
      <PageHeader
        title="日志与收件箱"
        desc="日志记录决策与复盘（为什么这么做）；收件箱是随手记下、尚未整理的想法与链接，由 AI 定期归档成正式节点。"
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Section title="日志" className="lg:col-span-3">
          {journal.length === 0 && <Empty>还没有日志</Empty>}
          <ol className="space-y-4">
            {journal.map((n) => (
              <li key={n.id} className="grid grid-cols-[88px_1fr] gap-3">
                <div className="pt-0.5 text-xs text-ink-2 tabular">{n.date}</div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link to={nodeHref(n.id)} className="font-medium hover:underline">
                      {n.title}
                    </Link>
                    <span className="chip !py-0 text-[11px]">{label(t.categories.journal, n.category)}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink-2">{n.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <div className="min-w-0 space-y-5 lg:col-span-2">
          <Section title="随手记录">
            <InboxCapture />
          </Section>
          <Section
            title={`收件箱（待处理 ${pending.length}）`}
            right={
              pending.length > 0 && (
                <CopyButton text={aiPrompt('process-inbox', pending)} label="复制 AI 指令" className="!py-1 text-xs" />
              )
            }
          >
            {inbox.length === 0 && <Empty>收件箱是空的</Empty>}
            <ul className="divide-y divide-line">
              {inbox.map((n) => (
                <li key={n.id} className={`flex items-start justify-between gap-2 py-2 ${n.status === 'done' ? 'opacity-50' : ''}`}>
                  <div className="min-w-0">
                    <Link to={nodeHref(n.id)} className="text-sm font-medium hover:underline">
                      {n.title}
                    </Link>
                    <div className="text-xs text-muted tabular">{n.created}</div>
                  </div>
                  <StatusControl node={n} compact />
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
