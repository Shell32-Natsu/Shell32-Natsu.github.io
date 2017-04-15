---
title: LeetCode 59. Spiral Matrix II
tags:
  - CPP
  - LeetCode
  - 算法
url: 561.html
id: 561
categories:
  - LeetCode
date: 2016-08-04 17:38:11
---
﻿题目描述:

>Given an integer n, generate a square matrix filled with elements from 1 to n2 in spiral order.
>
>For example,
>Given n = 3,
>
>You should return the following matrix:
>
>     [
>       [ 1, 2, 3 ],
>       [ 8, 9, 4 ],
>       [ 7, 6, 5 ]
>     ]

螺旋输出序列. 首先用一个循环, 在循环体内填充一圈数字, 直到所有位置填满.

    class Solution {
    public:
        vector<vector<int> > generateMatrix(int n) {
            vector<vector<int> > ret(n, vector<int>(n, 0));
            if(n == 0)return ret;
            int a = 1;
            for(int i = n; i > 0; i-=2){ // 圈数应为n/2
                if(i == 1 && n % 2 == 1){ // 当n为奇数时, 最内圈只有一个元素
                    ret[(n - i) / 2][(n - i) / 2] = a++;
                    break;
                }
                for(int j = (n - i) / 2; j < n - (n - i) / 2 - 1; j++) // 填充上边的行
                    ret[(n - i) / 2][j] = a++;
                for(int j = (n - i) / 2; j < n - (n - i) / 2 - 1; j++) // 填充右边的列
                    ret[j][n - (n - i) / 2 - 1] = a++;
                for(int j = n - (n - i) / 2 - 1; j > (n - i) / 2; j--) // 填充下边的行
                    ret[n - (n - i) / 2 - 1][j] = a++;
                for(int j = n - (n - i) / 2 - 1; j > (n - i) / 2; j--) // 填充左边的列
                    ret[j][(n - i) / 2] = a++;
            }
            
            return ret;
        }
    };