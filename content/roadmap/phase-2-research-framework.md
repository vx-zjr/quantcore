---
id: phase-2-research-framework
title: 阶段 2：研究与回测框架
kind: roadmap
summary: 建立标准化的研究流程与工具：信号评价、可信回测、成本模型、稳健性与样本外检验、研究日志——并用它复现 2-3 个经典结论来校准。
phase: 2
status: todo
domains: [backtest, programming]
tags: [回测, 研究流程]
importance: 4
confidence: high
related: [phase-1-data-infra, phase-3-paper-trading, alpha-research-pipeline, backtest-engineering]
prereqs: [phase-1-data-infra, alpha-research-pipeline, backtesting-pitfalls, multiple-testing, cross-validation-finance, transaction-costs, research-methodology]
created: 2026-10-10
updated: 2026-10-10
---

## 目标

拥有一套「不骗自己」的研究工具链，并通过复现已知结论证明它是可信的。

## 交付物

- [ ] 信号评价工具：IC/Rank IC、ICIR、分层收益、衰减、换手（参见 [[ic-analysis]]）
- [ ] 回测引擎：T 日信号、T+1 成交；涨跌停/停牌/最小单位；保守成本模型（参见 [[backtest-engineering]]）
- [ ] 绩效报告：标准指标 + 分年度 + 压力期表现（参见 [[performance-metrics]]）
- [ ] 稳健性工具：参数网格热力图、子样本、成本敏感性
- [ ] 研究日志模板与「尝试次数」记录机制（参见 [[research-as-science]]）
- [ ] 引擎一致性测试：随机信号夏普≈0；与一个开源框架对比误差可解释
- [ ] 复现 2–3 个经典结论（如 A 股短期反转、低换手、规模效应；或期货时序动量）

## 退出标准

- [ ] 复现结果与公开文献/研报方向一致，差异可解释
- [ ] 「回测系统构建」「研究方法论」技能自评 ≥ L3
- [ ] 能用 [[backtest-red-flags]] 审计自己的回测并全部通过

## 不做什么

- 不为了好看的曲线调参。
- 不把复现的经典因子直接当作要上线的策略。
