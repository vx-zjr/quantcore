---
id: python-data-stack
title: Python 量化研究技术栈
kind: source
summary: 个人本地研究环境的推荐组合：uv/conda 环境管理、pandas/Polars/NumPy 数据处理、DuckDB+Parquet 存储、statsmodels/scikit-learn/LightGBM 建模、Jupyter 交互、matplotlib/plotly 可视化。
format: tool
cost: free
markets: [global]
lang: en
rating: 5
status: todo
url: https://pandas.pydata.org
domains: [programming, data]
tags: [Python, pandas, Polars, DuckDB, Jupyter]
importance: 4
confidence: high
related: [python, pandas-numpy, sql-storage, machine-learning, backtest-frameworks, retail-quant-ecosystem-cn]
created: 2026-10-10
updated: 2026-10-10
---

## 推荐组合

| 用途 | 工具 |
|---|---|
| 环境与依赖 | uv（快）或 conda；锁定版本 |
| 数据处理 | pandas（生态最全）、Polars（快、内存省）、NumPy |
| 存储与查询 | Parquet 文件 + DuckDB（https://duckdb.org） |
| 统计与计量 | statsmodels、scipy、arch（GARCH） |
| 机器学习 | scikit-learn、LightGBM |
| 交互研究 | Jupyter / VS Code Notebook |
| 可视化 | matplotlib、plotly |
| 代码质量 | pytest、ruff、类型提示 |

## 优点

- 全部免费开源、文档完善、社区庞大；AI 编码助手对这些库的支持也最好（参见 [[llm-assisted-research]]）。

## 局限/坑

- 自由度高也意味着需要自己搭建与维护；先从最小组合开始（pandas + DuckDB + Jupyter），按需增加。

## 怎么用

Phase 1 的研究环境基础（参见 [[phase-1-data-infra]]）。
