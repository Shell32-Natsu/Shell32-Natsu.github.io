---
title: LeetCode 191. Number of 1 Bits
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
url: 979.html
id: 979
categories:
  - LeetCode
date: 2016-11-20 17:30:03
---
题目描述:

> Write a function that takes an unsigned integer and returns the number of ’1' bits it has (also known as the [Hamming weight](http://en.wikipedia.org/wiki/Hamming_weight)).
>
> For example, the 32-bit integer ’11' has binary representation `00000000000000000000000000001011`, so the function should return 3.

位运算.

```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int ret = 0;
        while(n > 0){
            if(n & 1)
                ret++;
            n = n >> 1;
        }
        
        return ret;
    }
};
```

