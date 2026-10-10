---
id: git-linux
title: Git / Linux / 命令行
kind: skill
summary: 版本控制、命令行操作与基本的服务器运维——让研究可追溯、让 AI 的每次修改可审阅、让程序能在服务器上稳定运行。
domains: [programming]
tags: [Git, Linux, 命令行, 版本控制]
level: 0
target: 3
importance: 3
confidence: high
related: [engineering-practices, python, execution-operations, llm-assisted-research]
prereqs: []
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

- **Git**：每次研究的代码与结论都能回溯；AI 修改内容后，用 `git diff` 审阅、用 `git revert` 回滚。本仓库本身就依赖 Git 进行迭代。
- **命令行**：运行脚本、管理环境、查看日志的基本功。
- **Linux**：未来如果在云服务器上运行数据管道或策略，需要基本运维能力。

## 等级标准

- **L1 入门**：会 `git clone/add/commit/push`；会在终端中 `cd`、`ls`、运行脚本。
- **L2 会用**：会分支、合并、查看历史与 diff、解决简单冲突；会用 ssh 登录服务器，管理文件与进程。
- **L3 熟练**：理解 rebase、cherry-pick、tag；会写 shell 脚本、配置 cron 定时任务、查看与轮转日志；会用 tmux/screen。
- **L4 精通**：会配置 CI、systemd 服务、监控与告警；理解基础网络与安全（防火墙、密钥管理）。
- **L5 专家**：系统管理员级。

## 练习路径

1. 本仓库就是练习场：每次让 AI 修改后，先 `git diff` 看改了什么，再提交。
2. 学习《Pro Git》前 3 章。
3. 用 cron 每天定时运行一个下载脚本，并把输出写入日志文件。

## 验收方式

- L3：在一台云服务器上部署一个每日定时运行的数据更新任务，日志可查、失败有通知。
