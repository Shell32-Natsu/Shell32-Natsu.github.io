---
title: 'LeetCode 50. Pow(x, n)'
tags:
  - CPP
  - LeetCode
  - 算法
url: 529.html
id: 529
categories:
  - LeetCode
date: 2016-07-31 16:23:32
---
题目描述:

> Implement pow(x, n).

题目要求实现pow函数. 首先n若小于0, 则可以先把x取倒数, 然后n取相反数, 从而变为n大于0的情况(但是由于int表示范围的问题, 所以新的n应该使用long long来存储), 所以只要考虑n大于0的情况. x<sup>n</sup> = (x<sup>2</sup>)<sup>n/2</sup>(n为偶数); x<sup>n</sup> = x*(x<sup>2</sup>)<sup>(n - 1)/2</sup>(n为奇数), 所以循环次数可以降低至logn次.

    class Solution {
    public:
        double myPow(double x, int n) {
            long long nn = n;
            double re = 1;
            if(nn == 0) return 1;
            if(nn < 0){
                x = 1 / x;
                nn = -nn;
            }
            while(nn > 1){
                if(nn % 2 == 0){
                    x *= x;
                    nn = nn >> 1;
                }
                else{
                    re *= x;
                    nn -= 1;
                }
            }
            return re * x;
        }
    };