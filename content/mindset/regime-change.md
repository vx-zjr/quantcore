---
id: regime-change
title: 非平稳与市场状态切换
kind: mindset
category: model
summary: 市场的统计规律会随宏观环境、制度和参与者结构而改变；历史回测只代表过去的状态组合，策略要对状态切换保持稳健。
domains: [strategy, macro]
tags: [非平稳, regime, 稳健性]
status: todo
importance: 4
confidence: high
related: [time-series-stationarity, alpha-decay, macro-regimes, survival-first, risk-management]
created: 2026-10-10
updated: 2026-10-10
---

## 核心

金融市场不是物理实验：「规律」本身会变。变化的来源包括：

- **宏观状态**：通胀/通缩、加息/降息周期、信用扩张/收缩（参见 [[macro-regimes]]）。
- **制度变化**：涨跌停规则、T+1、印花税、融券限制、注册制、程序化交易监管（参见 [[cn-a-share-rules]]、[[cn-programmatic-trading-rules]]）。
- **参与者结构**：散户占比下降、量化资金占比上升、外资流入流出。
- **技术变化**：交易速度、信息传播速度、AI 工具普及。

## 在量化中的体现

- 回测区间应覆盖多种市场状态（牛、熊、震荡、危机），并**分状态**查看表现，而不只看总数。
- 对 A 股：2015 年股灾、2016 熔断、2018 熊市、2020-2021 抱团、2024 年初小盘踩踏，都是检验策略的关键压力期。
- 不要用过于精细的规则去适应某一种状态——那等于对历史过拟合。
- 状态识别本身很难，事后看清晰，事中模糊。与其预测状态，不如让组合在各种状态下都不致命（参见 [[survival-first]]）。

## 自检问题

- 这个策略在哪种市场状态下会失效？那种状态出现时我能承受吗？
- 回测里赚的钱，是不是集中在某一两段特殊行情？
