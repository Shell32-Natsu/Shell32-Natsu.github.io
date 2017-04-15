---
title: LeetCode 415. Add Strings
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 859.html
id: 859
categories:
  - LeetCode
date: 2016-10-09 16:12:21
---
题目描述:

> Given two non-negative numbers `num1` and `num2` represented as string, return the sum of `num1` and `num2`.
>
> **Note:**
>
> 1. The length of both `num1` and `num2` is < 5100.
> 2. Both `num1` and `num2` contains only digits `0-9`.
> 3. Both `num1` and `num2` does not contain any leading zero.
> 4. You **must not use any built-in BigInteger library** or **convert the inputs to integer** directly.

简单的模拟加法.

```cpp
class Solution {
public:
    string addStrings(string num1, string num2) {
        if(num2.length() > num1.length()) swap(num1, num2);
        int maxLen = num1.length(), minLen = num2.length(), inc = 0;
        string ans(maxLen, '0');
        int i;
        for(i = 0; i < minLen; i++){
            char a = num1[maxLen - i - 1] - '0', b = num2[minLen - i - 1] - '0';
            char r = a + b + inc;
            if(r >= 10){
                inc = 1;
            }
            else{
                inc = 0;
            }
            ans[maxLen - i - 1] = r % 10 + '0';
        }
        if(i < maxLen){
            for(; i < maxLen; i++){
                char r = num1[maxLen - i - 1] - '0' + inc;
                if(r >= 10){
                    inc = 1;
                }
                else{
                    inc = 0;
                }
                ans[maxLen - i - 1] = r % 10 + '0';
            }
        }
        if(inc){
            ans.insert(ans.begin(), '1');
        }
        return ans;
    }
};
```

