---
title: LeetCode 63. Unique Paths II
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 574.html
id: 574
categories:
  - LeetCode
date: 2016-08-05 17:15:23
---
题目描述

>Follow up for "Unique Paths":
>
>Now consider if some obstacles are added to the grids. How many unique paths would there be?
>
>An obstacle and empty space is marked as 1 and 0 respectively in the grid.
>
>For example,
>There is one obstacle in the middle of a 3x3 grid as illustrated below.
>
>     [
>       [0,0,0],
>       [0,1,0],
>       [0,0,0]
>     ]
>The total number of unique paths is 2.
>
>Note: m and n will be at most 100.

紧跟着上一题[Unique Paths](http://xiadong.info/2016/08/leetcode-62-unique-paths/), 这一题增加了条件, 在地图上会出现障碍物(用1表示), 障碍物不能出现在路线上. 仍然采用上一题的动态规划法, 只不过多了一条:

* 所有障碍物的位置到达的路线数量都为0


    class Solution {
    public:
        int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
            int m = obstacleGrid.size();
            if(m == 0)
                return 0;
            int n = obstacleGrid[0].size();
            vector<vector<int>> arr(m, vector<int>(n, 0));
            int i, j;
            for(i = 0; i < m && obstacleGrid[i][0] != 1; i++)
                arr[i][0] = 1;
            for(i = 0; i < n && obstacleGrid[0][i] != 1; i++)
                arr[0][i] = 1;
            for(i = 1; i < m; i++){
                for(j = 1; j < n; j++){
                    if(obstacleGrid[i][j])
                        continue;
                        
                    arr[i][j] = arr[i - 1][j] + arr[i][j - 1];
                }
            }
            
            return arr[m - 1][n - 1];
        }
    };