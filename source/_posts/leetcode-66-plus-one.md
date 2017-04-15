---
title: LeetCode 66. Plus One
tags:
  - CPP
  - LeetCode
  - 算法
url: 582.html
id: 582
categories:
  - LeetCode
date: 2016-08-07 22:52:01
---
﻿题目描述:

>Given a non-negative number represented as an array of digits, plus one to the number.
>
>The digits are stored such that the most significant digit is at the head of the list.

数组模拟计算, 由于只加1, 所以比较简单.

    class Solution {
    public:
        vector<int> plusOne(vector<int> &digits) {
            vector<int> ret = digits;
            int jw = 1;
            for(int i = ret.size() - 1; i >= 0 && jw; i--){
                ret[i]++;
                if(ret[i] == 10){
                    jw = 1;
                    ret[i] = 0;
                }
                else{
                    jw = 0;
                }
            }
            if(jw){
                ret.insert(ret.begin(), 1);
            }
            return ret;
        }
    };