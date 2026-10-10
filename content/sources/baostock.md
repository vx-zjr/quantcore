---
id: baostock
title: BaoStock
kind: source
summary: 免费的 A 股历史数据接口，提供日线/分钟线行情、复权因子与部分财务数据，无需注册积分，适合入门练习与交叉核对。
format: data
cost: free
markets: [cn-a]
lang: zh
rating: 3
status: todo
url: http://baostock.com
domains: [data]
tags: [免费, A股, 历史行情]
importance: 2
confidence: medium
related: [tushare, akshare, data-types]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 提供什么

A 股日线与分钟线历史行情、复权因子、季频财务指标、指数成分等。Python 接口。

## 优点

- 免费、无需积分，接口简单，适合新手入门。

## 局限/坑

- 更新与维护节奏不如商业数据源，数据覆盖范围有限。
- 作为补充与交叉核对来源，而不是主数据源。

## 怎么用

在 Phase 1 中用于抽样核对 [[tushare]]、[[akshare]] 的行情与复权数据。
