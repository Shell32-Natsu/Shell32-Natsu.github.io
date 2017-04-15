---
title: LeetCode 48. Rotate Image
tags:
  - CPP
  - LeetCode
  - 算法
url: 524.html
id: 524
categories:
  - LeetCode
date: 2016-07-31 15:40:49
---
﻿题目描述:

> You are given an n x n 2D matrix representing an image.
>
> Rotate the image by 90 degrees (clockwise).
>
> Follow up:
> Could you do this in-place?

题目要求将一个n*n数组顺时针旋转90度, 并且最好不使用额外空间. 所以用对角线将矩阵分为四个区域, 对于每个区域内的每个元素依次放入上一个区域的值.

    class Solution {
    public:
        void rotate(vector<vector<int>>& matrix) {
            int n = matrix.size();
            for(int i = 0; i < n / 2; i++){
                for(int j = i; j < n - 1 - i; j++){
                    int swap_t = matrix[i][j];
                    matrix[i][j] = matrix[n - 1 - j][i];
                    matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
                    matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
                    matrix[j][n - 1 - i] = swap_t;
                }
            }
        }
    };