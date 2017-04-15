---
title: LeetCode 64. Minimum Path Sum
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 577.html
id: 577
categories:
  - LeetCode
date: 2016-08-06 16:39:59
---
﻿题目描述:

>Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.
>
>Note: You can only move either down or right at any point in time.

动态规划问题, 到达每个格子的最小的路径和等于到达左边左边格子的路径和与到达上面的格子的路径和中的较小值加上当前格子的值.

    class Solution {
    public:
        int minPathSum(vector<vector<int> > &grid) {
            int height = grid.size(), width = grid[0].size();
            
            for(int i = 1; i < height; i++)
                grid[i][0] += grid[i - 1][0];
            for(int i = 1; i < width; i++)
                grid[0][i] += grid[0][i - 1];
                
            for(int i = 1; i < height; i++){
                for(int j = 1; j < width; j++){
                    grid[i][j] += (grid[i - 1][j] < grid[i][j - 1] ? grid[i - 1][j] : grid[i][j - 1]);
                }
            }
            
            return grid[height - 1][width - 1];
        }
    };