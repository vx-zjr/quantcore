---
name: review-stale
description: 复核 QuantCore 中已过复核日期或低置信度的时效性内容（规则、费率、监管、机构格局、数据源）。
---

严格按照仓库中的 `playbooks/review-stale.md` 执行，并遵守 `AGENTS.md` 的全部规范。
先运行 `npm run content:check` 找出过期节点。参数（如有）视为需要复核的节点 id：$ARGUMENTS
