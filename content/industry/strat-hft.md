---
id: strat-hft
title: 高频交易 / 延迟套利
kind: industry
category: strategy
summary: 在毫秒到微秒级别利用订单簿信息、跨市场价格传导与速度优势获利；是硬件与工程的军备竞赛，且在国内受到日益严格的监管，个人没有参与空间。
horizon: tick
capacity: 1
barrier: 5
retailFit: 1
domains: [strategy, execution, regulation]
tags: [高频交易, 低延迟, 军备竞赛]
importance: 2
confidence: high
related: [strat-market-making, market-microstructure, cn-programmatic-trading-rules, small-player-edge]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

- **信号**：订单簿不平衡、逐笔成交流、跨市场/跨品种的领先滞后关系。
- **执行**：微秒级延迟、FPGA、托管机房。
- **容量**：单个策略容量很小，靠极高的交易次数累积收益。

## 为什么个人不适合

- 速度竞争是赢家通吃的；第二快等于没有。
- 国内对高频交易有报告、监控与差异化收费等专门管理（参见 [[cn-programmatic-trading-rules]]）。
- 个人的券商终端、网络与费率完全不具备条件（参见 [[small-player-edge]]）。

## 学习价值

了解高频的存在，有助于理解：
- 为什么你的市价单总是成交在不太理想的价格；
- 为什么日内的短周期信号对个人几乎不可用——这些信号早已被更快的参与者拿走。
