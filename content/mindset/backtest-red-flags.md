---
id: backtest-red-flags
title: 回测红旗清单
kind: mindset
category: checklist
summary: 看到这些迹象时，应默认回测有问题（前视、过拟合、成本低估等），先排查再相信。
domains: [backtest]
tags: [清单, 回测, 过拟合]
status: todo
importance: 5
confidence: high
related: [backtesting-pitfalls, overfitting-is-default, multiple-testing, transaction-costs, point-in-time-data, go-live-checklist]
created: 2026-10-10
updated: 2026-10-10
---

## 收益曲线类

- 年化夏普 > 2（日频以上策略）或 > 3 —— 极大概率是 bug 或前视偏差
- 资金曲线过于平滑，几乎没有回撤
- 胜率极高（> 70%）且盈亏比也高
- 收益集中在少数几天/几笔交易，去掉后大幅缩水
- 2015、2020 年初、2024 年初、2026 年 7 月等压力期没有明显回撤（A 股）

## 数据与实现类

- 使用了当天收盘价计算信号、又以当天收盘价成交（前视偏差）
- 财务数据按报告期而非实际公告日对齐（参见 [[point-in-time-data]]）
- 股票池只包含当前存续的股票（幸存者偏差）
- 没有处理涨跌停无法成交、停牌、新股（参见 [[cn-a-share-rules]]）
- 复权方式错误或混用
- 指数成分用的是今天的成分股回溯历史
- 用今天的交易规则回测过去（如对 2025 年的主板 ST 股按 ±10% 涨跌幅计算）

## 成本与容量类

- 换手率很高，但成本假设只有佣金（没有冲击成本和滑点，参见 [[transaction-costs]]）
- 主要收益来自小市值、低流动性股票，但按全额成交计算
- 没考虑最小交易单位（100 股）和资金规模

## 过程类

- 说不出试了多少种参数组合（参见 [[multiple-testing]]）
- 参数稍微改动结果就大幅变化
- 样本外表现明显差于样本内，但「调整后」又变好了
- 无法用一句话说明 edge 来源（参见 [[edge-first]]）

**命中任何一条，都应先停下来排查，而不是继续优化。**
