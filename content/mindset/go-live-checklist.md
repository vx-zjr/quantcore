---
id: go-live-checklist
title: 实盘上线前检查清单
kind: mindset
category: checklist
summary: 策略从研究走向真金白银之前必须逐项确认的问题：逻辑、验证、成本、风控、运维、合规与心理准备。
domains: [execution, risk]
tags: [清单, 实盘, 上线]
status: todo
importance: 4
confidence: high
related: [backtest-red-flags, risk-management, execution-basics, cn-programmatic-trading-rules, phase-4-small-live, survival-first]
created: 2026-10-10
updated: 2026-10-10
---

> Phase 0 不会用到这份清单，但先读一遍能帮你理解「研究」和「能上线」之间的距离。

## 逻辑与验证

- 能用一句话说明 edge 来源与对手方（[[edge-first]]）
- 通过了 [[backtest-red-flags]] 全部检查
- 有样本外/前推验证结果，且记录了总尝试次数
- 至少 3 个月的模拟盘（paper trading），与回测信号逐日对得上

## 成本与容量

- 用保守成本（佣金 + 印花税 + 滑点 + 冲击）重新回测仍然有效
- 计划资金规模下，单笔订单不超过标的日成交额的 1%（经验值）

## 风控

- 预先写下：单策略最大仓位、最大杠杆、单标的上限
- 预先写下：停止交易的条件（如回撤超过回测最大回撤 1.5 倍）
- 初始资金只用计划规模的 10%–20%

## 运维

- 数据缺失、接口失败、重复下单时系统会怎样？有告警吗？
- 每日对账：系统持仓 vs 券商持仓
- 能一键停止所有自动交易
- 断网/断电/电脑宕机时的应急方案

## 合规

- 了解并完成所用账户的程序化交易报告义务（[[cn-programmatic-trading-rules]]）
- 下单频率与撤单比例远离异常交易认定标准

## 心理

- 我知道这个策略正常情况下会连续亏损多久、回撤多深
- 我已写下：在什么情况下会手动干预（理想答案：几乎没有）
