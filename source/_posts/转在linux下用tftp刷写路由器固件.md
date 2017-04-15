---
title: '[转]在Linux下用tftp刷写路由器固件'
url: 168.html
id: 168
categories:
  - 备忘
date: 2014-11-03 12:44:55
tags:
---

源地址：http://blog.csdn.net/zyphio/article/details/8555742

1.在Ubuntu中，保证正常访问互联网软件源的情况下，找到并进入“terminal”（终端）界面；
2.输入“sudo apt-get update”按回车，根据提示输入管理员密码，开始更新软件包信息；
3.输入“sudo apt-get install tftp”，开始安装tftp软件包；
4.用牙签捅住路由器复位按钮10秒（如果固件不支持复位按钮，那这一步无意义）；
5.拔掉路由器的电源；
6.用网线连接电脑LAN口与路由LAN口（注意不要接成蓝色的WAN口）；
7.输入“sudo service network-manager stop”（适用Ubuntu 10.4或以上版本）或“sudo service networking stop”（适用Ubuntu 9.10或以前版本）命令，以关闭系统的网络管理服务；
8.输入“ifconfig”查看是哪一个网卡与路由器相连，一般为“eth0”代号的网卡；
9.输入“sudo ifconfig eth0 192.168.11.2”，强行设定“eth0”代号的网卡的IP为192.168.11.2（因为Buffalo路由器的bootloader里的默认是IP是192.168.11.1）；
10.输入“sudo ifconfig eth0 netmask 255.255.255.0”，设置掩码；
11.输入“sudo arp -s 192.168.11.1 XX:XX:XX:XX:XX:XX”，“XX:XX:XX:XX:XX:XX”你Buffalo路由器的MAC地址，MAC地址在Buffalo路由器背面的标签上SSID可查到，可不输入冒号间格。
12.输入“tftp”，出现“tftp>”提示符；
13.输入“verbose”，出现“Verbose mode on.”提示；
15.输入“binary”，出现“mode set to octet.”提示；
16.输入“trace”，出现“Packet tracing on.”提示；
17.输入“rexmt 1”，每格一秒尝试一次推送；
19.输入“timeout 60”，推送尝试的时间不超过60秒；
20.输入“connect 192.168.11.1”，连接路由器（实际上并没连接，只是为连接作好准备）；
21.输入“put rf.bin”，会提示失败，并每格1秒就尝试一次推送；