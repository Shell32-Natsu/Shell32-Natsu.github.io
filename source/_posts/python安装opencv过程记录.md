---
title: Python安装OpenCV过程记录
url: 114.html
id: 114
categories:
  - OpenCV
  - Python
  - 备忘
date: 2014-10-13 19:59:45
tags:
---

因为课程需要用到OpenCV，又不喜欢用VS来开发，所以就安装Python版本的OpenCV。

官方安装教程：[http://docs.opencv.org/trunk/doc/py_tutorials/py_setup/py_setup_in_windows/py_setup_in_windows.html](http://docs.opencv.org/trunk/doc/py_tutorials/py_setup/py_setup_in_windows/py_setup_in_windows.html "http://docs.opencv.org/trunk/doc/py_tutorials/py_setup/py_setup_in_windows/py_setup_in_windows.html")

OpenCV只支持python2.7版本，不支持3.x。

1、先到OpenCV项目网站[http://sourceforge.net/projects/opencvlibrary/files/](http://sourceforge.net/projects/opencvlibrary/files/ "http://sourceforge.net/projects/opencvlibrary/files/")下载安装包，选择Windows平台的exe安装包即可，这是7-zip自解压文件，大小约350M。

2、下载过程中可以先为Python安装Numpy包和Matplotlib（推荐但不是必须）包。

Numpy：[http://sourceforge.net/projects/numpy/files/NumPy](http://sourceforge.net/projects/numpy/files/NumPy "http://sourceforge.net/projects/numpy/files/NumPy")

Matplotlib：[http://sourceforge.net/projects/matplotlib/files/matplotlib](http://sourceforge.net/projects/matplotlib/files/matplotlib "http://sourceforge.net/projects/matplotlib/files/matplotlib")

3、运行OpenCV的安装文件，选择解压目录，解压大小约为3.5G，因此请保证有足够的磁盘空间。

4、打开解压的目录，进入/build/python/2.7/x86，拷贝cv2.pyd文件到Python安装目录Lib/site-packages目录下。

5、运行Python交互式界面，输入
```python
>>>import cv2
>>>print cv2.__version__
```
测试安装是否成功。