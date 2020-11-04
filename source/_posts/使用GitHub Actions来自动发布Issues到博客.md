
---
title: '使用GitHub Actions来自动发布Issues到博客'
tags:
- GitHub
- Hexo
- 博客
categories:
- 备忘
date: 2020-11-04 22:34:15
---

GitHub Actions真的是非常好用的东西，基于它的事件驱动的工作流可以自动化很多以前我都得手动做的东西。以前当然也可以通过别的CI平台来做，但是GitHub Actions跟GitHub深度集成还是让它成为我的第一选择。~~最重要的还免费。~~

这次我是通过GitHub Actions来实现在Issues发布的内容，自动转换为Hexo文章，然后push到repo，再自动生成、部署。

<https://blog.xiadong.info/2020/11/04/This%20is%20a%20test%20blog%20post/>这篇文章就是这样写的，本文也是。

<!-- more -->

主要的workflow文件：
 - <https://github.com/Shell32-Natsu/Shell32-Natsu.github.io/blob/src/.github/workflows/issues.yml>

自己写的Action：
 - <https://github.com/Shell32-Natsu/blog-article-from-issue-action>

Workflow和Action之间都是用base64编码过的字符串，以防止特殊字符的影响。

# Workflow

整个流程挺直观的，主要步骤是：

 - Issue的创建，更改会出发action
 - Checkout
 - 这里注意checkout使用的是Personal Access Token来clone仓库，这是为了在push的时候可以触发部署的Action，否则push后是不会触发别的action的。
 - 从`github.event.issue`获取Issue信息
 - 注意`ISSUE="${ISSUE//$'\n'}"`这里专门去掉了换行符，是为了下一步运行自定义action的时候不会因换行符导致bash命令出错。
 - 运行自定义的action生成文章
 - 保存到文件
 - Add & Push

# 自定义Action

自定义的Action其实是一个Docker image，只不过是由GitHub Actions在运行时构建的，我写了一个简单的Python脚本来处理输入的JSON字符串，然后生成一个Hexo的文章。

# 功能

其实不需要啥功能，只有如下几个：

1. 根据`tags/...`，`categories/...`的issue tag自动添加文章tag和category。
2. 可以设置只处理特定用户的issue
3. 只处理有`BlogPost`tag的issue，这样可以灵活控制是否发布。
4. 编辑文章也会触发部署

问题：
1. 目前还不支持删除文章，想要删除只能手动操作。感觉可以通过tag增减和删除issue的事件来做。


---
title: '使用GitHub Actions来自动发布Issues到博客'
tags:
- GitHub
- Hexo
- 博客
categories:
- 备忘
date: 2020-11-04 22:34:15
---

GitHub Actions真的是非常好用的东西，基于它的事件驱动的工作流可以自动化很多以前我都得手动做的东西。以前当然也可以通过别的CI平台来做，但是GitHub Actions跟GitHub深度集成还是让它成为我的第一选择。~~最重要的还免费。~~

这次我是通过GitHub Actions来实现在Issues发布的内容，自动转换为Hexo文章，然后push到repo，再自动生成、部署。

<https://blog.xiadong.info/2020/11/04/This%20is%20a%20test%20blog%20post/>这篇文章就是这样写的，本文也是。

<!-- more -->

主要的workflow文件：
 - <https://github.com/Shell32-Natsu/Shell32-Natsu.github.io/blob/src/.github/workflows/issues.yml>

自己写的Action：
 - <https://github.com/Shell32-Natsu/blog-article-from-issue-action>

Workflow和Action之间都是用base64编码过的字符串，以防止特殊字符的影响。

# Workflow

整个流程挺直观的，主要步骤是：

 - Issue的创建，更改会出发action
 - Checkout
 - 这里注意checkout使用的是Personal Access Token来clone仓库，这是为了在push的时候可以触发部署的Action，否则push后是不会触发别的action的。
 - 从`github.event.issue`获取Issue信息
 - 注意`ISSUE="${ISSUE//$'\n'}"`这里专门去掉了换行符，是为了下一步运行自定义action的时候不会因换行符导致bash命令出错。
 - 运行自定义的action生成文章
 - 保存到文件
 - Add & Push

# 自定义Action

自定义的Action其实是一个Docker image，只不过是由GitHub Actions在运行时构建的，我写了一个简单的Python脚本来处理输入的JSON字符串，然后生成一个Hexo的文章。

# 功能

其实不需要啥功能，只有如下几个：

1. 根据`tags/...`，`categories/...`的issue tag自动添加文章tag和category。
2. 可以设置只处理特定用户的issue
3. 只处理有`BlogPost`tag的issue，这样可以灵活控制是否发布。
4. 编辑文章也会触发部署

问题：
1. 目前还不支持删除文章，想要删除只能手动操作。感觉可以通过tag增减和删除issue的事件来做。

