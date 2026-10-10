---
id: tushare
title: Tushare Pro
kind: source
summary: 国内个人量化最常用的结构化数据接口之一：A 股行情、财务（带公告日）、指数、基金、期货、宏观等，积分制获取权限，数据规范、接口稳定。
format: data
cost: freemium
markets: [cn-a, cn-futures, cn-bond]
lang: zh
rating: 4
status: todo
url: https://tushare.pro
domains: [data]
tags: [数据接口, A股, 财务数据, Python]
importance: 4
confidence: medium
related: [akshare, baostock, data-types, point-in-time-data, retail-quant-ecosystem-cn]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 提供什么

- 股票日线/复权因子、每日指标、涨跌停价、停复牌
- 财务三表与指标（含公告日 `ann_date`，可用于时点对齐，参见 [[point-in-time-data]]）
- 指数行情与成分权重、基金、期货、可转债、宏观等
- Python SDK，返回 pandas DataFrame

## 优点

- 字段规范、文档清晰，适合建立本地数据仓库。
- 财务数据带公告日，是个人实现时点正确的关键。

## 局限/坑

- **积分制**：不同接口需要不同积分。2026 年社区资料显示：日线等基础行情门槛最低，财务数据约需 2000 积分，分钟数据需单独捐助开通，部分接口（如 ST 列表）需 3000 积分；新注册无积分账户调用部分接口会被拒绝。以官网各接口文档的「权限」说明为准。
- 有调用频率限制，批量下载要做限流与断点续传（参见 [[data-engineering]]）。
- 分钟数据等高阶数据权限门槛更高。

## 怎么用

Phase 1 中作为主数据源之一，与 [[akshare]] 交叉核对关键字段。
