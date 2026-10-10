import { useState } from 'react';
import { useContent } from '../content/store';

/** 快速记录：写入 content/inbox/，等待 AI 归档 */
export function InboxCapture() {
  const { editable, createInbox } = useContent();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [msg, setMsg] = useState('');

  if (!editable) {
    return (
      <p className="text-sm text-ink-2">
        只读模式。运行 <code className="rounded bg-raised px-1">npm run dev</code> 后可在这里随手记录想法，或直接在{' '}
        <code className="rounded bg-raised px-1">content/inbox/</code> 新建文件。
      </p>
    );
  }

  const submit = async () => {
    try {
      const id = await createInbox({ title, body });
      setTitle('');
      setBody('');
      setMsg(`已记录 → content/inbox/${id}.md`);
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <input
        className="input"
        placeholder="一句话想法 / 问题 / 待读链接"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="标题"
      />
      <textarea
        className="input min-h-16 resize-y"
        placeholder="补充说明（可选，支持 Markdown，可贴链接）"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        aria-label="说明"
      />
      <div className="flex items-center gap-3">
        <button className="btn btn-primary" disabled={!title.trim()} type="submit">
          记入收件箱
        </button>
        {msg && <span className="text-xs text-ink-2">{msg}</span>}
      </div>
    </form>
  );
}
