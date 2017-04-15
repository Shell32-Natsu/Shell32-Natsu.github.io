---
title: LeetCode 91. Decode Ways
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 655.html
id: 655
categories:
  - LeetCode
date: 2016-08-20 19:05:46
---
题目描述:

> A message containing letters from `A-Z` is being encoded to numbers using the following mapping:
>
> ```
> 'A' -> 1
> 'B' -> 2
> ...
> 'Z' -> 26
>
> ```
>
> Given an encoded message containing digits, determine the total number of ways to decode it.
>
> For example,
> Given encoded message `"12"`, it could be decoded as `"AB"` (1 2) or `"L"` (12).
>
> The number of ways decoding `"12"` is 2.

动态规划, 最后一个字母可以是一位数字或者两位数字. 在最后一位不是0时可以是一位数字, 在倒数第二位为1, 或倒数第二位为2且最后一位小于等于6时可以为两位数字, 解码的不同方法数量为这两种情况之和.

```cpp
class Solution {
public:
    int numDecodings(string s) {
        if(s.empty()) return 0;
        if(s[0] == '0') return 0;
        int num[2] = {1, 0};
        for(int i = 1; i < s.size(); i++){
            int one;
            if(s[i] != '0')
                one = num[0] + num[1];
            else
                one = 0;
                
            int two = 0;
            if(s[i - 1] == '1'){
                two = num[0];
            }
            else if(s[i - 1] == '2' && s[i] <= '6'){
                two = num[0];
            }
            num[0] = one;
            num[1] = two;
        }
        return num[0] + num[1];
    }
};
```

