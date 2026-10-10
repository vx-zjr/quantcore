---
id: yfinance
title: yfinance（Yahoo Finance 非官方接口）
kind: source
summary: 获取美股、港股、ETF 与全球指数日线数据最便捷的开源 Python 库；非官方接口，适合学习与原型，不适合作为严肃研究的唯一数据源。
format: data
cost: free
markets: [us, hk, global]
lang: en
rating: 2
status: todo
url: https://github.com/ranaroussi/yfinance
domains: [data]
tags: [美股, 开源, 原型]
importance: 2
confidence: medium
related: [data-types, quantconnect-lean, sec-edgar]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 提供什么

全球股票、ETF、指数、汇率的日线（及有限的分钟线）、分红拆股、部分基本面数据。

## 优点

- 一行代码获取数据，适合快速学习与原型验证。

## 局限/坑

- **非官方**：依赖 Yahoo 的网页接口，随时可能失效或被限流。
- 不含退市股票（幸存者偏差），基本面数据非时点版本。
- 使用条款对商业用途有限制。

## 怎么用

用于学习、画图、快速验证想法；正式研究美股应考虑更可靠的数据源，例如付费 API Massive（原 Polygon.io，2025-10-30 更名，原有接口与密钥继续可用；价格以官网为准）。
