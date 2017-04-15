---
title: LeetCode 38. Count and Say
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 492.html
id: 492
categories:
  - LeetCode
date: 2016-07-27 17:49:00
---
题目描述:

> The count-and-say sequence is the sequence of integers beginning as follows:
> `1, 11, 21, 1211, 111221, ...`
> 
> 1 is read off as "one 1" or 11.
>
> 11 is read off as "two 1s" or 21.
>
> 21 is read off as "one 2, then one 1" or 1211.
>
> Given an integer n, generate the nth sequence.
> 
>Note: The sequence of integers will be represented as a string.

题目意思要求把数字"说出来", 其实含义就是给定一个包含数字的字符串, 把它用另一种方式表示出来, 即"数字连续出现的数量 + 该数字". 这个新字符串作为下一次处理的源字符串. 因此我的解法就是模拟这种做法.

    class Solution {
    public:
        string countAndSay(int n) {
            string s = "1";
            for (int i = 1; i < n; i++) {
                string re;
                char now = s[0];
                int num = 1;
                int len = s.size();
                for (int i = 1; i < len; i++) {
                    if (s[i] == now) num++;
                    else {
                        re = re + to_string(num);
                        re.push_back(now);
                        num = 1;
                        now = s[i];
                    }
                }
                re = re + to_string(num);
                re.push_back(now);
                s = re;
            }
            return s;
        }
    };