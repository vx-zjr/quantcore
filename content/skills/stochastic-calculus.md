---
id: stochastic-calculus
title: 随机微积分
kind: skill
summary: 布朗运动、伊藤引理、随机微分方程——衍生品定价的数学基础；对个人做中低频策略不是必需，了解直觉即可。
domains: [math-stats]
tags: [布朗运动, 伊藤引理, SDE, 衍生品定价]
level: 0
target: 1
importance: 1
confidence: high
related: [options-basics, mean-reversion-cointegration]
prereqs: [probability-statistics]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要（以及为什么不急）

随机微积分是卖方衍生品定价（「P 测度 vs Q 测度」中的 Q 世界）的核心工具，也是很多量化面试的考点。但个人量化主要在 P 世界（预测真实收益分布）工作，**它的优先级很低**。目标 L1：理解几何布朗运动和 OU 过程的直觉即可。

## 等级标准

- **L1 入门**：知道布朗运动的性质；理解几何布朗运动（股价模型）与 OU 过程（均值回归模型）的含义。
- **L2 会用**：能用伊藤引理推导 $\ln S_t$ 的动态；能用蒙特卡洛模拟 SDE。
- **L3 熟练**：能推导 Black-Scholes 方程；理解风险中性定价与测度变换。
- **L4 精通**：掌握随机波动率、跳跃扩散模型。
- **L5 专家**：研究级。

## 练习路径（若有兴趣）

1. Shreve《金融随机分析》第 II 卷（硬核）或 MIT 18.S096 相关讲座（参见 [[courses]]）。
2. 用 Python 模拟几何布朗运动与 OU 过程，观察路径特征。

## 验收方式

- L1：能向别人解释为什么 $E[\ln S_T] \ne \ln E[S_T]$，以及这与「波动拖累」（参见 [[survival-first]]）的关系。
