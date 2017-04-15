---
title: LeetCode 9. Palindrome Number
url: 355.html
id: 355
categories:
  - LeetCode
date: 2016-07-09 19:01:14
tags:
---
题目描述

> Determine whether an integer is a palindrome. Do this without extra space.

我没有太明白这个`without extra space`的具体含义, 传入数据只有一个int型, 难道是要完全不使用局部变量吗? 这个要求总觉得有点匪夷所思. 忽略这一点, 这个题目还是很简单的.

代码:

    class Solution {
    public:
        bool isPalindrome(int x) {
            if(x < 0)
                return false;
            
            long long r = 0, t = x;
            while(t > 0){
                r = r * 10 + t % 10;
                t /= 10;
            }
            
            if(x == r)
                return true;
            else
                return false;
        }
    };