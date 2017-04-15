---
title: Windows平台poppler-qt5预编译库
url: 294.html
id: 294
categories:
  - C++
  - Study
  - 备忘
date: 2016-03-16 13:17:17
tags:
---

项目中要对PDF文件进行预览, 搜索与Qt搭配的库之后选择poppler库, 官网地址: [https://poppler.freedesktop.org/](https://poppler.freedesktop.org/), 没有找到win32平台的二进制文件, 所以只能下载源码自行编译, 由于依赖库众多, 经常报莫名其妙的编译错误, 在耗费了十几个小时后终于编译出了可用的dll文件, 在Qt工程中使用正常. 为了备份和方便后来人, 提供编译好的poppler-qt5的库下载.

**poppler版本:**

0.41.0

**编译器**

*   gcc 5.1.0 32-bit
*   mingw32-make GNU make 3.82.90

**目录结构**

    libpoppler.zip
    |
    |--bin
    |   |--freetype6.dll
    |   |--jpeg62.dll
    |   |--libpoppler.dll
    |   |--libpoppler-qt5.dll
    |   |--libtiff3.dll
    |   |--openjpeg.dll
    |   |--pdfinfo.exe
    |   |--zlib1.dll
    |
    |--include
    |   |--poppler
    |       |--qt5
    |           |--poppler-annotation.h
    |           |--poppler-export.h
    |           |--poppler-form.h
    |           |--poppler-link.h
    |           |--poppler-media.h
    |           |--poppler-optcontent.h
    |           |--poppler-page-transition.h
    |           |--poppler-qt5.h
    |
    |--lib
        |--libpoppler.dll.a
        |--libpoppler-qt5.dll.a

**下载地址:**

Google Drive: [https://drive.google.com/open?id=0BzmeJgHvo4mIV1V1bW9zd2pRaWs](https://drive.google.com/open?id=0BzmeJgHvo4mIV1V1bW9zd2pRaWs)

百度云: [http://pan.baidu.com/s/1jHlxTOU](http://pan.baidu.com/s/1jHlxTOU)