---
title: LeetCode 405. Convert a Number to Hexadecimal
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
url: 804.html
id: 804
categories:
  - LeetCode
date: 2016-09-26 16:27:54
---
题目描述:

> Given an integer, write an algorithm to convert it to hexadecimal. For negative integer, [two’s complement](https://en.wikipedia.org/wiki/Two%27s_complement) method is used.
>
> **Note:**
>
> 1. All letters in hexadecimal (`a-f`) must be in lowercase.
> 2. The hexadecimal string must not contain extra leading `0`s. If the number is zero, it is represented by a single zero character `'0'`; otherwise, the first character in the hexadecimal string will not be the zero character.
> 3. The given number is guaranteed to fit within the range of a 32-bit signed integer.
> 4. You **must not use any method provided by the library** which converts/formats the number to hex directly.
>
> **Example 1:**
>
> ```
> Input:
> 26
>
> Output:
> "1a"
>
> ```
>
> **Example 2:**
>
> ```
> Input:
> -1
>
> Output:
> "ffffffff"
> ```

由于传入的数据是int型, 所以其实负数就已经是用补码来表示了. 因此只要每次取四位二进制位出来然后把它们转换为16进制即可.

```cpp
class Solution {
public:
    string toHex(int num) {
        int n = num;
        string hex;
        for(int i = 0; i < 8; i++){
            hex.push_back(toCharHex(n & 0xf));
            n >>= 4;
        }
        while(hex.size() > 1 && hex.back() == '0') hex.pop_back();
        reverse(hex.begin(), hex.end());
        return hex;
    }
    
    char toCharHex(int num){
        if(num < 10){
            return num + '0';
        }
        else{
            return num - 10 + 'a';
        }
    }
};
```

