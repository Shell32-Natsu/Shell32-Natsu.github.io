---
title: LeetCode 537. Complex Number Multiplication
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 1188.html
id: 1188
categories:
  - LeetCode
date: 2017-03-27 18:52:39
---
题目描述：

> Given two strings representing two [complex numbers](https://en.wikipedia.org/wiki/Complex_number).
>
> You need to return a string representing their multiplication. Note i2 = -1 according to the definition.
>
> **Example 1:**
>
> ```
> Input: "1+1i", "1+1i"
> Output: "0+2i"
> Explanation: (1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i, and you need convert it to the form of 0+2i.
>
> ```
>
> **Example 2:**
>
> ```
> Input: "1+-1i", "1+-1i"
> Output: "0+-2i"
> Explanation: (1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.
>
> ```
>
> **Note:**
>
> 1. The input strings will not have extra blank.
> 2. The input strings will be given in the form of **a+bi**, where the integer **a** and **b** will both belong to the range of [-100, 100]. And **the output should be also in this form**.

比较简单的题，因为不用考虑非法的输入，所以直接用`+`把字符串分割，然后分别提取实部和虚部进行运算，把结果再转换为字符串即可。

```cpp
class Solution {
public:
    string complexNumberMultiply(string a, string b) {
        auto ap = convert(a), bp = convert(b);
        int ra = ap.first * bp.first + (-1) * ap.second * bp.second;
        int rb = ap.first * bp.second + ap.second * bp.first;
        return to_string(ra) + "+" + to_string(rb) + "i";
    }
    pair<int, int> convert (string s) {
        int a, b;
        int plusIndex;
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '+') {
                a = stoi(s.substr(0, i));
                plusIndex = i;
                break;
            }
        }
        b = stoi(s.substr(plusIndex + 1, s.length() - plusIndex - 2));
        return make_pair(a, b);
    }
};
```

