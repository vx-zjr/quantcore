---
id: optimization
title: 最优化
kind: skill
summary: 凸优化、带约束优化与数值求解——用于组合权重求解、风险模型与参数估计；同时要理解「优化器会放大输入误差」。
domains: [math-stats]
tags: [凸优化, 二次规划, 约束, cvxpy]
level: 0
target: 2
importance: 3
confidence: high
related: [portfolio-construction, linear-algebra, machine-learning]
prereqs: [linear-algebra]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

组合构建（均值-方差、风险平价、带约束的指数增强）都是优化问题。个人量化在初期需求不大，但理解优化的性质能避免误用。

## 等级标准

- **L1 入门**：理解目标函数、约束、局部与全局最优。
- **L2 会用**：能用 `scipy.optimize` 或 `cvxpy` 求解带约束的二次规划（如带权重上下限的最小方差组合）。
- **L3 熟练**：理解凸性、拉格朗日乘子、KKT 条件；能诊断不收敛和数值问题；理解正则化与稳健优化。
- **L4 精通**：能设计包含换手惩罚、风险约束、交易成本的完整组合优化器。
- **L5 专家**：大规模优化、随机优化的研究级应用。

## 练习路径

1. 学 `cvxpy` 官方示例中的组合优化案例。
2. 对比等权、最小方差、均值-方差组合在样本外的表现，体会估计误差的影响（参见 [[portfolio-construction]]）。

## 验收方式

- L2：实现带「单资产权重 ≤ 10%、权重和为 1、不做空」约束的最小方差组合，并做样本外滚动检验。
