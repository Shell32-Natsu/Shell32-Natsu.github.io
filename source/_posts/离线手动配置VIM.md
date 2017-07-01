---
title: 离线手动配置VIM
tags:
  - VIM
  - 配置
categories:
  - Study
date: 2017-06-29 19:10:03
---


实习公司的后台开发都在一台内网的开发机上，登录还要通过跳板机，并且禁止SCP、FTP等协议，开发只能使用VIM等命令行编辑器，使用sz/rz来临时上传下载文件。开发机上的vim没有任何插件，撑死了使用vimrc来打开行号、代码高亮等基础功能，自动补全只能用`Ctrl-N`这种原始的单词匹配来勉强使用。由于开发机不能连接外网，所以废掉了几乎所有一件配置脚本，Vundle什么的也是基本无解，只能进行手动配置了。本文记录一下我的折腾过程。

~~// 还有一个月就走了费什么劲呢~~

~~// 生命在于折腾~~

<!-- more -->

# 编译安装新版本VIM

机器上的VIM版本还停留在7.2，已经过于老旧了，所以先自己编译一个新版本的VIM。

先下载VIM 8.0的源码，下载地址：<ftp://ftp.vim.org/pub/vim/unix/vim-8.0.tar.bz2>

解压后运行`./configure --prefix=~/local/  --with-features=huge --enable-pythoninterp`，然后`make;make install;`。

我用gcc 4.4.6在3.10.94内核上编译成功。

# 外观，按键映射等设置

我是使用<https://github.com/kaochenlong/eddie-vim>的.vim目录和.vimrc文件。

关于颜色主题，可以使用这个网站<http://bytefluent.com/vivify/>，大量配色方案可选。我还是选最经典的molokai。

# 插件

VIM强大的一个主要原因就是插件。

其实本来这些插件都是用pathogen或者Vundle之类来自动安装的，但是谁让开发机连不上Github呢，所以只能手动把插件从Github上下载下来再复制到`~/.vim/bundle/`的相应目录下。

我准备安装的插件：

- <https://github.com/tpope/vim-pathogen>|插件管理，不装会报错（装了也没用），当然也可以编辑.vimrc来避免
- <https://github.com/scrooloose/nerdtree>|文件浏览，安装后可以使用`<leader>r`来快速打开
- <https://github.com/jistr/vim-nerdtree-tabs>|默认的NERDTree是跟随tab的，使用这个插件可以在任何tab中都显示一个NERDTree。用t在新标签中打开，i横向分割窗口，s纵向分隔窗口。
- <https://github.com/ervandew/supertab>|用tab键来触发自动补全
- <https://github.com/majutsushi/tagbar>|显示当前文件中的所有tag（使用ctags），但是不会生成ctags文件
- <https://github.com/kien/ctrlp.vim>|文件搜索
- <https://github.com/kien/tabman.vim>|标签管理，默认快捷键`<leader>mt`
- <https://github.com/Raimondi/delimitMate>|自动插入匹配的括号
- <https://github.com/vim-airline/vim-airline>|底部状态栏美化




# 其他

按`Ctrl-W`后，可以用`9`来减少高度，`0`来增加高度，`,`来减少宽度，`.`来增加宽度。

# 最终效果

![](http://wx2.sinaimg.cn/large/4c1654ddgy1fh29u9l3znj21hc0nm418.jpg)