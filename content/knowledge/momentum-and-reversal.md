---
id: momentum-and-reversal
title: 动量与反转
kind: knowledge
summary: 时间序列动量（趋势）与截面动量（相对强弱）是最稳健的市场异象之一；短期与长期则常见反转。理解它们的区别、成因与崩溃风险。
domains: [strategy, asset-pricing]
tags: [动量, 反转, 趋势, 行为金融]
status: todo
importance: 4
confidence: high
related: [strat-trend-following, strat-etf-rotation, factor-models, cn-factor-landscape, papers-classic-factors, mean-reversion-cointegration]
prereqs: [factor-models]
created: 2026-10-10
updated: 2026-10-10
---

## 两种动量

| | 时间序列动量（TSMOM） | 截面动量（XSMOM） |
|---|---|---|
| 问题 | 这个资产自己是在涨还是在跌？ | 这个资产比别的资产涨得多还是少？ |
| 操作 | 涨就做多，跌就做空/空仓 | 买相对强的，卖相对弱的 |
| 经典文献 | Moskowitz, Ooi & Pedersen (2012) | Jegadeesh & Titman (1993) |
| 典型应用 | 期货 CTA、资产配置择时 | 股票选股、行业/ETF 轮动 |
| 净暴露 | 可以净多或净空 | 常为市场中性 |

## 不同周期的规律（股票，大致）

- **极短期（日内到 1 个月）**：反转为主（流动性提供、过度反应）。A 股尤其显著。
- **中期（3–12 个月）**：动量（反应不足、羊群效应）。美股显著，A 股弱。
- **长期（3–5 年）**：反转（过度反应的修正）。

## 成因（假说）

- **行为**：投资者对新信息反应不足，随后追涨（羊群）；处置效应导致赢家被过早卖出。
- **风险**：动量暴露于崩溃风险，溢价可能是对此的补偿。
- **结构**：机构资金的缓慢流入流出、对冲需求。

## 关键风险：动量崩溃

动量策略在市场急剧反转时（如熊市后的 V 型反弹）可能遭受短期巨大亏损（如 2009 年）。
- 缓解：波动率缩放、多周期信号组合、分散到多资产。

## 对个人量化的启示

- **时间序列动量/趋势跟踪**在多资产（期货、ETF）上有百年以上的证据（Hurst, Ooi & Pedersen, 2017），规则简单、容量大，是个人入门系统化的首选之一（参见 [[strat-trend-following]]）。
- A 股个股的中期动量不可靠，但行业/ETF 层面的轮动仍值得研究（参见 [[strat-etf-rotation]]）。
