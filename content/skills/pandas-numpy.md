---
id: pandas-numpy
title: pandas / NumPy / Polars 数据处理
kind: skill
summary: 时间序列与面板数据的向量化处理：索引对齐、重采样、分组、滚动窗口、透视、合并——研究代码 80% 的时间花在这里，也是前视偏差最常发生的地方。
domains: [programming, data]
tags: [pandas, NumPy, Polars, 向量化, 面板数据]
level: 0
target: 4
importance: 5
confidence: high
related: [python, data-cleaning, backtesting-pitfalls, sql-storage, python-data-stack]
prereqs: [python]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

几乎所有研究都是在处理「日期 × 股票」的面板数据。熟练的数据处理能力让你快速验证想法；不熟练则会写出又慢又容易错位（前视偏差）的代码。

## 等级标准

- **L1 入门**：能读 CSV、筛选列、计算简单统计。
- **L2 会用**：熟练使用 `groupby`、`merge`、`pivot`、`resample`、`rolling`、`shift`；理解 DatetimeIndex 与 MultiIndex。
- **L3 熟练**：全程向量化，避免逐行循环；能正确处理缺失值与对齐；**能识别 `shift` 方向错误导致的前视**；能把截面因子计算写成清晰的函数。
- **L4 精通**：熟悉 NumPy 广播与内存布局；能用 Polars/DuckDB 处理千万行级数据；能做性能剖析与优化。
- **L5 专家**：能为数据处理库贡献代码或设计高性能研究框架。

## 练习路径

1. 《Python for Data Analysis》（Wes McKinney，pandas 作者）。
2. 实战：下载全 A 股日线，计算每只股票过去 20 日收益，按日分 5 组，计算各组次日平均收益。
3. 用 Polars 重写同样的计算，对比速度与写法。

## 验收方式

- L3：完成上面的分组回测练习，并写一个单元测试证明信号计算没有使用当日之后的数据。
