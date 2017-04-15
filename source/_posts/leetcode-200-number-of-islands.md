---
title: LeetCode 200. Number of Islands
tags:
  - CPP
  - LeetCode
  - 图
  - 算法
url: 998.html
id: 998
categories:
  - LeetCode
date: 2016-12-04 19:07:42
---
题目描述:

> Given a 2d grid map of `'1'`s (land) and `'0'`s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
>
> **Example 1:**
>
> ```
> 11110
> 11010
> 11000
> 00000
> ```
>
> Answer: 1
>
> **Example 2:**
>
> ```
> 11000
> 11000
> 00100
> 00011
> ```
>
> Answer: 3

使用BFS遍历即可.

```cpp
class Solution {
    vector<vector<int>> visited;
public:
    int numIslands(vector<vector<char>>& grid) {
        if(grid.empty()) return 0;
        if(grid[0].empty()) return 0;
        int islandNum = 0;
        visited = vector<vector<int>>(grid.size(), vector<int>(grid[0].size(), false));
        for(int i = 0; i < grid.size(); i++){
            for(int j = 0; j < grid[0].size(); j++){
                if(grid[i][j] == '1' && !visited[i][j]) {
                    BFS(grid, i, j);
                    ++islandNum;
                }
            }
        }
        return islandNum;
    }
    
    void BFS(vector<vector<char>> &g, int x, int y){
        visited[x][y] = true;
        g[x][y] = '0';
        queue<pair<int, int>> BFS;
        BFS.push(pair<int, int>(x, y));
        while(!BFS.empty()){
            pair<int, int> pos = BFS.front();
            int curX = pos.first, curY = pos.second;
            if(curX - 1 >= 0 && g[curX - 1][curY] == '1' && !visited[curX - 1][curY]){
                BFS.push(pair<int, int>(curX - 1, curY));
                visited[curX - 1][curY] = true;
            }
            if(curX + 1 < g.size() && g[curX + 1][curY] == '1' && !visited[curX + 1][curY]){
                BFS.push(pair<int, int>(curX + 1, curY));
                visited[curX + 1][curY] = true;
            }
            if(curY - 1 >= 0 && g[curX][curY - 1] == '1' && !visited[curX][curY - 1]){
                BFS.push(pair<int, int>(curX, curY - 1));
                visited[curX][curY - 1] = true;
            }
            if(curY + 1 < g[0].size() && g[curX][curY + 1] == '1' && !visited[curX][curY + 1]){
                BFS.push(pair<int, int>(curX, curY + 1));
                visited[curX][curY + 1] = true;
            }
            
            BFS.pop();
        }
    }
};
```

