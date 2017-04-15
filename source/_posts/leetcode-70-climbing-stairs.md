---
title: LeetCode 70. Climbing Stairs
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 591.html
id: 591
categories:
  - LeetCode
date: 2016-08-09 16:40:53
---
﻿题目描述:

>You are climbing a stair case. It takes n steps to reach to the top.
>
>Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

斐波那契数列, 到达第n层的路径数量等于到达第n - 1层的路径数量加到达第n - 2层的路径数量.
    
    class Solution {
    public:
        int climbStairs(int n) {
            if(n == 1)return 1;
            if(n == 2)return 2;
            int a = 1, b = 2, t;
            for(int i = 2; i < n; i++){
                t = b;
                b = a + b;
                a = t;
            }
            return b;
        }
    };