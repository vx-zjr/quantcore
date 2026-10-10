// 前端内容仓库：初始数据来自 virtual:content；dev 模式下订阅文件变化并提供写回。
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import initialData from 'virtual:content';
import { setTask } from './tasks';
import type { ContentData, InboxInput, Kind, NodePatch, QNode } from './types';

/** 只有 dev 服务器提供 /__api 写回接口；静态构建为只读 */
export const EDITABLE = import.meta.env.DEV;

interface Store {
  data: ContentData;
  nodes: QNode[];
  byId: Map<string, QNode>;
  byKind: (kind: Kind) => QNode[];
  editable: boolean;
  updateNode: (id: string, patch: NodePatch) => Promise<void>;
  toggleTask: (id: string, index: number, checked: boolean) => Promise<void>;
  createInbox: (input: InboxInput) => Promise<string>;
}

const Ctx = createContext<Store | null>(null);

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? '请求失败');
  return json as T;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ContentData>(initialData);

  useEffect(() => {
    if (!import.meta.hot) return;
    const onUpdate = (next: ContentData) => setData(next);
    import.meta.hot.on('content:update', onUpdate);
    return () => import.meta.hot?.off('content:update', onUpdate);
  }, []);

  // 乐观更新：先改本地数据让界面立即响应，再以服务端返回（或失败后重新拉取）为准
  const patchLocal = useCallback((id: string, fn: (n: QNode) => QNode) => {
    setData((d) => ({ ...d, nodes: d.nodes.map((n) => (n.id === id ? fn(n) : n)) }));
  }, []);
  const resync = useCallback(async () => {
    const res = await fetch('/__api/content');
    if (res.ok) setData(await res.json());
  }, []);

  const updateNode = useCallback(
    async (id: string, patch: NodePatch) => {
      patchLocal(id, (n) => ({ ...n, ...patch }));
      try {
        const r = await post<{ data: ContentData }>(`/__api/nodes/${id}`, { patch });
        setData(r.data);
      } catch (e) {
        await resync();
        throw e;
      }
    },
    [patchLocal, resync],
  );

  const toggleTask = useCallback(
    async (id: string, index: number, checked: boolean) => {
      patchLocal(id, (n) => ({ ...n, body: setTask(n.body, index, checked) }));
      try {
        const r = await post<{ data: ContentData }>(`/__api/nodes/${id}/tasks`, { index, checked });
        setData(r.data);
      } catch (e) {
        await resync();
        throw e;
      }
    },
    [patchLocal, resync],
  );

  const createInbox = useCallback(async (input: InboxInput) => {
    const r = await post<{ id: string; data: ContentData }>('/__api/inbox', input);
    setData(r.data);
    return r.id;
  }, []);

  const value = useMemo<Store>(() => {
    const byId = new Map(data.nodes.map((n) => [n.id, n]));
    const groups = new Map<Kind, QNode[]>();
    for (const n of data.nodes) {
      if (!groups.has(n.kind)) groups.set(n.kind, []);
      groups.get(n.kind)!.push(n);
    }
    return {
      data,
      nodes: data.nodes,
      byId,
      byKind: (k) => groups.get(k) ?? [],
      editable: EDITABLE,
      updateNode,
      toggleTask,
      createInbox,
    };
  }, [data, updateNode, toggleTask, createInbox]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContent(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useContent 必须在 ContentProvider 内使用');
  return s;
}
