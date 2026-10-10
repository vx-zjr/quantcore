---
id: options-basics
title: 期权基础
kind: knowledge
summary: 期权的收益结构、定价直觉（Black-Scholes）、希腊字母、隐含波动率与波动率曲面；期权是交易「波动率」而非方向的工具，卖方承担尾部风险。
domains: [market-structure, risk]
tags: [期权, 希腊字母, 隐含波动率, Black-Scholes]
status: todo
importance: 3
confidence: high
related: [volatility-basics, strat-options-volatility, cn-futures-options, return-distributions, stochastic-calculus]
prereqs: [volatility-basics]
created: 2026-10-10
updated: 2026-10-10
---

## 是什么

- **看涨期权（Call）**：以行权价 $K$ 买入标的的权利；到期收益 $\max(S_T - K, 0)$。
- **看跌期权（Put）**：以 $K$ 卖出标的的权利；到期收益 $\max(K - S_T, 0)$。
- 买方付权利金、风险有限；卖方收权利金、风险可能很大。
- **欧式**只能到期行权；**美式**可提前行权。国内 ETF 期权为欧式。

## 定价直觉

**Black-Scholes** 假设对数正态价格、恒定波动率、无摩擦，期权价格取决于：标的价格 $S$、行权价 $K$、到期时间 $T$、无风险利率 $r$、**波动率 $\sigma$**。

其中只有波动率不可直接观测。反过来，用市场价格反推出的 $\sigma$ 称为**隐含波动率（IV）**——期权市场实际上是在用 IV 报价。

## 希腊字母

| 希腊字母 | 含义 | 直觉 |
|---|---|---|
| Delta Δ | 对标的价格的敏感度 | 等效持有多少标的 |
| Gamma Γ | Delta 对价格的敏感度 | 买方的「凸性」，卖方的噩梦 |
| Vega ν | 对波动率的敏感度 | 交易波动率的核心暴露 |
| Theta Θ | 时间流逝的价值损耗 | 卖方每天「收租」 |
| Rho ρ | 对利率的敏感度 | 通常较小 |

**Gamma 与 Theta 是一枚硬币的两面**：买方付出时间价值换取凸性；卖方收取时间价值承担凸性风险。

## 波动率曲面

- 不同行权价的 IV 不同：**波动率微笑/偏斜**（股指通常是下方 put 的 IV 更高，反映对暴跌的保险需求）。
- 不同到期日的 IV 不同：**期限结构**。
- 这说明 Black-Scholes 的恒定波动率假设与现实不符（参见 [[return-distributions]]）。

## 对个人量化的启示

- 期权是理解「风险溢价」和「尾部风险」最好的教材：卖期权长期赚小钱、偶尔亏大钱（参见 [[survival-first]]）。
- 系统化卖期权需要严格的仓位与尾部保护；对初学者而言，先理解、后观察，不急于交易（参见 [[strat-options-volatility]]）。
- 期权数学（随机微积分）对个人做中低频策略不是必需的（参见 [[stochastic-calculus]]）。
