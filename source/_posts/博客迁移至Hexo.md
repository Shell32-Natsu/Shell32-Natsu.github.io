---
title: 博客迁移至Hexo
date: 2017/04/15 19:35:00
categories:
  - Life
tags:
  - 博客
  - Hexo
  - 备忘
---

前段时间多说宣布准备关闭服务，之后偶然看到一个用GitHub Issues来做评论系统的项目：<https://github.com/imsun/gitment>，倒不是说对这个想法很感兴趣，而且因为它又激起了我转移到静态博客+GitHub Pages的念头。今天算是付诸行动了吧。

<!-- more -->

# 1. 为什么要迁移？

当初搭博客的时候还是个小白，Hexo，Jekyll这种高大上~~并不~~的东西玩不转，所以退而求其次用了比较傻瓜化的WordPress。这几年用着也还可以，但是频繁的更新挺烦人的，而且不支持Markdown(JetPack提供的Markdown支持不知道为什么我总是用不了)，总体来说也还是太“重”了。最最主要的一点是从上个月开始每次更新插件/主题之后都不能退出维护模式，只能ssh到服务器上去手动删除`.maintenance`文件，所以我决定还是换一个轻量级的静态博客。并且静态博客折腾起主题之类的东西也方便的多。

# 2. Hexo安装配置

网上教程到处都有，就不赘述了。

# 3. 数据导入

Hexo提供从Wordpress迁移数据的插件<https://hexo.io/docs/migration.html>，是通过分析WP导出的数据文件来工作的，省去了我写脚本分析数据的麻烦。但是还是不可避免地会有许多问题。

这个插件会保留WP中的tag和分类，tag是正常的，但是因为Hexo不支持一个页面多个分类（其实我也不太理解为什么WP会支持，跟tag的功能重复了），所以在WP中属于多个分类的页面在导入后会变成子分类的形式，比如一篇文章`article`分别属于`A`和`B`两个分类，在WP中是这样的：

```
    article
    /      \
   A        B
```

而导入到Hexo之后会变成类似

```
article
  |
  B
  |
  A
```

这样的形式，在Hexo中看起来是相当的烦人。

另一个问题是导入插件是通过把HTML文本转换为Markdown来进行数据导入的，这个逆向转换的过程很有可能让你的页面面目全非。不过我的博客数据主要是LeetCode的笔记，原本的Markdown文件都有保留，所以可以直接放弃转换出来的Markdown而使用正确的数据。

以上两个问题我是通过Python脚本来解决的，脚本拼接导入数据的Front-matter部分和原始Markdown文件的正文部分，同时删除Front-matter[^关于Front-matter]中除了第一个分类以外的分类。这个脚本只能处理LeetCode笔记（因为可以通过题号匹配起来），其余的文章不多，我就手动修改了。

最后一个问题，Hexo的Markdown语法与我一直使用的语法不太一致，导致有的地方渲染不太正常。比如

![](/image/post/Screenshot%20from%202017-04-15%2020-45-51.png)

这段Markdown，GitHub和Pandoc都会生成引用内的代码块的形式，而Hexo中的三个反引号似乎优先级更高。这个问题我还没有解决，涉及的页面太多了，情况也比较复杂。

# 4. 主题

Hexo的主题并没多到让人挑花眼的程度，但是普遍质量都很高，而且自己修改起来也比较容易。在GitHub上搜索就可以找到很多，我现在用的是[Even](https://github.com/ahonn/hexo-theme-even)这个主题，稍微改了一下字体。

# 5. 托管

我以前的Wordpress博客是用我自己的服务器+CDN的形式，Hexo虽然也可以放在我的服务器上，不过既然已经是静态博客了还是GitHub Pages省心省力。

[^关于Front-matter]: https://hexo.io/docs/front-matter.html
