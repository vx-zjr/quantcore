---
id: cross-validation-finance
title: 金融时间序列的样本外验证
kind: knowledge
summary: 普通 K 折交叉验证会因序列相关和标签重叠而泄露信息；金融上应使用前推验证（walk-forward）、带清洗与禁区的 K 折（purged k-fold + embargo）和组合清洗交叉验证（CPCV）。
domains: [backtest, ml]
tags: [交叉验证, walk-forward, purged k-fold, 样本外]
status: todo
importance: 4
confidence: high
related: [overfitting-is-default, multiple-testing, ml-in-finance, backtesting-pitfalls, book-afml]
prereqs: [backtesting-pitfalls]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么普通交叉验证不行

- **序列相关**：相邻时间的样本高度相关，随机打乱后训练集「看到」了测试集附近的信息。
- **标签重叠**：如果标签是未来 20 天收益，相邻样本的标签区间大量重叠，测试集信息通过标签泄漏到训练集。
- **非平稳**：未来的数据分布可能和过去不同，随机切分掩盖了这一点。

## 方法

**1. 简单留出（Hold-out）**
- 按时间切分：前 70% 研究，后 30% 只验证一次。
- 简单，但只有一条路径，且样本外只能用一次。

**2. 前推验证（Walk-forward）**
- 用滚动或扩展窗口训练，在紧接着的下一段测试，然后整体向前推进。
- 最贴近实盘的流程。缺点：每个测试点只有一个结果，早期训练数据少。

**3. 清洗 K 折 + 禁区（Purged K-Fold with Embargo，López de Prado）**
- 从训练集中**清洗（purge）**掉标签区间与测试集重叠的样本。
- 在测试集之后设置**禁区（embargo）**，进一步隔离序列相关。

**4. 组合清洗交叉验证（CPCV）**
- 生成多条回测路径，得到样本外表现的**分布**而不是单个数值，可用于估计过拟合概率（参见 [[multiple-testing]] 中的 PBO）。

## 关键要点

- 无论哪种方法，**真正的样本外只有未来**。所有历史数据在反复研究后都会被「污染」。
- 超参数选择也必须在交叉验证内部完成（嵌套），否则仍然泄漏。
- 对规则型策略（非 ML），前推验证 + 参数邻域稳定性检验通常足够。

## 常见误区

- 用 sklearn 默认的 `KFold(shuffle=True)` 处理时间序列。
- 用 `TimeSeriesSplit` 但忽略了标签区间重叠。
