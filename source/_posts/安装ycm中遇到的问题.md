---
title: 安装YCM中遇到的问题
tags:
  - Linux
  - VIM
  - 备忘
url: 662.html
id: 662
categories:
  - Linux
date: 2016-08-22 11:08:01
---

说到VIM的代码补全, YouCompleteMe算是一个非常有名的插件了, 只不过由于它提供的功能已经大大超过了一个文本编辑器的功能, 所以安装起来相当复杂. 在这里记录自己在安装过程中遇到的问题, 安装步骤参考官方手册: [http://valloric.github.io/YouCompleteMe/](http://valloric.github.io/YouCompleteMe/)

操作系统Ubuntu 14.04

#### YouCompleteMe unavailable: requires Vim compiled with Python (2.6+ or 3.3+) support

当前的VIM版本不支持Python脚本, 我通过安装[vim-nox](http://packages.ubuntu.com/Trusty/editors/vim-nox)解决.

#### 编译`ycm_core` library时提示'stdexcept' file not found

通过`sudo apt-get install clang`安装clang.

#### 运行时提示: The ycmd server SHUT DOWN (restart with ':YcmRestartServer'). YCM core library compiled for Python 2 but loaded in Python 3\. Set the 'g:ycm_server_python_interpreter' option to a Python 2 interpreter path.

在vimrc中加入`let g:ycm_server_python_interpreter='/usr/bin/python'`来指定python2.x的程序路径.