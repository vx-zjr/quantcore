---
id: glossary-basics
title: 量化入门术语表
kind: knowledge
summary: 零基础必备的约 40 个术语的大白话解释（收益率、波动率、回撤、夏普、因子、回测、过拟合、alpha/beta、滑点、T+1、ETF、期货……），每个都链接到详细节点。
domains: [market-structure, backtest]
tags: [起点, 入门, 术语, 零基础]
status: todo
importance: 5
confidence: high
related: [what-is-quant, performance-metrics, cn-a-share-rules, backtesting-pitfalls, factor-models]
created: 2026-10-10
updated: 2026-10-10
---

> 第一次看不需要全懂。遇到看不懂的词就回来查；想深入就点链接。

## 市场与产品

| 术语 | 大白话 | 详见 |
|---|---|---|
| 股票 | 公司所有权的一小份 | [[market-knowledge]] |
| 指数 | 一篮子股票的平均表现，如沪深 300 | [[market-knowledge]] |
| ETF | 在交易所像股票一样买卖的基金，常跟踪一个指数 | [[strat-etf-rotation]] |
| 期货 | 约定未来某天按某价格买卖某物的合约，可做空、有杠杆 | [[cn-futures-options]] |
| 期权 | 「有权但没有义务」按约定价格买卖的合约，像保险 | [[options-basics]] |
| 可转债 | 可以按约定价格换成股票的公司债 | [[strat-convertible-bonds]] |
| T+1 | A 股今天买的股票明天才能卖 | [[cn-a-share-rules]] |
| 涨跌停 | 单日最大涨跌幅限制，触及后可能买不进/卖不出 | [[cn-a-share-rules]] |
| 做多 / 做空 | 赌涨 / 赌跌。A 股个股基本只能做多 | [[cn-a-share-rules]] |
| 杠杆 | 借钱或用保证金放大仓位，盈亏同时放大 | [[position-sizing-kelly]] |
| 流动性 | 能否以接近当前的价格快速成交 | [[market-microstructure]] |

## 收益与风险

| 术语 | 大白话 | 详见 |
|---|---|---|
| 收益率 | 赚了百分之几 | [[performance-metrics]] |
| 年化收益 | 折算成「平均每年」赚多少 | [[performance-metrics]] |
| 波动率 | 涨跌有多剧烈，越大越颠簸 | [[volatility-basics]] |
| 最大回撤 | 从最高点最多跌了多少，最「痛」的那一段 | [[performance-metrics]] |
| 夏普比率 | 每承担一份波动，换来多少超额收益；越高越好，但太高要怀疑 | [[performance-metrics]] |
| 基准 | 用来比较的参照物，如沪深 300 指数 | [[performance-metrics]] |
| 超额收益 / alpha | 跑赢基准的那部分，且不是靠多承担风险得来的 | [[factor-models]] |
| beta | 随大盘涨跌的那部分收益 | [[factor-models]] |
| 相关性 | 两样东西是不是同涨同跌 | [[portfolio-construction]] |
| 分散化 | 不把鸡蛋放一个篮子，降低整体波动 | [[portfolio-construction]] |
| 仓位 | 投入多少比例的钱 | [[position-sizing-kelly]] |
| 厚尾 | 极端涨跌比「正态分布」预测的多得多 | [[return-distributions]] |

## 研究方法

| 术语 | 大白话 | 详见 |
|---|---|---|
| 策略 | 一套明确的买卖规则 | [[what-is-quant]] |
| 信号 | 规则里用来判断买卖的指标 | [[alpha-research-pipeline]] |
| 因子 | 能解释「为什么有的股票涨得多」的特征，如便宜、小、近期强势 | [[factor-models]] |
| 回测 | 假装回到过去，按规则交易一遍，看结果如何 | [[backtesting-pitfalls]] |
| 过拟合 | 规则只是「背下了」历史的偶然，未来不灵 | [[overfitting-is-default]] |
| 前视偏差 | 回测时不小心用到了当时还不知道的信息 | [[point-in-time-data]] |
| 幸存者偏差 | 只看到活下来的（股票、基金、成功者），忽略了失败的 | [[base-rates]] |
| 样本内 / 样本外 | 用来设计规则的数据 / 留着检验规则的数据 | [[cross-validation-finance]] |
| 模拟盘 | 用实时行情按规则「假交易」，不花真钱 | [[phase-3-paper-trading]] |
| 滑点 | 实际成交价比预期差的那一点 | [[transaction-costs]] |
| 交易成本 | 佣金、税、滑点、冲击加起来的总花费 | [[transaction-costs]] |
| 换手率 | 交易有多频繁；越高成本越大 | [[transaction-costs]] |
| 容量 | 一个策略最多能承载多少钱而不失效 | [[small-player-edge]] |

## 工具

| 术语 | 大白话 | 详见 |
|---|---|---|
| Python | 量化最常用的编程语言 | [[python]] |
| pandas | Python 里处理表格数据的工具 | [[pandas-numpy]] |
| API | 程序之间取数据、下指令的接口 | [[data-engineering]] |
| 复权 | 修正分红送股造成的价格「跳空」 | [[data-cleaning]] |
| QMT / PTrade | 券商提供的量化交易软件 | [[qmt-ptrade]] |
