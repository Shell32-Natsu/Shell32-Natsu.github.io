---
title: LeetCode 557. Reverse Words in a String III
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 1200.html
id: 1200
categories:
  - LeetCode
date: 2017-04-09 17:18:49
---
题目描述：

> Given a string, you need to reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.
>
> **Example 1:**
>
> ```
> Input: "Let's take LeetCode contest"
> Output: "s'teL ekat edoCteeL tsetnoc"
>
> ```
>
> **Note:** In the string, each word is separated by single space and there will not be any extra space in the string.

~~这么简单的题真的会出现？~~

由于没有多余的空格，所以用双指针找到下一个空格，翻转当前位置与下一个空格之间的字符，设置左指针为下一个空格的位置+1.

```cpp
class Solution {
public:
    string reverseWords(string s) {
        int p1 = 0;
        while (p1 < s.length()) {
            int p2 = p1;
            while (p2 < s.length() && s[p2] != ' ') p2++;
            reverse(s.begin() + p1, s.begin() + p2);
            p1 = p2 + 1;
        }
        return s;
    }
};
```

