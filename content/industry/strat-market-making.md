---
id: strat-market-making
title: 做市
kind: industry
category: strategy
summary: 在买卖两侧持续挂单，赚取价差与交易所返佣，同时管理库存与逆向选择风险；依赖低延迟、精细定价与资格/费率优势，个人基本无法参与。
horizon: tick
capacity: 2
barrier: 5
retailFit: 1
domains: [strategy, market-structure]
tags: [做市, 流动性提供, 高频]
importance: 2
confidence: high
related: [market-microstructure, strat-hft, quant-industry-landscape, global-quant-firms]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

做市商同时报出买价和卖价，向市场提供流动性。收益 = 价差 + 返佣 − 逆向选择损失 − 库存风险 − 技术成本。

## 逻辑与 edge 来源

**提供流动性**（参见 [[edge-first]]）：为急于交易的人提供即时性，收取价差作为报酬。核心难点是避免被「知情交易者」收割（逆向选择，参见 [[market-microstructure]]）。

## 为什么个人不适合

- 需要极低延迟（托管机房、专线）、实时风险系统。
- 正式做市商享有费率优惠、返佣与特定资格；个人没有。
- 竞争者是全球最顶尖的技术型交易公司（参见 [[global-quant-firms]]）。

## 学习价值

理解做市商的经济学，有助于理解你作为市价单下单者付出了什么（参见 [[transaction-costs]]），以及市场在极端行情中流动性为何会突然消失。
