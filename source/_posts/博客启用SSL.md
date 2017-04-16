---
title: 博客启用SSL
date: 2017-04-16 11:39:12
tags:
  - 博客
  - 备忘
categories:
  - Life
---

GitHub Pages默认是启用SSL的，但是绑定了自己的域名之后证书就不匹配了。通过Cloudfare官方的免费服务[^1]就可以给博客启用SSL了（当然也就默认使用了他家的CDN）。终于可以跟国内无良ISP的劫持说再见了。

![](http://wx4.sinaimg.cn/large/4c1654ddgy1feodo69jpej207600twea.jpg)

<!--more-->

# 优点

-   杜绝了HTTP劫持
-   小绿锁满足强迫症
-   Google收录的权重不会受影响

# 缺点

-   免费证书很少，而且总的来说风评不是很好，但是谁让人家免费呢
-   对于没有什么重要敏感信息的个人站来说优点不是很明显
-   如果要是使用了CDN的话，需要CDN服务商的支持，比如我以前用的Incapsula的免费套餐就不支持

[^1]: blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/