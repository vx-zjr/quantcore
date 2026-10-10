---
id: machine-learning
title: 机器学习
kind: skill
summary: 监督学习的基本方法（线性模型、正则化、树模型、集成）、偏差-方差权衡、模型评估与特征工程——在金融中要配合严格的时序验证使用。
domains: [ml]
tags: [机器学习, scikit-learn, LightGBM, 正则化]
level: 0
target: 3
importance: 3
confidence: high
related: [ml-in-finance, cross-validation-finance, book-statistical-learning, probability-statistics, qlib]
prereqs: [probability-statistics, pandas-numpy]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

ML 是现代量化的重要工具（因子合成、风险预测、文本处理），但它在金融数据上的滥用也最普遍。目标是**会用且知道何时不该用**（参见 [[ml-in-finance]]）。

## 等级标准

- **L1 入门**：理解训练/测试、过拟合、分类与回归的概念；能跑通 scikit-learn 示例。
- **L2 会用**：掌握线性/逻辑回归、正则化（Lasso/Ridge）、决策树、随机森林、梯度提升；理解偏差-方差权衡与交叉验证。
- **L3 熟练**：能为金融问题设计标签与特征；使用时序交叉验证、正确调参；能解释模型（SHAP/置换重要性）并判断是否过拟合。
- **L4 精通**：能构建完整的 ML 因子研究流水线并稳定产出样本外有效的模型；熟悉神经网络在序列/文本上的应用。
- **L5 专家**：研究级。

## 练习路径

1. [[book-statistical-learning]]（ISLR，有 Python 版，免费）。
2. scikit-learn 官方教程；LightGBM 文档。
3. 用 LightGBM 合成 5 个经典因子，与等权合成在样本外对比（Phase 2 之后）。

## 验收方式

- L3：一份研究报告，比较线性与树模型的因子合成在前推验证下的表现，并诚实报告尝试次数与不确定性。
