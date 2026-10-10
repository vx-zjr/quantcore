---
id: phase-4-small-live
title: 阶段 4：小资金实盘
kind: roadmap
summary: 用计划资金的 10%-20% 实盘运行，重点验证执行、运维、合规与心理，而不是追求收益；与模拟盘和回测持续对比。
phase: 4
status: todo
domains: [execution, risk]
tags: [实盘, 运维]
importance: 4
confidence: high
related: [phase-3-paper-trading, phase-5-scale, go-live-checklist, execution-operations]
prereqs: [phase-3-paper-trading, go-live-checklist, cn-programmatic-trading-rules, risk-management]
created: 2026-10-10
updated: 2026-10-10
---

## 目标

以「付学费」的心态，用小资金暴露所有在模拟盘中看不到的问题：真实成交、费用、系统故障、合规、以及真金白银带来的心理压力。

## 交付物

- [ ] 完成账户的程序化交易相关报告/开通（参见 [[cn-programmatic-trading-rules]]）
- [ ] 实盘执行系统：下单、撤单、状态管理、每日对账、告警、一键停止（参见 [[execution-operations]]）
- [ ] 书面风控规则：仓位上限、熔断条件（参见 [[risk-management]]）
- [ ] 每周对比：实盘 vs 模拟盘 vs 回测（收益、成本、成交价差）
- [ ] 事故日志：每次异常的原因、影响与修复

## 退出标准

- [ ] 实盘运行 ≥ 6 个月，经历过至少一次明显回撤并坚持执行规则
- [ ] 实盘与回测的偏差稳定且可解释
- [ ] 无未解决的系统性运维问题

## 不做什么

- 不因早期盈利提前加资金。
- 不在实盘中修改策略逻辑——修改必须回到研究流程。
