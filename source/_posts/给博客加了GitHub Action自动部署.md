---
title: 给博客加了GitHub Action自动部署
tags:
  - Hexo
  - 博客
  - GitHub
categories:
  - Study
date: 2020-04-30 22:50:00
---

虽然很久没有写博客了，但是题还是在做的，最近也跳了槽来了Google。前几天有人给我的BGM report仓库开PR，由于不想手动try，所以就加了个简单的GitHub Action来自动测。今天给博客也加上了Action，以后就不用手动run Hexo命令来生成然后再push了。

Action Workflow：<https://github.com/Shell32-Natsu/Shell32-Natsu.github.io/blob/src/.github/workflows/deploy.yml>

今天还写了个远征计时的小玩意儿，用React的小App，也用了Action自动部署到GitHub Pages。
