---
title: LeetCode 58. Length of Last Word
tags:
  - CPP
  - LeetCode
  - 字符串
  - 搜索
  - 算法
url: 558.html
id: 558
categories:
  - LeetCode
date: 2016-08-04 16:59:03
---
题目描述:

>Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word in the string.
>
>If the last word does not exist, return 0.
>
>Note: A word is defined as a character sequence consists of non-space characters only.
>
>For example, 
>Given s = "Hello World",
>return 5.

找出一个字符串中最后一个单词的长度, 没有什么好说的, 从后往前搜索.

    class Solution {
    public:
        int lengthOfLastWord(string s) {
            int end = s.size();
            if(end == 0)
                return 0;
            for(; end >= 1 && s[end - 1] == ' '; end--); // 跳过结尾的空格
            int i;
            for(i = end - 1; i >= 0 && s[i] != ' '; i--);
            return end - i - 1;
        }
    };