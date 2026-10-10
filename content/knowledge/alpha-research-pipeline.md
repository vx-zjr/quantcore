---
id: alpha-research-pipeline
title: Alpha 研究流程
kind: knowledge
summary: 从想法到可上线策略的标准流程：假设→数据→信号构建→单信号检验→组合与成本→稳健性→样本外→模拟盘→小资金实盘，每一步都有明确的通过标准。
domains: [backtest, strategy]
tags: [研究流程, 信号, 因子检验, 工作流]
status: todo
importance: 5
confidence: high
related: [research-as-science, ic-analysis, backtesting-pitfalls, cross-validation-finance, multiple-testing, transaction-costs, go-live-checklist]
prereqs: [research-as-science, performance-metrics]
created: 2026-10-10
updated: 2026-10-10
---

## 流程总览

```
① 假设 ─▶ ② 数据 ─▶ ③ 信号构建 ─▶ ④ 单信号检验 ─▶ ⑤ 组合与成本
                                                        │
⑨ 小资金实盘 ◀─ ⑧ 模拟盘 ◀─ ⑦ 样本外/前推 ◀─ ⑥ 稳健性检验 ◀┘
```

| 步骤 | 做什么 | 通过标准（示例） |
|---|---|---|
| ① 假设 | 写下 edge 来源与可检验的预测 | 能说清对手方与机制（[[edge-first]]） |
| ② 数据 | 准备时点正确、清洗过的数据 | 通过时点检查（[[point-in-time-data]]） |
| ③ 信号构建 | 原始数据 → 可比较的分数（去极值、标准化、中性化） | 信号覆盖率、分布合理 |
| ④ 单信号检验 | IC、分层收益、衰减、换手（[[ic-analysis]]） | IC 方向稳定、分层单调 |
| ⑤ 组合与成本 | 构建可交易组合，加入真实成本 | 扣成本后仍为正（[[transaction-costs]]） |
| ⑥ 稳健性 | 参数扰动、子样本、子市场、去除极端值 | 结论不依赖特定参数或时期 |
| ⑦ 样本外 | 前推验证/保留期（只用一次） | 样本外夏普不低于样本内的 50% |
| ⑧ 模拟盘 | 实时生成信号，模拟成交 | 与回测逐日一致，≥ 3 个月 |
| ⑨ 小资金实盘 | 10%–20% 计划资金 | 与模拟盘偏差可解释（[[go-live-checklist]]） |

## 关键要点

- **大部分想法应该在 ④ 之前被淘汰**。越往后，每一步的成本越高。
- **基线对照**：每一步都与简单基线（等权、市场指数、单一经典因子）对比，看增量价值。
- **中性化**：对行业、市值等做中性化，确认信号不是已知因子的重复。
- **记录每一次尝试**，包括被淘汰的（参见 [[research-as-science]]、[[multiple-testing]]）。
- **流程的价值在于可重复**：Phase 2 会把这个流程固化为研究模板与工具（参见 [[phase-2-research-framework]]）。

## 常见误区

- 跳过 ④ 直接做组合回测，看到收益曲线就开始调参。
- 在 ⑦ 失败后回到 ③ 修改，再测一次样本外——此时样本外已被污染。
