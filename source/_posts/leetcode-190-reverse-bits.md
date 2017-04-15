---
title: LeetCode 190. Reverse Bits
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
url: 977.html
id: 977
categories:
  - LeetCode
date: 2016-11-20 17:27:41
---
题目描述:

> Reverse bits of a given 32 bits unsigned integer.
>
> For example, given input 43261596 (represented in binary as **00000010100101000001111010011100**), return 964176192 (represented in binary as **00111001011110000010100101000000**).

翻转一个32位整数的每一个位.

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        for(int i = 0; i < 16; i++){
            swapIntBit(n, i);
        }
        return n;
    }

    void swapIntBit(uint32_t &n, int i){
        uint32_t b1 = n & (1 << i);
        uint32_t b2 = n & (((unsigned int)0x80000000) >> i);
        n &= ~(1 << i);
        n &= ~(((unsigned int)0x80000000) >> i);
        n |= b1 << (31 - i * 2);
        n |= b2 >> (31 - i * 2);
    }
};
```

