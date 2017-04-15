---
title: LeetCode 541. Reverse String II
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 1172.html
id: 1172
categories:
  - LeetCode
date: 2017-03-14 18:07:08
---
题目描述：

> Given a string and an integer k, you need to reverse the first k characters for every 2k characters counting from the start of the string. If there are less than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and left the other as original.
>
> **Example:**
>
> ```
> Input: s = &quot;abcdefg&quot;, k = 2
> Output: "bacdfeg"
> ```
> **Restrictions:**The string consists of lower English letters only.Length of the given string and k will in the range [1, 10000]

按照题目要求翻转字符串即可。

```cpp
class Solution {
public:
    string reverseStr(string s, int k) {
        int k2 = k << 1;
        int i;
        for (i = 0; i < s.length(); i += k2) {
            if (i + k <= s.length())
                reverseStr(s, i, i + k);
            else
                reverseStr(s, i, s.length());
        }
        return s;
    }
    
    void reverseStr(string &s, int left, int right) {
        for (int i = 0; left + i < right - i - 1; i++) {
            swap(s[left + i], s[right - i - 1]);
        }
    }
};
```

