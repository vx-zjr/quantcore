---
id: position-sizing-kelly
title: 仓位管理与凯利公式
kind: knowledge
summary: 仓位决定了你能否活下来以及能否复利增长；凯利公式给出长期增长最优的理论上限，实践中用分数凯利与波动率目标来应对参数不确定性。
domains: [risk]
tags: [仓位, 凯利公式, 波动率目标, 杠杆]
status: todo
importance: 5
confidence: high
related: [survival-first, risk-management, portfolio-construction, volatility-basics, performance-metrics]
prereqs: [performance-metrics]
created: 2026-10-10
updated: 2026-10-10
---

## 凯利公式

**离散赌局**：胜率 $p$，赔率 $b$（赢时得 $b$ 倍下注额，输时失去下注额），最优下注比例
$$f^* = \frac{bp - (1-p)}{b}$$

**连续收益（近似）**：对超额收益均值 $\mu$、方差 $\sigma^2$ 的资产，最优杠杆
$$f^* = \frac{\mu}{\sigma^2}$$
此时长期增长率为 $g^* = \frac{\mu^2}{2\sigma^2} = \frac{SR^2}{2}$。

## 为什么实践中用「分数凯利」

- **参数估计误差**：$\mu$ 极难估准，高估 $\mu$ 会导致过度下注。超过凯利仓位（尤其 2 倍以上）会让长期增长率变为负数。
- **增长率曲线很平**：半凯利仓位能获得约 75% 的最优增长率，但波动率减半、回撤大幅减小。
- **经验法则**：用估计值的 **1/4 到 1/2 凯利**。

## 波动率目标（Volatility Targeting）

更实用的仓位方法：设定组合目标年化波动率（如 10%–15%），按资产当前波动率反向缩放仓位：
$$w_t = \frac{\sigma_{\text{target}}}{\hat\sigma_t}$$
- 优点：风险在不同资产、不同时期之间可比；危机时自动降仓。
- 是系统化趋势跟踪的标准做法（参见 [[strat-trend-following]]、[[book-systematic-trading]]）。

## 其他方法

| 方法 | 做法 | 评价 |
|---|---|---|
| 固定金额 | 每笔固定金额 | 简单，但不随风险调整 |
| 固定比例 | 每笔占总资金固定比例 | 自动复利与缩仓 |
| 固定风险 | 每笔止损时亏损固定比例资金（如 1%） | 交易型策略常用 |
| 风险平价 | 各资产风险贡献相等 | 见 [[portfolio-construction]] |

## 常见误区

- 按「信心」决定仓位，而不是按风险。
- 用回测夏普直接计算凯利杠杆（回测夏普被高估，参见 [[multiple-testing]]）。
- 忽视资产之间的相关性：多个高度相关的头寸等于一个大头寸。
