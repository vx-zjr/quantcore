---
id: strat-options-volatility
title: 期权与波动率策略
kind: industry
category: strategy
summary: 交易隐含与已实现波动率之差（波动率风险溢价）、期限结构与偏斜：系统化卖出期权、备兑、领口、跨式等；平时稳定收租，极端行情可能巨亏，风控决定生死。
horizon: weeks
capacity: 3
barrier: 4
retailFit: 2
domains: [strategy, risk]
tags: [期权, 波动率, 卖方, 尾部风险]
importance: 3
confidence: high
related: [options-basics, volatility-basics, survival-first, return-distributions, cn-futures-options]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

- **卖方策略**：卖出虚值期权或跨式组合，获取波动率风险溢价（参见 [[volatility-basics]]）。
- **备兑开仓**：持有标的 + 卖出看涨期权。
- **保护性策略**：买入看跌期权对冲尾部（成本较高）。
- **相对价值**：期限结构、偏斜、跨品种的波动率价差。

## 逻辑与 edge 来源

**风险溢价**：市场参与者愿意为保险（尤其是下跌保护）支付溢价。卖方提供保险，获得补偿，同时承担尾部风险。

## 对个人的意义

- ⚠️ 门槛：国内 ETF 期权个人需满足资产与知识测试要求（参见 [[cn-futures-options]]）。
- ⚠️ 收益分布高度负偏：「捡硬币」直到被压路机碾过。高夏普掩盖尾部风险（参见 [[return-distributions]]）。
- ✅ 理解期权本身极有价值：它能帮你理解风险溢价、凸性与仓位管理。建议先作为知识学习（参见 [[options-basics]]）。

## 主要风险

- 跳空与暴跌（如 2015 年、2020 年初）中卖方的巨额亏损。
- 保证金追加与强平。
- 流动性：深度虚值合约买卖价差大。
