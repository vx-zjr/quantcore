---
id: book-systematic-trading
title: 《Systematic Trading》— Robert Carver
kind: source
summary: 前 Man AHL 基金经理写给个人的系统化交易设计手册：如何设计稳健的规则、按波动率定仓位、组合多个信号、避免过拟合；个人量化的第一本必读书。
format: book
cost: paid
markets: [global, cn-futures]
lang: en
rating: 5
status: todo
url: https://qoppac.blogspot.com
domains: [strategy, risk]
tags: [系统化交易, 趋势跟踪, 仓位管理, 必读]
importance: 5
confidence: high
related: [strat-trend-following, position-sizing-kelly, simplicity-first, overfitting-is-default, phase-0-foundation]
created: 2026-10-10
updated: 2026-10-10
---

## 提供什么

Robert Carver, *Systematic Trading* (2015)。核心内容：
- 为什么要系统化、人类的偏差如何破坏交易；
- 交易规则的设计原则：少量、稳健、有逻辑；
- 预测值（forecast）的标准化与组合；
- **波动率目标与仓位计算**的完整框架；
- 如何避免过拟合、如何对待回测结果。

同作者还有 *Leveraged Trading*（更面向小资金实操）和 *Advanced Futures Trading Strategies*。作者博客（链接）持续更新大量实用文章，并开源了 pysystemtrade 框架。

## 优点

- 作者有机构实战经验，又专门针对个人的约束写作——与本中心的定位高度一致。
- 处处体现 [[simplicity-first]] 与 [[overfitting-is-default]] 的思想。

## 局限

- 以期货为主要场景，股票多因子涉及较少。

## 怎么用

Phase 0 必读。读完后对照 [[strat-trend-following]] 与 [[position-sizing-kelly]] 写读书笔记（作为 journal）。
