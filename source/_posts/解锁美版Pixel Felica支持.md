
---
title: '解锁美版Pixel Felica支持'
tags:
- 博客
- Life
- 工具
- 备忘
categories:
- 备忘
date: 2025-08-11 19:35:24
---

众所周知Pixel是搭载了Felica（用于支持日本交通IC卡）的硬件的，可是却通过软件锁区屏蔽了非日本地区销售的型号。我最近尝试了一下通过修改系统`devinfo`来实现改区，让系统错认为日版机器从而解锁Felica的使用。我使用的是美版Pixel 8a搭载Android 16。

已知问题：
- 需要Root，但是修改完可以刷回原版系统并锁上fastboot
- 需要多次刷机，数据无法保留
- 相机会有无法关闭的拍照声，这是日版特有的

<!-- more -->

# 解锁bootloader

1. 打开开发者模式
2. 打开USB调试然后连接adb
3. `adb reboot bootloader`
4. `fastboot flashing unlock`

# 刷入Magisk

1. 从[Google](https://developers.google.com/android/images)下载对应机型的刷机包，这个不要删了，后面有用。
2. 解压，找到`image-`开头的zip再解压一次
3. 复制其中的`boot.img`到手机
4. 安装Magisk App
5. 在Magisk里面选择Install->Select and Patch a file
6. 把patch后的`boot.img`复制回电脑
7. 刷入patch后的image
```
adb reboot bootloader
fastboot flash init_boot_a magisk_patched.img
fastboot flash init_boot_b magisk_patched.img
fastboot reboot
```
**Pixel 8a需要刷入两次**，重启后就完成了root了。

# 提取devinfo

1. `adb shell`
2. `su`
3. 在手机上授权root
4. Dump devinfo分区 `dd if=/dev/block/by-name/devinfo of=/sdcard/devinfo.img`
5. Pull dump出来的devinfo分区 `adb pull /sdcard/devinfo.img`

# 修改SKU

1. 使用hex editor打开`devinfo.img`
2. 找到其中的类似`sku GKV4X`字符串
3. 在Google的[官方文档](https://support.google.com/pixelphone/answer/7158570?hl=en#zippy=%2Cpixel-a)中，找到对应的日本地区型号`G576D`。
4. 替换sku字符串
5. 写回修改后的devinfo分区
```
adb push devinfo_modified.img /sdcard/
adb shell
su
# Verify the partition path first
ls -la /dev/block/by-name/devinfo

# Flash the modified image
dd if=/sdcard/devinfo_modified.img of=/dev/block/by-name/devinfo

# Sync and reboot
sync
reboot
```

# 刷回原版系统并lock bootloader

1. 在之前下载解压的刷机包里面运行`./flash-all.sh`刷回出厂系统。
2. 重启后确认Magisk已经卸载
3. 锁上bootloader
```
adb reboot bootloader
fastboot flashing lock
```

# 充值IC卡

重启设置完成后，在Google Wallet里申领一张Suica卡。不要用Pasmo，因为用美国的信用卡无法充值。然后下载Mobile Suica App，在App里绑卡充值，Google Wallet里是充不了的，我用AMex卡成功充值。

