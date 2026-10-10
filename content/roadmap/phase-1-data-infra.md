---
id: phase-1-data-infra
title: 阶段 1：数据与研究环境
kind: roadmap
summary: 搭建可复现的 Python 研究环境与本地数据仓库：自动增量更新、时点正确、有质量检查——之后的所有研究都建立在它之上。
phase: 1
status: todo
domains: [data, programming]
tags: [数据管道, 研究环境]
importance: 4
confidence: high
related: [phase-0-foundation, phase-2-research-framework, data-engineering]
prereqs: [phase-0-foundation, data-types, point-in-time-data, data-cleaning, sql-storage, python]
created: 2026-10-10
updated: 2026-10-10
---

## 目标

拥有一个「一条命令更新、随时可查、可以信任」的本地数据仓库，覆盖主攻市场的核心数据。

## 交付物

- [ ] 研究代码仓库（可以是本仓库下的独立目录，或单独仓库），带依赖锁定与 README
- [ ] 主攻市场日线行情（不复权价 + 复权因子 + 涨跌停价 + 停牌标记），包含退市标的
- [ ] 指数成分历史（至少沪深 300 / 中证 500 / 中证 1000，或对应市场的主要指数）
- [ ] 基础财务数据，带公告日（若主攻股票）
- [ ] 存储为 Parquet + DuckDB，支持增量更新（参见 [[sql-storage]]）
- [ ] 数据质量报告：覆盖率、缺失率、与第二数据源的抽样核对（参见 [[data-engineering]]）
- [ ] 一个「时点检查」单元测试（参见 [[point-in-time-data]]）

## 退出标准

- [ ] 在全新环境中按 README 一键重建数据，结果一致
- [ ] 能用 SQL/pandas 在秒级取出任意标的、任意区间的数据
- [ ] 「数据工程」技能自评 ≥ L2，「SQL 与存储」≥ L2

## 不做什么

- 不做策略研究（忍住）。
- 不追求分钟级/逐笔数据，除非主攻策略明确需要。
- 不购买昂贵的终端，先用免费/低价源验证需求（参见 [[tushare]]、[[akshare]]）。
