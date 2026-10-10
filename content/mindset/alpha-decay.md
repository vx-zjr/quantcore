---
id: alpha-decay
title: Alpha 衰减与策略拥挤
kind: mindset
category: model
summary: 有效的超额收益会因为被发现、被模仿而逐渐消失；越容易被找到的 alpha 衰减越快，策略需要持续监控与迭代。
domains: [strategy, asset-pricing]
tags: [alpha衰减, 拥挤交易, 容量]
status: todo
importance: 4
confidence: high
related: [edge-first, base-rates, regime-change, cn-quant-landscape, factor-models]
created: 2026-10-10
updated: 2026-10-10
---

## 核心

市场是自适应的（参见 [[efficient-market-hypothesis]] 中的适应性市场假说）。当一个获利模式被足够多的人发现并交易，价格会提前反映它，收益随之消失。

- **学术证据**：McLean & Pontiff (2016) 发现异象在论文发表后收益平均显著下降，说明部分收益被套利者拿走。
- **拥挤的危险**：当太多资金持有相似头寸，一旦出现被迫平仓，会发生踩踏式回撤（例如 2007 年 8 月的 Quant Quake；2024 年初 A 股小市值/微盘股相关策略的集中回撤，参见 [[cn-quant-landscape]]）。

## 衰减速度的规律

| 特征 | 衰减速度 |
|---|---|
| 数据公开、计算简单（如价格动量） | 快，但风险溢价类可能长期残留 |
| 需要特殊数据或处理能力 | 慢 |
| 依赖制度/结构性约束 | 只在规则变化时消失 |
| 有真实风险补偿（风险溢价） | 不会消失，但会周期性回撤 |
| 容量小 | 慢（机构没兴趣） |

## 在量化中的体现

- 策略上线后要持续跟踪：实盘与回测的偏离、滚动 IC/夏普的变化趋势。
- 区分「衰减」和「正常回撤」很难——事先定义失效标准（如滚动 2 年夏普 < 0），触发后复查而不是凭感觉。
- 优先选择有结构性或风险补偿逻辑的策略，它们衰减更慢。

## 自检问题

- 这个策略如果写成文章公开，多久会失效？
- 我能通过什么指标及早发现它在衰减？
