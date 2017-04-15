---
title: LeetCode 205. Isomorphic Strings
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
url: 1032.html
id: 1032
categories:
  - LeetCode
date: 2016-12-07 17:47:27
---
题目描述:

> Given two strings **s** and **t**, determine if they are isomorphic.
>
> Two strings are isomorphic if the characters in **s** can be replaced to get **t**.
>
> All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.
>
> For example,
> Given `"egg"`, `"add"`, return true.
>
> Given `"foo"`, `"bar"`, return false.
>
> Given `"paper"`, `"title"`, return true.
>
> **Note:**
> You may assume both **s** and **t** have the same length.

依次建立替换的映射, 无法完成转换的条件有两个:

1. s中两个不同的字符映射到了同一个字符. 用一个数组来记录每个字符是否被映射过, 出现重复时则返回false.
2. s中的两个相同字符映射到不同字符. 每次比较字符的映射是否相同.

```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        vector<int> s2t(128, -1), tCnt(128, 0);
        for(int i = 0; i < s.size(); i++){
            char sc = s[i], tc = t[i];
            if(s2t[sc] == -1){
                if(tCnt[tc] == 1) return false;
                s2t[sc] = tc;
                tCnt[tc] = 1;
            }
            else if(s2t[sc] != tc) return false;
        }
        return true;
    }
};
```

