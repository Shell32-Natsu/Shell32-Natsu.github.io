---
title: LeetCode 504. Base 7
tags:
  - CPP
  - LeetCode
  - 算法
url: 1129.html
id: 1129
categories:
  - LeetCode
date: 2017-02-13 17:37:52
---
题目描述：

> Given an integer, return its base 7 string representation.
>
> **Example 1:**
>
> ```
> Input: 100
> Output: "202"
>
> ```
>
> **Example 2:**
>
> ```
> Input: -7
> Output: "-10"
>
> ```
>
> **Note:** The input will be in range of [-1e7, 1e7].

使用除法来进行进制转换。

```cpp
class Solution {
public:
    string convertToBase7(int num) {
        int sign = num >= 0 ? 1 : -1;
        string ans;
        num = abs(num);
        if (num == 0) return string("0");
        while (num > 0) {
            ans.insert(ans.begin(), (num % 7) + '0');
            num /= 7;
        }
        if (sign > 0) return ans;
        else return string("-") + ans;
    }
};
```

