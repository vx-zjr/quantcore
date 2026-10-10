# Playbook：修改前端 / 数据模型

## 架构速览

```
content/**/*.md ──(scripts/content/loader.ts: 解析+校验)──▶ ContentData
      ▲                                                        │
      │ dev 写回 (/__api)                       virtual:content │ + HMR 事件 content:update
      │                                                        ▼
scripts/content/writer.ts ◀── src/content/store.tsx ◀── React 页面（src/pages/*）
```

- 数据只从 `useContent()` 读取。页面不直接 fetch 文件。
- 写回只允许 `EDITABLE_FIELDS`（status/level/target/rating/importance）、勾选任务项、新建收件箱。
  正文编辑交给 AI 或编辑器，不在 UI 里做富文本编辑（保持文件可读、diff 干净）。
- 生产构建（`npm run build`）是纯静态只读站点，可部署到任意静态托管（HashRouter，`base: './'`）。

## 常见改动

### 新增一个页面 / 可视化
1. `src/pages/XxxPage.tsx`，用 `useContent()` 取数据。
2. 在 `src/App.tsx` 注册路由，在 `src/components/Layout.tsx` 的 `nav` 加入口。
3. 图表：Recharts（已安装）或手写 SVG（参考 `components/StrategyMap.tsx`）；图谱用 d3-force（`components/ForceGraph.tsx`）。
4. 图表规范：单一 y 轴；≥2 个系列必须有图例；颜色只用设计令牌；悬停有 tooltip；提供表格视图或直接标注作为辅助。

### 给某个 kind 增加字段
1. `src/content/types.ts` 的 `QNode` 加字段（带注释）。
2. `scripts/content/schema.ts`：在 schema 中加校验，在 `KNOWN_FIELDS` 中加字段名；若必填，在 `superRefine` 的对应 kind 分支加 `need(...)`。
3. 若是枚举，把取值放进 `content/_meta/taxonomy.yaml` 并在 `Taxonomy` 类型中声明。
4. 更新 `content/_meta/templates/<kind>.md` 与 AGENTS.md 第 4 节。
5. 如需 UI 可编辑：加入 `EDITABLE_FIELDS` 并在 `scripts/content/writer.ts` 的 `validatePatch` 加校验。
6. 迁移已有节点（批量补字段），`npm run check`。

### 新增一个 kind
1. `src/content/types.ts` 的 `KINDS` 加入。
2. `content/_meta/taxonomy.yaml` 的 `kinds` 加配置（dir、label、slot 1-8；若 8 个 slot 用完，先讨论是否真的需要新 kind）。
3. `scripts/content/schema.ts` 加必填规则；`components/ForceGraph.tsx` 的 `KIND_SYMBOL` 加形状。
4. 模板、页面、导航、AGENTS.md 同步。

## 验证
- `npm run check` 通过。
- `npm run dev` 打开改动的页面目测：浅色/深色主题、窄屏（≤400px）、空数据状态。
- CHANGELOG 记录。
