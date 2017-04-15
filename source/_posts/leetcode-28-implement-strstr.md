---
title: LeetCode 28. Implement strStr()
url: 461.html
id: 461
categories:
  - LeetCode
date: 2016-07-22 19:20:41
tags:
---
题目描述:

> Implement strStr().
> 
> Returns the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

实现查找子串函数. 使用双重循环.

    class Solution {
    public:
        int strStr(string haystack, string needle) {
            int haylength = haystack.length(), needlelength = needle.length();
            if(haylength < needlelength) return -1;
            for(int i = 0; i <= haylength - needlelength; i++){
                int j;
                for(j = 0; j < needlelength; j++){
                    if(haystack[i + j] != needle[j]) break;
                }
                if(j == needlelength)
                    return i;
            }
            
            return -1;
        }
    };