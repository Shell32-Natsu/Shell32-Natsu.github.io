---
title: LeetCode 89. Gray Code
tags:
  - CPP
  - LeetCode
  - 位运算
  - 哈希表
  - 算法
url: 650.html
id: 650
categories:
  - LeetCode
date: 2016-08-19 17:03:01
---
题目描述:

> The gray code is a binary numeral system where two successive values differ in only one bit.
>
> Given a non-negative integer *n* representing the total number of bits in the code, print the sequence of gray code. A gray code sequence must begin with 0.
>
> For example, given *n* = 2, return `[0,1,3,2]`. Its gray code sequence is:
>
> ```
> 00 - 0
> 01 - 1
> 11 - 3
> 10 - 2
>
> ```
>
> **Note:**
> For a given *n*, a gray code sequence is not uniquely defined.
>
> For example, `[0,2,3,1]` is also a valid gray code sequence according to the above definition.
>
> For now, the judge is able to judge based on one instance of gray code sequence. Sorry about that.

计算Gray code, 两个数的二进制表示只有一位不同, 则这两个数为gray code. 这个题有多个可能的解, 但是LeetCode只判断一种正确解, 就是每次变换尽可能低位的二进制位.

变换一个数中的某一位可以通过位运算实现, 所以主要问题就在如何判断一个数是否已经出现, 我使用`unordered_set`来保存已经选出来的gray code. 因为测试数据只有12组, 所以也可以使用一个2^12 + 1大小的数组来保存数字有没有出现过.

```cpp
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int> ret = {0};
        int bits = 0;
        unordered_set<int> codes;
        codes.insert(0);
        int i = 0;
        while(i < n){
            int tmpBits = bits ^ (1 << i);
            if(codes.count(tmpBits)){
                i++;
            }
            else{
                codes.insert(tmpBits);
                ret.push_back(tmpBits);
                bits = tmpBits;
                i = 0;
            }
        }
        return ret;
    }
};
```

