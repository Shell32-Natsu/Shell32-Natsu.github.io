---
title: LeetCode 62. Unique Paths
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 571.html
id: 571
categories:
  - LeetCode
date: 2016-08-05 17:01:51
---
﻿题目描述:

>A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
>
>The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
>
>How many possible unique paths are there?
>
>![](http://leetcode.com/wp-content/uploads/2014/12/robot_maze.png)
>
>Above is a 3 x 7 grid. How many possible unique paths are there?
>
>Note: m and n will be at most 100.

经典的动态规划题目, 由于每一个格子只能从上面的格子和左面的格子到达, 所以到达每个格子的路线数量等于到达上面格子的路线数量+到达左面格子的路线数量.

    class Solution {
    public:
        int uniquePaths(int m, int n) {
            int arr[m][n];
            int i, j;
            for(i = 0; i < m; i++)
                arr[i][0] = 1;
            for(i = 0; i < n; i++)
                arr[0][i] = 1;
            for(i = 1; i < m; i++){
                for(j = 1; j < n; j++){
                    arr[i][j] = arr[i - 1][j] + arr[i][j - 1];
                }
            }
            
            return arr[m - 1][n - 1];
        }
    };