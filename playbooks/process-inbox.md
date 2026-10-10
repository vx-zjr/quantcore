# Playbook：处理收件箱

收件箱（`content/inbox/`）是用户随手记录的想法、问题、链接。目标：清空收件箱，把有价值的内容沉淀为正式节点。

## 步骤

对每个 `status: todo` 的收件箱条目：

1. **理解意图**：这是一个问题？一个待读链接？一个策略想法？一个待办？
2. **分流**：
   | 类型 | 处理 |
   |---|---|
   | 新概念/知识点 | 按 `playbooks/add-node.md` 新建或扩写 `knowledge` 节点 |
   | 待读书/文章/工具/数据源 | 新建 `source` 节点（`status: todo`） |
   | 关于自己的信息（目标、资金、偏好） | 写入 `content/_meta/profile.yaml` |
   | 一个决策或反思 | 新建 `journal` 节点（category: decision/note） |
   | 策略想法 | Phase 0 不实现。记入 `journal`（category: note，tags 加 `策略想法`），写明假设的 edge 来源（参见 [[edge-first]] 的分类）与可证伪的检验方式 |
   | 用户的问题 | 先回答；若答案有沉淀价值，写进对应节点 |
   | 无价值/重复 | 直接删除文件 |
3. **归档**：已处理的条目删除文件（推荐，git 历史可追溯），或保留并设 `status: done`、正文末尾注明「→ 已归档到 [[xxx]]」。
4. **验证**：`npm run check`。
5. **汇报**：向用户列出每条的去向；在 `CHANGELOG.md` 记录。

## 注意

- 用户原话中的事实性断言不要直接当真写入，需要核实或标注 `confidence: low`。
- 一次处理不完时，优先处理最早的条目。
