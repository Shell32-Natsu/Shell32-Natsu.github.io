---
title: LeetCode 201. Bitwise AND of Numbers Range
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
url: 1000.html
id: 1000
categories:
  - LeetCode
date: 2016-12-04 19:26:29
---
题目描述:

> Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.
>
> For example, given the range [5, 7], you should return 4.

位运算题目. 两个数m与n, 从最高位开始往低位看的话, 前面的许多位是相同的, 从某一位开始变得不同, 而这之后的所有位在结果中必然为0(因为中间肯定出现了0和1). 我们把m和n相减后得到的值就是这个阈值.

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int m, int n) {
        int minus = n - m + 1;
        int re = 0;
        for(int i = 0; i < 31; i++){
            int t = 1 << i;
            if(minus > t){
                re = re & (~t);
            }
            else{
                if((t & m) & (t & n)){
                    re = re | t;
                }
                else{
                    re = re & (~t);
                }
            }
        }
        return re;
    }
};
```

