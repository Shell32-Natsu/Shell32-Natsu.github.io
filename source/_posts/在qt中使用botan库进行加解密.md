---
title: 在Qt中使用Botan库进行加解密
url: 298.html
id: 298
categories:
  - C++
date: 2016-04-21 21:27:40
tags:
  - C++
  - 备忘
  - Qt
---

# 在Qt中使用Botan库进行加解密

在毕设项目中需要使用RSA和AES加解密, 因为Qt自带Botan库, 所以使用Botan库来实现. Botan项目网站<http://botan.randombit.net>

## 在项目中使用

因为Qt Creator自带Botan库, 所以很容易就可在Qt项目中使用. 首先到Qt Creator的Github页面<https://github.com/qtproject/qt-creator>, 找到`qt-creator/src/libs/3rdparty/botan/`目录, 下载其中的文件. 然后在项目的pro文件中使用`include(botan/botan.pri)`引入Botan的源代码.

## RSA加解密

引入头文件
    #include "botan/botan.h"

生成密钥对

    Botan::AutoSeeded_RNG rng;
    Botan::RSA_PrivateKey privateKey(rng, 1024);

输出密钥

    qDebug() << Botan::X509::PEM_encode(privateKey).c_str() << Botan::PKCS8::PEM_encode(privateKey).c_str();
    
对字符串加密

    Botan::PK_Encryptor_EME enc(privateKey, "EME1(SHA-256)");
    char msg[] = "Test";
    Botan::SecureVector<Botan::byte> en = enc.encrypt(msg, 6, rng);

解密

    Botan::PK_Decryptor_EME dec(privateKey, "EME1(SHA-256)");
    Botan::SecureVector<Botan::byte> re = dec.decrypt(en);
    