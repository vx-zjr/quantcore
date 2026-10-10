# Playbook：周期复盘（每周 / 每月）

目的：让中心保持「活的」——反映真实进度，暴露差距，决定下一步。

## 每周（15 分钟）

1. 读 `content/INDEX.md` 与 `content/_meta/profile.yaml`。
2. 统计本周变化：`git log --since="1 week ago" --stat -- content/`。
3. 与用户确认：
   - 本周学了哪些知识点？（建议用户在 UI 中把 status 改为 doing/done）
   - 哪些技能有进步？是否满足了该技能正文中的「验收方式」？
4. 处理收件箱（`playbooks/process-inbox.md`）。
5. 新建一条 `journal`（category: review，id 如 `2026-10-17-weekly-review`）：
   - 本周完成 / 卡点 / 下周最重要的 1-3 件事
6. `npm run check`，记录 CHANGELOG。

## 每月（额外）

1. 复核过期内容（`playbooks/review-stale.md`）。
2. 检查路线图当前阶段的「退出标准」完成度；满足则与用户确认后推进阶段（改 roadmap 节点 `status`）。
3. 技能雷达：差距×重要度最大的 3 项，作为下月重点写进复盘日志。
4. 检查孤立节点和过短节点（UI「内容维护」页），挑 3-5 个扩写或补链。
5. 问一个反思问题并记录答案，例如：「这个月有没有哪个想法让我想跳过验证直接上实盘？」（参见 [[overfitting-is-default]]）
