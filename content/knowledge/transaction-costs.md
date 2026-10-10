---
id: transaction-costs
title: 交易成本
kind: knowledge
summary: 显性成本（佣金、税费）+ 隐性成本（价差、冲击、滑点、延迟、机会成本）；高换手策略的大部分毛收益会被成本吞掉，回测必须保守估计。
domains: [execution, backtest]
tags: [成本, 滑点, 冲击成本, 换手率]
status: todo
importance: 5
confidence: high
related: [market-microstructure, execution-basics, cn-a-share-rules, backtesting-pitfalls, backtest-red-flags]
prereqs: [market-microstructure]
created: 2026-10-10
updated: 2026-10-10
---

## 是什么

| 类别 | 组成 | 特点 |
|---|---|---|
| 显性成本 | 佣金、印花税、过户费、交易所规费、融资利息 | 确定、易建模 |
| 价差成本 | 以对手价成交付出的半个价差 | 低价股、小盘股高 |
| 冲击成本 | 自己的订单推动价格 | 随订单规模非线性上升 |
| 滑点/延迟 | 从产生信号到成交之间价格的变化 | 信号越拥挤、执行越慢越大 |
| 机会成本 | 限价单未成交而错过的收益 | 隐性但真实 |

## 为什么重要

成本与换手率成正比，而毛收益往往不是。一个简单估算：

$$\text{净年化收益} \approx \text{毛年化收益} - \text{年换手倍数} \times \text{单边成本}$$

例：A 股策略单边综合成本 0.15%（含税费、价差、冲击），日频调仓、每日换手 30%，则年换手约 $0.3 \times 2 \times 244 \approx 146$ 倍单边成交，成本约 **22% / 年**。毛收益 25% 的策略只剩 3%。

## 关键要点

- **回测成本要保守**：宁可高估。个人在 A 股的经验起点：单边 0.1%–0.2%（含印花税摊销、价差、少量冲击），小盘股、低价股更高。
- **冲击成本非线性**：平方根律 $\text{impact} \propto \sigma\sqrt{Q/V}$（参见 [[market-microstructure]]）。资金规模越大，同一策略成本越高——这是策略容量的来源。
- **换手率是第一控制变量**：降低调仓频率、设置调仓阈值（缓冲带）、信号平滑，都能显著降低成本。
- **成本敏感性分析**：把成本从 0 提高到 2 倍，看策略收益如何衰减。对成本极度敏感的策略不可信。

## 常见误区

- 只算佣金。
- 忽视最低佣金（5 元/笔）：小资金频繁交易时，实际费率远高于名义费率。
- 用成交均价估计但忽略了自己的订单会改变成交均价。

## 延伸

- [[execution-basics]]：如何下单以降低成本
- [[cn-a-share-rules]]：A 股具体费率
