---
title: 17 Fall 总结
tags:
  - Life
categories:
  - Life
date: 2017-12-21 16:23:18
---


今天是12月21日，正好是来美国整整四个月，也是秋季学期正式结束的日子。昨天刚从纽约回到匹村，晚上就出了期末成绩，算是给这个学期正式画上了一个句号。也该是时候写写总结了。
<!-- more -->

对于像我这种死宅来说，美国的生活并没有什么难以适应的地方，相比于国内来说还更舒适一点。有很多人想念中国的食物，这一点从每天中午学校附近的中餐外卖就可以看出来，但是我并没有这种感觉，我曾经跟朋友说过，我对于食物的下限比较高。美国的基本食物不是burger就是sandwich，dessert可以甜掉牙，卡路里让人望而生畏，但是只要高于我的“能吃”的bar，那么我还是完全可以接受的。居住环境中规中矩，对于这一点我的要求也不算高。空气跟国内是不可同日而语。

![Morewood](https://imgur.com/UWfisAd.jpg)

到了美国之后，我才真正感受到秒上Google，Twitter，不用挂代理是一种多么舒爽的感觉，仿佛是囚禁多年的人终于重获了自由。OneDrive也不抽风了，Gmail更好用了，不用再担心VPS哪天就被封了。恐怕我已经完全无法接受国内的那种压抑的环境了。

这一个学期在CMU的学习非常紧张，虽然只有三门课，可是每周要花近七八十个小时，基本上每天都有做不完的任务，上课，写作业，写读书笔记，做project，从早上一睁眼到晚上基本都在学习，赶完了一个due，下一个就在几天后。不过这倒是让我学到了怎么安排时间来同时做多件事情，比如今天做这门课的project，明天上午写reading summary，下午做另一门课的project。

![Hunt门前的草坪](https://i.imgur.com/voiyked.jpg)

我选的第一门课是[11-642 Search Engines](http://boston.lti.cs.cmu.edu/classes/11-642/)。上半年选课的时候我是没有选这门课的，这学期开学之后才临时注册了这门课。这门课讲的就是如何构建一个基于文档的搜索引擎，包括ranking算法，效果评估，查询扩展，索引，垂直搜索等等。这门课不算是很“CS”的课，更多的是偏向于概念，考试时不许用cheat sheet，有许多东西要记忆。这门课每周都要写一篇reading summary，其实就是预习下一周的内容，前半学期主要是课本内容，后半学期则是一到两篇论文，此外还有五个project，大约两周一个，使用Java来实现一个真正的搜索引擎，这五个project是递进的关系，重点不在于编程，而是对于要实现的概念的理解，以及最终report中对于结果的分析。教授叫[Jamie Callan](http://www.cs.cmu.edu/~callan/)，银发银须，看起来和蔼可亲，上课也很清楚，天气不冷的话总是穿一双凉拖。我每次上课都坐第一排，奈何这门课的内容实在不是很对胃口，最终只拿到了B+的成绩。

第二门课是[15-641 Computer Networks](https://www.cs.cmu.edu/~prs/15-441-F17/index.html)。这门课跟国内的课程差不太多，把协议栈从上往下讲，包括传输层协议，路由协议，BGP，包交换，链路层协议，QoS，Wireless，加密等等。这门课的project比较有用，第一个是用C+Socket实现一个简单的HTTP/HTTPS服务器，类似于Apache/Nginx那样的，用select来实现多路复用，还要支持CGI脚本。第二个是实现P2P文件分发和TCP-like的拥塞控制，我觉得这对于理解TCP Reno非常有帮助，虽然本科也学了TCP，知道slow start，AIMD，dup-ACK这些名词，但是对于整个TCP的工作机制还是要真正亲手实现一次才能搞得比较清楚。最后一个project是一个视频流的CDN+DNS load balance，根据链接速率来选择不同码率的视频文件，以及利用DNS对不同的client返回不同的IP。这门课的内容如果以前没有学过相关的课程的话量还是挺大的，以前是由[Peter Steenkiste](http://www.cs.cmu.edu/~prs/)教授来上，这学期有一半是由一位新教授[Justine Sherry](http://www.justinesherry.com/)来上，Sherry教授很有热情，但是说话语速略快，有的时候听不太清楚，她每次上课都会带一大包棒棒糖or巧克力，回答问题或者提问都会给糖吃。据Sherry教授说，这门课的project下次应该会有较大的更新。

最后一门课是[18-746 Storage Systems](http://www.ece.cmu.edu/~ganger/746.fall17/index.html)。由[Greg Ganger](http://www.ece.cmu.edu/~ganger/)教授和[George Amvrosiadis](http://www.cs.cmu.edu/~gamvrosi/)来上，主要在于SSD，文件系统，分布式存储和网络存储。每周也要读论文，但不是强制的，不读也没有关系。上课内容不是很多，但是考试时并不会考的很直白，许多问题都没有一个最佳答案，*It depends!*，要自己做出trade-off。这门课有两个project，第一个是实现一个SSD的地址翻译层，因为SSD的读写特性而要进行垃圾回收，wear-balance等等的考量。第二个是实现一个local+cloud的文件系统，这个project是我之前做过的一个巨蠢无比的[大创项目](https://github.com/xiadong1994/RaspCloud)的完全体，它使用FUSE来实现一个真正的文件系统，通过handle文件系统调用来向用户提供一个透明的接口，大文件将会被上传到云端存储，本地磁盘只保留metadata。同时还使用文件分片，相同的分片只会在云端保存一份，还实现了snapshot，cache等功能。

我觉得CMU的许多课程用AutoLab来给project评分真是很有趣，用scoreboard的ranking来拯救我的拖延症，让写代码有了一种打天梯的刺激感。

这学期最大遗憾在于还没有找到工作，拿到的Google和Houzz的onsite我自认为题目基本都答出来了，但是还是没有通过，Amazon的video onsite竟然奇葩地因为head count满了被取消了，另一家CME发了onsite邮件后就彻底没了下文，Facebook的PE on campus面试也没过，其他的大公司投了简历也没有消息，秋招早就结束，对于未来真的觉得充满了迷惘，回国真的是看不到任何光明。下个月只有两家小公司的onsite，春招也不知道还有几个坑，刷了458道题也没有什么用，连面试都拿不到真的不知道刷题除了娱乐还有什么意义。现在放寒假了，这一学期基本都没有怎么更新LC的博客，趁着这个时间补一补吧。

![Stanford University](https://i.imgur.com/xUYg25L.jpg)
