---
title: LeetCode 69. Sqrt(x)
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 算法
url: 588.html
id: 588
categories:
  - LeetCode
date: 2016-08-08 18:59:49
---
题目描述:

>Implement `int sqrt(int x)`.
>
>Compute and return the square root of x.

实现整数的开平方运算, 使用二分搜索, 也就是方程求根的二分法来计算. 因为计算结果为整数, 所以最后如果没有平方根的准确值, 要把最后的结果减1.

    class Solution {
    public:
        int mySqrt(int x) {
            if(x == 1) return 1;
            long long left = 1, right = x, mid = (left + right) / 2;
            while(left < right){
                long long m = mid * mid;
                if(m > x) 
                    right = mid;
                else if(m < x)
                    left = mid + 1;
                else 
                    return mid;
                mid = (left + right) / 2;
            }
            return left - 1;
        }
    };