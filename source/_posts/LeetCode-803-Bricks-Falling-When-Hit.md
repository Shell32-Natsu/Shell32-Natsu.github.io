---
title: LeetCode 803. Bricks Falling When Hit
date: 2018-03-18 18:39:40
tags:
 - LeetCode
 - CPP
 - 算法
 - 图
 - 并查集
categories:
 - LeetCode
---

We have a grid of 1s and 0s; the 1s in a cell represent bricks. A brick will not drop if and only if it is directly connected to the top of the grid, or at least one of its (4-way) adjacent bricks will not drop.

We will do some erasures sequentially. Each time we want to do the erasure at the location (i, j), the brick (if it exists) on that location will disappear, and then some other bricks may drop because of that erasure.

Return an array representing the number of bricks that will drop after each erasure in sequence.

```
Example 1:
Input: 
grid = [[1,0,0,0],[1,1,1,0]]
hits = [[1,0]]
Output: [2]
Explanation: 
If we erase the brick at (1, 0), the brick at (1, 1) and (1, 2) will drop. So we should return 2.
```

```
Example 2:
Input: 
grid = [[1,0,0,0],[1,1,0,0]]
hits = [[1,1],[1,0]]
Output: [0,0]
Explanation: 
When we erase the brick at (1, 0), the brick at (1, 1) has already disappeared due to the last move. So each erasure will cause no bricks dropping.  Note that the erased brick (1, 0) will not be counted as a dropped brick.
```

**Note:**

- The number of rows and columns in the grid will be in the range [1, 200].
- The number of erasures will not exceed the area of the grid.
- It is guaranteed that each erasure will be located inside the grid.
- An erasure may refer to a location with no brick - if it does, no bricks drop.

<!-- more -->

这道题比赛的时候没有想出来，看了下AC的代码，发现可以用反向的并查集来做。这个反向的思维就是关键了。

先把`hits`正向走一遍，删除要删除的节点。最后得到一个剩余的bricks的图，把这些剩余的bricks用并查集分类，为了后面的方便，可以在头节点记录集合中有多少个bricks，在merge的时候把数量也merge了。merge的时候对于top的bricks特殊考虑，优先把它们作为head。

接着逆向地把`hits`删掉的bricks一个一个加回去，每次都与四个方向merge。merge之后看该brick的head是否在top，如果不在，说明这次remove没有导致任何bricks fall。如果在，说明有掉落，那么merge的时候head不在top的bricks集合就是本次删除会fall的bricks。

代码写的不是很好看。

```cpp
class Solution {
    vector<vector<int>> afterGrid;
    vector<vector<pair<int, int>>> uf;
    vector<vector<int>> setNum;
    int row, col;
    vector<pair<int, int>> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
public:
    vector<int> hitBricks(vector<vector<int>>& grid, vector<vector<int>>& hits) {
        row = grid.size();
        col = grid[0].size();
        init (grid, hits);

        vector<int> ans;
        for (int i = hits.size() - 1; i >= 0; i--) {
            int x = hits[i][0], y = hits[i][1];
            if (!grid[x][y]) {
                ans.push_back(0);
                continue;
            }
            afterGrid[x][y] = 1;
            auto p1 = make_pair(x, y);
            int cnt = 0;

            uf[x][y] = make_pair(x, y);
            setNum[x][y] = 1;

            for (auto &k : directions) {
                auto p2 = make_pair(x + k.first, y + k.second);
                if (!valid(p2) || afterGrid[p2.first][p2.second] == 0)
                    continue;
                auto h2 = head(p2);
                auto h1 = head(p1);
                if (h1 == h2) {
                    continue;
                }
                if (h2.first != 0) {
                    cnt += setNum[h2.first][h2.second];
                }
                merge(p1, p2);
            }
            auto h = head(p1);
            if (h.first != 0) {
                ans.push_back(0);
            }
            else {
                ans.push_back(cnt);
            }
        }
        reverse(ans.begin(), ans.end());
        return ans;
    }

    void init (vector<vector<int>>& grid, vector<vector<int>>& hits) {
        afterGrid = grid;
        for (auto &hit : hits) {
            afterGrid[hit[0]][hit[1]] = 0;
        }

        uf = vector<vector<pair<int,int>>>(row, vector<pair<int, int>>(col, {0, 0}));
        setNum.assign(row, vector<int>(col, 0));
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (!afterGrid[i][j])
                    continue;
                uf[i][j] = make_pair(i, j);
                setNum[i][j] = 1;
            }
        }

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (!afterGrid[i][j])
                    continue;
                auto p1 = make_pair(i, j);
                for (auto &k : directions) {
                    auto p2 = make_pair(i + k.first, j + k.second);
                    if (!valid(p2) || afterGrid[p2.first][p2.second] == 0)
                        continue;
                    merge(p1, p2);
                }
            }
        }
    }

    bool valid(pair<int, int> &p) {
        return p.first >= 0 && p.first < row && p.second >= 0 && p.second < col;
    }

    pair<int, int> head(pair<int, int> p) {
        while (uf[p.first][p.second] != p) {
            p = uf[p.first][p.second];
        }
        return p;
    }

    void merge (pair<int, int> a, pair<int, int> b) {
        auto h1 = head(a), h2 = head(b);
        if (h1 == h2)
            return;
        if (h1.first == 0) {
            uf[h2.first][h2.second] = h1;
            setNum[h1.first][h1.second] += setNum[h2.first][h2.second];
            setNum[h2.first][h2.second] = 0;
        }
        else {
            uf[h1.first][h1.second] = h2;
            setNum[h2.first][h2.second] += setNum[h1.first][h1.second];
            setNum[h1.first][h1.second] = 0;
        }
    }
};
```