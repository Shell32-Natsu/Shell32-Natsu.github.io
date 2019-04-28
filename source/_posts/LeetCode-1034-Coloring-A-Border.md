---
title: LeetCode 1034. Coloring A Border
date: 2019-04-27 23:25:17
tags:
 - LeetCode
 - CPP
 - 图
 - BFS
categories:
 - LeetCode
---

Given a 2-dimensional `grid` of integers, each value in the grid represents the color of the grid square at that location.

Two squares belong to the same *connected component* if and only if they have the same color and are next to each other in any of the 4 directions.

The *border* of a connected component is all the squares in the connected component that are either 4-directionally adjacent to a square not in the component, or on the boundary of the grid (the first or last row or column).

Given a square at location `(r0, c0)` in the grid and a `color`, color the border of the connected component of that square with the given `color`, and return the final `grid`.

 

**Example 1:**

```
Input: grid = [[1,1],[1,2]], r0 = 0, c0 = 0, color = 3
Output: [[3, 3], [3, 2]]
```

**Example 2:**

```
Input: grid = [[1,2,2],[2,3,2]], r0 = 0, c0 = 1, color = 3
Output: [[1, 3, 3], [2, 3, 3]]
```

**Example 3:**

```
Input: grid = [[1,1,1],[1,1,1],[1,1,1]], r0 = 1, c0 = 1, color = 2
Output: [[2, 2, 2], [2, 1, 2], [2, 2, 2]]
```

 

**Note:**

1. `1 <= grid.length <= 50`
2. `1 <= grid[0].length <= 50`
3. `1 <= grid[i][j] <= 1000`
4. `0 <= r0 < grid.length`
5. `0 <= c0 < grid[0].length`
6. `1 <= color <= 1000`

<!-- more -->

BFS搞就完事了。

```cpp
class Solution {
    int row, col;
    vector<vector<int>> nextStep = {
            {-1,0},
            {1,0},
            {0,1},
            {0,-1}
    };
public:
    vector<vector<int>> colorBorder(vector<vector<int>>& grid, int r0, int c0, int color) {
        queue<pair<int, int>> q;
        row = grid.size(), col = grid[0].size();
        vector<vector<int>> visited(row, vector<int>(col, 0));
        q.push({r0, c0});
        visited[r0][c0] = 1;
        vector<pair<int, int>> border;
        while (!q.empty()) {
            auto p = q.front();
            q.pop();
            int r = p.first, c = p.second;
            if (isBorder(grid, r, c))
                border.emplace_back(r, c);
            for (auto next: nextStep) {
                int tr = r + next[0], tc = c + next[1];
                if (!isValid(grid, tr, tc) || grid[r][c] != grid[tr][tc] || 
                    visited[tr][tc])
                    continue;
                q.push({tr, tc});
                visited[tr][tc] = 1;
            }
        }
        for (auto p : border) {
            grid[p.first][p.second] = color;
        }
        return grid;
    }

    bool isBorder(vector<vector<int>>& grid, int r, int c) {
        if (r == 0 || c == 0 || r == row - 1 || c == col - 1)
            return true;
        for (auto next: nextStep) {
            int tr = r + next[0], tc = c + next[1];
            if (!isValid(grid, tr, tc))
                continue;
            if (grid[tr][tc] != grid[r][c])
                return true;
        }
        return false;
    }

    bool isValid(vector<vector<int>>& grid, int r, int c) {
        return r >= 0 && c >= 0 && r < row && c < col;
    }
};
```

