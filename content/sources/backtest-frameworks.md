---
id: backtest-frameworks
title: 开源回测框架对比
kind: source
summary: backtrader、vectorbt、zipline-reloaded、nautilus_trader、bt 等开源回测框架的定位与取舍；没有一个默认支持 A 股的全部规则，选择前先明确需求。
format: tool
cost: free
markets: [global]
lang: en
rating: 3
status: todo
domains: [backtest, programming]
tags: [回测框架, 开源, 对比]
importance: 3
confidence: medium
related: [backtest-engineering, backtesting-pitfalls, quantconnect-lean, vnpy, qlib, python-data-stack]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 对比

| 框架 | 类型 | 特点 | 注意 |
|---|---|---|---|
| backtrader | 事件驱动 | 教程多、灵活 | 原作者维护已基本停止 |
| vectorbt | 向量化 | 极快，适合大规模参数扫描 | 参数扫描快 = 过拟合也快；部分高级功能在商业版 |
| zipline-reloaded | 事件驱动 | 源自 Quantopian，社区维护 | 数据接入需要配置 bundle |
| nautilus_trader | 事件驱动（Rust 内核） | 高性能、研究与实盘一致 | 学习曲线陡 |
| bt | 组合层面 | 适合资产配置类策略 | 功能聚焦 |
| LEAN | 事件驱动 | 见 [[quantconnect-lean]] | C# 内核 |

GitHub：mementum/backtrader、polakowo/vectorbt、stefan-jansen/zipline-reloaded、nautechsystems/nautilus_trader、pmorissette/bt。

## 关键判断

- 这些框架都**不会自动处理 A 股的涨跌停、T+1、印花税、最小单位**等规则，需要自己扩展（参见 [[cn-a-share-rules]]）。
- 框架无法替你保证数据的时点正确（参见 [[point-in-time-data]]）。
- 对日频以下的个人策略，**一个自己写的、小而透明的向量化回测**往往比大框架更可控（参见 [[backtest-engineering]]）。

## 怎么用

Phase 2 中：自写简单引擎 + 选一个框架做交叉验证。
