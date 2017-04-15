---
title: LeetCode 7. Reverse Integer
url: 348.html
id: 348
categories:
  - LeetCode
date: 2016-07-09 18:41:23
tags:
---
题目描述:

>Reverse digits of an integer.
>
>Example1: x = 123, return 321
>
>Example2: x = -123, return -321

问题比较简单, 关键问题在于对于int类型数据表示范围的了解和对溢出的处理.

代码:

    class Solution {
    public:
        int reverse(int x) {
            long long re = 0;
            int sign = 1;
            if(x < 0){
                sign = -1;
                x = -x;
            }
            while(x > 0){
                re = re * 10 + ( x % 10 );
                x /= 10;
            }
            
            if(re > 0x7fffffff)
                return 0;
            
            return sign * re;
        }
    };