---
title: LeetCode 372. Super Pow
url: 335.html
id: 335
categories:
  - LeetCode
date: 2016-07-08 16:58:25
tags:
---
题目描述:

> Your task is to calculate ab mod 1337 where a is a positive integer and b is an extremely large positive integer given in the form of an array.

> Example1:

>     a = 2
>     b = [3]

>     Result: 8
> Example2:

>     a = 2
>     b = [1,0]

>     Result: 1024

计算a的b次幂的值, 其中b很大并且用数组表示. 关键在于结果要对于1337取余, 这就意味着在计算过程中不会发生溢出问题. 根据公式:

    (a * b) % n = ((a % n) * (b % n)) % n

以及

    a ^ (n + m) = (a ^ n) * (a ^ m)

用b{i}表示数组b中到下标i为止的数, `a ^ b{i} = ((a ^ b{i - 1}) ^ 10) * (a ^ b[i])`, 把幂运算替换为乘法运算和循环, 在每一个循环体中都对结果取余. 就可以得到结果. 其中b[i]为0和第一次循环要特别处理.

代码如下, 耗时24ms:

    class Solution {
        int MOD = 1337;
    public:
        int superPow(int a, vector<int>& b) {
            int ret = 0;
            for(int i = 0; i < b.size(); i++){
                int t = b[i], retPowTen = 1;
                long long powT = 1;
                for(int j = 0; j < 10; j++){
                    retPowTen = (retPowTen * ret) % MOD;
                }
                ret = retPowTen;
                if(t == 0){
                    powT = 0;
                }
                else{
                    for(int j = 0; j < t; j++){
                        powT = (powT * a) % MOD;
                    }
                }
                if(powT && ret)
                    ret = (ret * (powT % MOD)) % MOD;
                else if(!ret)
                    ret = powT % MOD;
                else
                    ret = ret % MOD;
            }
            return ret;
        }
    };
