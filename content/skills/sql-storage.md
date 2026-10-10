---
id: sql-storage
title: SQL 与数据存储
kind: skill
summary: 用 SQL 查询与组织数据，选择合适的本地存储格式（Parquet、DuckDB、SQLite，规模大时 ClickHouse 等）——让研究数据可复现、可追溯、读取快。
domains: [data, programming]
tags: [SQL, DuckDB, Parquet, 数据库]
level: 0
target: 3
importance: 4
confidence: high
related: [data-engineering, pandas-numpy, data-types, python-data-stack]
prereqs: [python]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

把数据「拉下来存在 CSV 里」很快会失控：版本不明、读取缓慢、重复下载。一个简单的本地数据仓库是个人量化的基础设施。

## 推荐的个人方案（起步）

- **存储**：按数据集/年份分区的 **Parquet** 文件（列式、压缩好、读取快）。
- **查询**：**DuckDB**（嵌入式、零运维、直接 SQL 查询 Parquet，与 pandas/Polars 无缝互通）。
- **元数据**：记录每个数据集的来源、下载时间、字段说明。
- 数据量到亿级、需要并发服务时再考虑 ClickHouse 等服务端数据库。

## 等级标准

- **L1 入门**：会 `SELECT ... WHERE ... ORDER BY`。
- **L2 会用**：会 `JOIN`、`GROUP BY`、子查询；能用 DuckDB 查询 Parquet。
- **L3 熟练**：会窗口函数（如 `LAG`、滚动聚合）；能设计分区与表结构；理解列式存储的性能特征。
- **L4 精通**：能设计增量更新、数据版本管理与完整性校验的数据仓库。
- **L5 专家**：大规模时序数据库的架构与调优。

## 练习路径

1. DuckDB 官方文档的 SQL 入门。
2. 把日线数据存为按年分区的 Parquet，用 SQL 计算每只股票的 20 日收益（窗口函数），与 pandas 结果核对。

## 验收方式

- L3：建立本地日线库，支持一条命令增量更新，并能用 SQL 在一秒内查询任意股票任意区间的数据。
