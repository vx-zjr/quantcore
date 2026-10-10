---
id: factor-models
title: 因子模型
kind: knowledge
summary: 用少数共同因子解释资产收益的横截面差异：从 CAPM 到 Fama-French 三/五因子、动量因子、Barra 风格因子；区分「因子暴露（beta）」与「真正的 alpha」。
domains: [asset-pricing, strategy]
tags: [因子投资, Fama-French, Barra, smart beta, alpha]
status: todo
importance: 5
confidence: high
related: [cn-factor-landscape, ic-analysis, alpha-research-pipeline, edge-first, strat-multi-factor-equity, papers-classic-factors, book-factor-investing-cn]
prereqs: [probability-statistics]
created: 2026-10-10
updated: 2026-10-10
---

## 是什么

因子模型把资产的收益分解为若干共同因子的贡献加上个股特有部分：
$$r_i - r_f = \alpha_i + \sum_k \beta_{i,k} f_k + \epsilon_i$$
- $f_k$：因子收益（如市场、规模、价值）
- $\beta_{i,k}$：资产 $i$ 对因子 $k$ 的暴露（载荷）
- $\alpha_i$：因子无法解释的超额收益

## 演化脉络

| 模型 | 因子 | 要点 |
|---|---|---|
| CAPM | 市场 | 只有系统性风险被定价 |
| Fama-French 三因子（1993） | 市场、规模 SMB、价值 HML | 小盘与价值股有超额收益 |
| Carhart 四因子（1997） | + 动量 UMD | 过去赢家继续赢 |
| Fama-French 五因子（2015） | + 盈利 RMW、投资 CMA | 价值因子在五因子下变得冗余 |
| Barra 风格模型（业界） | 规模、价值、动量、波动、流动性、成长、杠杆…+ 行业 | 用于风险控制与归因，因子数十个 |
| 中国三因子（Liu-Stambaugh-Yuan 2019） | 市场、规模、价值（EP） | 剔除最小 30% 股票以排除「壳价值」干扰 |

## 两种因子模型

- **时间序列/宏观因子模型**：因子收益已知（如 FF 因子组合收益），回归估计每个资产的 beta。
- **横截面/基本面因子模型（Barra 类）**：已知每只股票的暴露（如市值、估值），每期截面回归估计因子收益。

## 为什么重要

- **区分 alpha 与 beta**：你以为的「选股能力」，可能只是暴露于小盘或动量因子。把收益对已知因子回归后剩下的才是 alpha。
- **风险控制**：组合的大部分风险来自因子暴露，而非个股。
- **因子本身就是策略**：系统地持有某个因子（smart beta），获取因子溢价。

## 关键要点

- 因子溢价有周期性：价值因子在 2010 年代后半段长期跑输；A 股小市值因子在 2017 年和 2024 年初都出现过剧烈回撤。
- **「因子动物园」问题**：已发表的因子数以百计，大部分是数据挖掘的产物（参见 [[multiple-testing]]）。
- 因子收益来源的解释：风险补偿 vs 行为偏差 vs 结构约束（参见 [[edge-first]]）。

## 常见误区

- 把高 beta 当成 alpha。
- 认为因子溢价每年都会兑现。
- 照搬美股因子结论到 A 股（市场结构、投资者结构不同，参见 [[cn-factor-landscape]]）。
