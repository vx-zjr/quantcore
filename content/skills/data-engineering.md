---
id: data-engineering
title: 数据工程
kind: skill
summary: 数据的采集、清洗、校验、存储、调度与监控——建立一条可信、自动、可复现的数据管道，是研究阶段的第一个工程交付物。
domains: [data, programming]
tags: [数据管道, ETL, 调度, 数据质量]
level: 0
target: 3
importance: 4
confidence: high
related: [sql-storage, data-cleaning, point-in-time-data, data-types, phase-1-data-infra]
prereqs: [python, sql-storage]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

研究结论的可信度上限由数据质量决定。手工下载、手工处理的数据无法复现、无法增量更新，也无法在实盘中自动运行。

## 等级标准

- **L1 入门**：能用 API 下载数据并保存为文件。
- **L2 会用**：能写脚本批量下载、清洗并存入本地库；处理限流、重试与断点续传。
- **L3 熟练**：管道可增量更新、幂等（重复运行结果一致）；有数据质量检查（缺失、异常、跨源核对）与日志；用定时任务自动运行。
- **L4 精通**：数据版本化、时点数据库设计、多源合并与冲突解决；有监控与告警。
- **L5 专家**：机构级数据平台架构。

## 练习路径

1. 先阅读 [[data-types]]、[[data-cleaning]]、[[point-in-time-data]]。
2. Phase 1 的核心交付就是这条管道（参见 [[phase-1-data-infra]]）。
3. 为每个数据集写一个「体检」脚本：行数、日期覆盖、缺失率、与另一数据源的抽样差异。

## 验收方式

- L3：一条命令完成全 A 股日线 + 复权因子 + 指数成分的增量更新，附数据质量报告；中断后重跑结果一致。
