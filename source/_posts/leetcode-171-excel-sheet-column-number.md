---
title: LeetCode 171. Excel Sheet Column Number
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 896.html
id: 896
categories:
  - LeetCode
date: 2016-10-20 16:26:50
---
题目描述:

> Related to question [Excel Sheet Column Title](https://leetcode.com/problems/excel-sheet-column-title/)
>
> Given a column title as appear in an Excel sheet, return its corresponding column number.
>
> For example:
>
> ```
>     A -> 1
>     B -> 2
>     C -> 3
>     ...
>     Z -> 26
>     AA -> 27
>     AB -> 28 
> ```

二十六进制的转换.

```cpp
class Solution {
public:
    int titleToNumber(string s) {
        int ans = 0;
        for(int i = 0; i < s.length(); i++){
            ans *= 26;
            ans += s[i] - 'A' + 1;
        }
        return ans;
    }
};
```

