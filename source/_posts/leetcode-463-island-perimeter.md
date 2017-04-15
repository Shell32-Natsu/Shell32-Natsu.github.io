---
title: LeetCode 463. Island Perimeter
tags:
  - CPP
  - LeetCode
  - 算法
url: 993.html
id: 993
categories:
  - LeetCode
date: 2016-12-03 23:34:44
---
题目描述:

> You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water. Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells). The island doesn't have "lakes" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.
>
> **Example:**
>
> ```
> [[0,1,0,0],
>  [1,1,1,0],
>  [0,1,0,0],
>  [1,1,0,0]]
>
> Answer: 16
> Explanation: The perimeter is the 16 yellow stripes in the image below:
> ```
> ![](https://leetcode.com/static/images/problemset/island.png)

遍历整个二维数组, 对于每块陆地, 计算该块陆地与"水域"接触的边的数量, 这个数量范围为`[0,4]`, 岛屿的总周长等于每块陆地与水域接触的边的数量之和.

```cpp
class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int ans = 0;
        if(grid.empty() || grid[0].empty()) return 0;
        int row = grid.size(), col = grid[0].size();
        
        for(int i = 0; i < row; i++){
            for(int j = 0; j < col; j++){
                if(grid[i][j] == 1)
                    ans += getPerimeter(grid, i, j);
            }
        }
        return ans;
    }
    
    int getPerimeter(vector<vector<int>>& grid, int x, int y){
        int ans = 0;
        int row = grid.size(), col = grid[0].size();
        if(x == 0 || grid[x - 1][y] == 0){
            ans++;
        }
        if(x == row - 1 || grid[x + 1][y] == 0){
            ans++;
        }
        if(y == 0 || grid[x][y - 1] == 0){
            ans++;
        }
        if(y == col - 1 || grid[x][y + 1] == 0){
            ans++;
        }
        return ans;
    }
};
```