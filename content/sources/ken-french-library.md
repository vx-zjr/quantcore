---
id: ken-french-library
title: Kenneth French 数据库
kind: source
summary: Fama-French 因子与各类分组组合的官方免费数据（美国与全球多个地区），是因子研究的基准数据集，可用于复现经典结论、校准自己的回测框架。
format: data
cost: free
markets: [us, global]
lang: en
rating: 5
status: todo
url: https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html
domains: [data, asset-pricing]
tags: [因子数据, Fama-French, 学术]
importance: 3
confidence: high
related: [factor-models, papers-classic-factors, momentum-and-reversal]
created: 2026-10-10
updated: 2026-10-10
---

## 提供什么

- Fama-French 三因子、五因子、动量因子的日/月度收益。
- 按规模、价值、动量、行业等分组的组合收益。
- 美国、发达市场、新兴市场等多个地区。

## 优点

- 学术界的标准参照，免费、长历史（美国数据可追溯至 1926 年）。

## 局限/坑

- 不含中国 A 股；A 股因子数据需自行构建或参考相关学术论文（参见 [[cn-factor-landscape]]）。

## 怎么用

- 学习因子模型时直接下载数据观察因子的长期表现与回撤（参见 [[factor-models]]）。
- 用作「已知答案」来验证自己构建因子的代码。
