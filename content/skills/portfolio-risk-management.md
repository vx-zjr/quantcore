---
id: portfolio-risk-management
title: 组合与风险管理实践
kind: skill
summary: 把仓位管理、组合构建、风险度量与压力测试落到实处：给出明确的仓位、上限、熔断规则，并能在实盘中持续执行。
domains: [risk]
tags: [风控, 仓位, 组合, 压力测试]
level: 0
target: 3
importance: 4
confidence: high
related: [risk-management, position-sizing-kelly, portfolio-construction, survival-first, volatility-basics]
prereqs: [probability-statistics]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

同样的信号，不同的仓位与组合方式，可以得到完全不同的结局。对个人而言，风控能力比选股能力更决定长期结果（参见 [[survival-first]]）。

## 等级标准

- **L1 入门**：理解最大回撤、波动率、相关性；知道不该满仓单一标的。
- **L2 会用**：能按波动率目标计算仓位；能设定并执行单标的/单策略上限；会做简单的历史情景压力测试。
- **L3 熟练**：能构建多策略组合并估计其风险贡献；会计算 VaR/CVaR 并理解其局限；有书面的熔断与降仓规则。
- **L4 精通**：能做因子暴露控制、风险归因；能设计动态风险预算。
- **L5 专家**：机构风控负责人水平。

## 练习路径

1. 读 [[position-sizing-kelly]]、[[portfolio-construction]]、[[risk-management]]。
2. 用 5 个 ETF 构造等权、波动率倒数、风险平价三种组合，对比历史表现与最大回撤（这是研究练习，不是交易）。
3. 写下自己的「风控宪法」：最大可承受回撤、杠杆上限、熔断条件——写进 profile.yaml。

## 验收方式

- L3：一份书面的个人风控规则，包含数字化的上限与熔断，以及对 2015、2020、2024 三个压力期的情景测试结果。
