---
title: LeetCode 417. Pacific Atlantic Water Flow
tags:
  - CPP
  - LeetCode
  - 图
  - 搜索
  - 算法
url: 863.html
id: 863
categories:
  - LeetCode
date: 2016-10-10 15:57:59
---
题目描述:

> Given an `m x n` matrix of non-negative integers representing the height of each unit cell in a continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.
>
> Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.
>
> Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.
>
> **Note:**
>
> 1. The order of returned grid coordinates does not matter.
> 2. Both *m* and *n* are less than 150.
>
> **Example:**
>
> ```
> Given the following 5x5 matrix:
>
>   Pacific ~   ~   ~   ~   ~ 
>        ~  1   2   2   3  (5) *
>        ~  3   2   3  (4) (4) *
>        ~  2   4  (5)  3   1  *
>        ~ (6) (7)  1   4   5  *
>        ~ (5)  1   1   2   4  *
>           *   *   *   *   * Atlantic
>
> Return:
>
> [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).
> ```

比较直接的搜索题, 用BFS或者DFS分别找出所有与Pacific连接的位置和与Atlantic连接的位置, 然后求它们的交集.

```cpp
class Solution {
    int col, row;
public:
    vector<pair<int, int>> pacificAtlantic(vector<vector<int>>& matrix) {
        vector<pair<int, int>> ans;
        if(matrix.empty()) return ans;
        if(matrix[0].empty()) return ans;
        row = matrix.size(), col = matrix[0].size();
        vector<vector<int>> pacificVisited(row, vector<int>(col, 0)), atlanticVisited(row, vector<int>(col, 0));
        unordered_set<long long> pacific, atlantic;
        for(int i = 0; i < col; i++){
            BFS(matrix, 0, i, pacificVisited, pacific);
            BFS(matrix, row - 1, i, atlanticVisited, atlantic);
        }
        for(int i = 0; i < row; i++){
            BFS(matrix, i, 0, pacificVisited, pacific);
            BFS(matrix, i, col - 1, atlanticVisited, atlantic);
        }

        for(auto i : pacific){
            if(atlantic.count(i))
                ans.push_back(pair<int, int>(i >> 32, i & -1));
        }
        return ans;
    }
    
    void BFS(vector<vector<int>>& matrix, int x, int y, vector<vector<int>> &visited, unordered_set<long long> &ocean){
        if(visited[x][y]) return;
        queue<pair<int, int>> q;
        q.push(pair<int, int>(x, y));
        ocean.insert((long long)x << 32 | (long long)y);
        visited[x][y] = 1;
        while(!q.empty()){
            pair<int, int> p = q.front();
            if(p.first > 0 && !visited[p.first - 1][p.second] && matrix[p.first][p.second] <= matrix[p.first - 1][p.second]){
                visited[p.first - 1][p.second] = 1;
                pair<int, int> nextP = pair<int, int>(p.first - 1, p.second);
                ocean.insert((long long)nextP.first << 32 | (long long)nextP.second);
                q.push(nextP);
            }
            if(p.first < row - 1 && !visited[p.first + 1][p.second] && matrix[p.first][p.second] <= matrix[p.first + 1][p.second]){
                visited[p.first + 1][p.second] = 1;
                pair<int, int> nextP = pair<int, int>(p.first + 1, p.second);
                ocean.insert((long long)nextP.first << 32 | (long long)nextP.second);
                q.push(nextP);
            }
            if(p.second > 0 && !visited[p.first][p.second - 1] && matrix[p.first][p.second] <= matrix[p.first][p.second - 1]){
                visited[p.first][p.second - 1] = 1;
                pair<int, int> nextP = pair<int, int>(p.first, p.second - 1);
                ocean.insert((long long)nextP.first << 32 | (long long)nextP.second);
                q.push(nextP);
            }
            if(p.second < col - 1 && !visited[p.first][p.second + 1] && matrix[p.first][p.second] <= matrix[p.first][p.second + 1]){
                visited[p.first][p.second + 1] = 1;
                pair<int, int> nextP = pair<int, int>(p.first, p.second + 1);
                ocean.insert((long long)nextP.first << 32 | (long long)nextP.second);
                q.push(nextP);
            }
            q.pop();
        }
    }
};
```

