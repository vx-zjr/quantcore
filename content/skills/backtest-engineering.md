---
id: backtest-engineering
title: 回测系统构建
kind: skill
summary: 设计并实现可信的回测引擎：时间推进与信号/成交错开、市场规则与成本建模、组合记账、绩效报告与一致性测试——Phase 2 的核心能力。
domains: [backtest, programming]
tags: [回测引擎, 向量化回测, 事件驱动, 撮合模拟]
level: 0
target: 3
importance: 4
confidence: high
related: [backtesting-pitfalls, transaction-costs, cn-a-share-rules, backtest-frameworks, engineering-practices, phase-2-research-framework]
prereqs: [pandas-numpy, engineering-practices]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

现成框架（参见 [[backtest-frameworks]]）可以用，但你必须理解它在做什么、做错了什么。很多框架默认的假设（收盘价成交、无涨跌停、无成本）对 A 股不成立。至少要能**审计**一个回测，最好能自己写一个最小可信的版本。

## 一个可信回测的组成

1. **数据层**：时点正确的数据（参见 [[point-in-time-data]]）。
2. **信号层**：只使用截至 $t$ 的信息生成目标持仓。
3. **执行层**：在 $t+1$（或更晚）按规则模拟成交——涨跌停、停牌、最小单位、成本、流动性上限（参见 [[cn-a-share-rules]]、[[transaction-costs]]）。
4. **记账层**：现金、持仓、分红送转、费用逐日结算。
5. **报告层**：绩效指标、换手、暴露、分时期表现（参见 [[performance-metrics]]）。
6. **测试层**：用已知答案的合成数据验证引擎；用「随机信号」验证夏普接近 0。

## 等级标准

- **L1 入门**：会用一个现成框架跑示例策略。
- **L2 会用**：能写一个向量化的日频回测（含成本），结果与框架对得上。
- **L3 熟练**：能实现包含 A 股主要规则的事件驱动或半向量化回测；有一致性测试；能审计他人回测中的偏差。
- **L4 精通**：支持多资产、多策略、组合层面的风险与归因；性能足以支撑大规模研究。
- **L5 专家**：机构级回测平台的架构师。

## 验收方式

- L3：同一策略分别用自写引擎和一个开源框架回测，差异 < 1% 年化且能逐项解释差异来源；随机信号测试夏普在 0 附近。
