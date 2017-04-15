---
title: 在Hyper-V为Linux扩大分区
tags:
  - Linux
  - 工具
  - 备忘
url: 695.html
id: 695
categories:
  - Linux
date: 2016-09-01 13:56:24
---

# 问题来源

我在Hyper-V里安装的虚拟机一开始只分配了10G的虚拟硬盘, 今天编译RISC-V Toolchain的时候硬盘空间耗尽了(顺带吐槽一下编译的时候下载源代码再次被网速折磨), 所以就要扩大虚拟磁盘的空间.

# Hyper-V中的设置

首先就是在Hyper-V中的磁盘编辑中修改虚拟磁盘的大小. 这一步没有任何问题, 下一步是修改分区表.

# 修改分区表

在Linux中要修改一个分区的大小, 必须要把它`umount`, 但是我要扩展的是整个系统分区, 所以需要用Linux的系统安装光盘启动. 然后运行gparted程序来修改分区大小.

# 回到Linux中的设置

到了上一步还是不行, 因为我要扩展的是一个逻辑分区 _logical volume_, 需要在原来的系统中扩展逻辑分区和启用新的分区空间才可以.

``` shell
$ lvresize -l 100%VG [your device]
```

`100%VG`的意思是使用全部空闲空间. 然后启用空间.

```shell
$ resize2fs [your device]
```