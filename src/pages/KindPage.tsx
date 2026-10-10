import { NodeList } from '../components/NodeList';
import { PageHeader } from '../components/ui';
import { useContent } from '../content/store';
import type { Kind } from '../content/types';

/** 通用 kind 列表页（知识、思维等），按主领域或子类分组 */
export function KindPage({ kind, groupBy, desc }: { kind: Kind; groupBy: 'domain' | 'category'; desc?: string }) {
  const { data, byKind } = useContent();
  const def = data.taxonomy.kinds[kind];
  return (
    <div>
      <PageHeader title={def.label} desc={desc ?? def.desc} />
      <NodeList nodes={byKind(kind)} groupBy={groupBy} />
    </div>
  );
}
