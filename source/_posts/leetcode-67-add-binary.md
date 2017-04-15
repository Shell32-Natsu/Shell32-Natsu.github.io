---
title: LeetCode 67. Add Binary
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 584.html
id: 584
categories:
  - LeetCode
date: 2016-08-08 17:01:38
---
﻿题目描述:

>Given two binary strings, return their sum (also a binary string).
>
>For example,
>
>a = `"11"`
>
>b = `"1"`
>
>Return `"100"`.

模拟加法计算, 只不过是使用二进制格式.

    class Solution {
    public:
        string addBinary(string a, string b) {
            if(a.length() < b.length()) swap(a, b);
            int pa = a.length() - 1, pb = b.length() - 1, jw = 0;
            while(pb >= 0){
                a[pa] = a[pa] - '0' + b[pb] - '0' + jw + '0';
                if(a[pa] >= '2'){
                    a[pa] = a[pa] % '2' + '0';
                    jw = 1;
                }
                else{
                    jw = 0;
                }
                pa--, pb--;
            }
            while(pa >= 0){
                a[pa] = a[pa] + jw;
                if(a[pa] >= '2'){
                    a[pa] = a[pa] % '2' + '0';
                    jw = 1;
                }
                else{
                    jw = 0;
                }
                pa--;
            }
            if(jw){
                a.insert(a.begin(), '1');
            }
            return a;
        }
    };