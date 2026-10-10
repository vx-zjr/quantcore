---
id: strat-arbitrage
title: 套利（期现、ETF、LOF、跨市场）
kind: industry
category: strategy
summary: 利用同一资产在不同形式/市场间的定价偏差获利：股指期现套利、ETF 申赎套利、LOF/QDII 折溢价、跨期价差等；理论风险低，但实际受门槛、速度、资金占用与执行风险约束。
horizon: intraday
capacity: 2
barrier: 4
retailFit: 2
domains: [strategy, execution]
tags: [套利, 期现, ETF, LOF, 折溢价]
importance: 3
confidence: medium
related: [cn-futures-options, execution-basics, transaction-costs, strat-convertible-bonds, jisilu]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

| 类型 | 做法 | 主要约束 |
|---|---|---|
| 股指期现套利 | 期货与现货篮子之间的基差偏离 | 资金量大、融券困难（反向套利难）、需要快速执行 |
| ETF 申赎套利 | ETF 二级市场价格与净值（IOPV）的偏离 | 申赎门槛（最小申赎单位）、速度 |
| LOF / QDII 折溢价 | 场内价格与净值的偏离，通过申购/赎回套利 | 申购限额、净值公布延迟、T+N 到账 |
| 跨期 / 跨品种 | 期货不同月份或相关品种价差 | 价差可能持续扩大 |

## 逻辑与 edge 来源

为市场提供价格一致性；收益是对资金占用、执行风险与操作成本的补偿。

## 对个人的意义

- 大部分「无风险」套利已被机构以速度和规模占据。
- 个人可能存在的机会：**小容量的 LOF/QDII 溢价**（限购导致机构装不下）、部分低流动性品种——社区如 [[jisilu]] 有大量讨论。
- 需要熟悉产品机制与申赎流程，人工成分较多。

## 主要风险

- 一条腿成交、另一条腿未成交（腿风险）。
- 净值确认延迟期间价格变化。
- 「看起来是套利，其实是方向性风险」。
