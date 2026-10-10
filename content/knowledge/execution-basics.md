---
id: execution-basics
title: 执行与下单基础
kind: knowledge
summary: 从信号到成交：订单类型选择、TWAP/VWAP 等执行算法、集合竞价的利用、执行偏差（implementation shortfall）的衡量。
domains: [execution]
tags: [执行算法, TWAP, VWAP, 下单]
status: todo
importance: 3
confidence: high
related: [transaction-costs, market-microstructure, execution-operations, go-live-checklist, qmt-ptrade]
prereqs: [market-microstructure]
created: 2026-10-10
updated: 2026-10-10
---

## 是什么

执行（execution）是把「目标持仓」变成「实际持仓」的过程，目标是在可接受的时间内以尽量低的成本完成。

## 常见执行方式

| 方式 | 做法 | 适用 |
|---|---|---|
| 市价单 | 立即成交 | 小单、流动性好、时间敏感 |
| 限价单 | 挂在指定价格等待 | 不急、愿意承担不成交风险 |
| TWAP | 在时间段内均匀拆单 | 简单、可预测 |
| VWAP | 按历史成交量分布拆单 | 目标是贴近当日成交均价 |
| POV | 按市场成交量的固定比例下单 | 控制市场参与率 |
| 集合竞价 | 在开盘/收盘竞价阶段下单 | 收盘竞价流动性集中，适合日频策略以收盘价附近成交 |

## 衡量执行质量

**执行偏差（Implementation Shortfall）**：决策时的价格（如信号产生时的价格）与实际成交均价之差，加上未成交部分的机会成本。这是最诚实的执行成本度量。

## 对个人量化的启示

- 日频及以上的个人策略，多数情况下**收盘集合竞价**或**开盘后一段时间的 TWAP**就够用。
- 小资金的冲击成本通常很低，主要成本是价差、税费和最低佣金。
- 回测假设的成交价格必须是实盘能拿到的：例如信号用 T 日收盘数据计算，则只能以 T+1 日开盘或之后的价格成交。
- 自动化下单前要了解程序化交易的报告要求与异常交易标准（参见 [[cn-programmatic-trading-rules]]）。

## 常见误区

- 在回测里用「次日开盘价」成交，但实盘中开盘价波动剧烈、滑点更大。
- 把复杂的执行算法当成小资金的优先事项——先把信号和风控做好。
