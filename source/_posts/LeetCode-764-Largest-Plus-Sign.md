---
title: LeetCode 764. Largest Plus Sign
date: 2018-01-14 10:58:42
tags:
 - LeetCode 
 - CPP
 - 算法
 - 动态规划
categories:
 - LeetCode
---

In a 2D `grid` from (0, 0) to (N-1, N-1), every cell contains a `1`, except those cells in the given list `mines` which are `0`. What is the largest axis-aligned plus sign of `1`s contained in the grid? Return the order of the plus sign. If there is none, return 0.

An "*axis-aligned plus sign of 1s* of order **k**" has some center `grid[x][y] = 1` along with 4 arms of length `k-1` going up, down, left, and right, and made of `1`s. This is demonstrated in the diagrams below. Note that there could be `0`s or `1`s beyond the arms of the plus sign, only the relevant area of the plus sign is checked for 1s.

**Examples of Axis-Aligned Plus Signs of Order k:**

```
Order 1:
000
010
000

Order 2:
00000
00100
01110
00100
00000

Order 3:
0000000
0001000
0001000
0111110
0001000
0001000
0000000
```

**Example 1:**

```
Input: N = 5, mines = [[4, 2]]
Output: 2
Explanation:
11111
11111
11111
11111
11011
In the above grid, the largest plus sign can only be order 2.  One of them is marked in bold.
```

**Example 2:**

```
Input: N = 2, mines = []
Output: 1
Explanation:
There is no plus sign of order 2, but there is of order 1.
```

**Example 3:**

```
Input: N = 1, mines = [[0, 0]]
Output: 0
Explanation:
There is no plus sign, so return 0.
```

**Note:**

1. `N` will be an integer in the range `[1, 500]`.
2. `mines` will have length at most `5000`.
3. `mines[i]` will be length 2 and consist of integers in the range `[0, N-1]`.
4. *(Additionally, programs submitted in C, C++, or C# will be judged with a slightly smaller time limit.)*

<!-- more -->

这道题对我来说挺坑的，我一开始不想用二位数组来保存mines的位置，而是使用`set`\\`unordered_set`来保存，导致超时……后来又想了很久找到了另一种解法。

## Brute force

对每一个点，都依次向外搜索最大的+，最坏时间复杂度为O(n<sup>3</sup>)。

```cpp
class Solution {
    unordered_set<int64_t > mines;
    int _N;
public:
    int orderOfLargestPlusSign(int N, vector<vector<int>>& _mines) {
        _N = N;
        vector<vector<int>> zeros(N, vector<int>(N, 0));
        for (auto &v: _mines) {
            zeros[v[0]][v[1]] = 1;
        }

        int ans = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (ans != 0 && (!valid(i - ans + 1, j) || !valid(i + ans - 1, j) || !valid(i, j - ans + 1) || !valid(i, j + ans - 1)))
                    continue;
                for (int k = 1; ; k++) {
                    int l = k - 1;
                    if (!valid(i - l, j) || zeros[i - l][j]) {
                        break;
                    }
                    if (!valid(i + l, j) || zeros[i + l][j]) {
                        break;
                    }
                    if (!valid(i, j - l) || zeros[i][j - l]) {
                        break;
                    }
                    if (!valid(i, j + l) || zeros[i][j + l]) {
                        break;
                    }

                    ans = max(ans, k);
                    if (N % 2 == 0 && ans * 2 == N) {
                        return ans;
                    }
                    else if (N % 2 == 1 && ans * 2 - 1 == N) {
                        return ans;
                    }
                }
            }
        }

        return ans;
    }

    bool valid (int x, int y) {
        return (x >= 0 && x < _N && y >= 0 && y < _N);
    }
};
```

## DP

用四次二维DP，分别找到每个点的上下左右四个方向的最长的连续1的个数，然后对每一个点从这四个长度中选择最小值，就是该点的最大+大小。时间复杂度O(n<sup>2</sup>)。

要注意这个方法很容易超内存，所以我不得已把三维数组改成了二位数组循环利用四次。

```cpp
class Solution {
    unordered_set<int32_t > mines;
    int _N;
public:
    int orderOfLargestPlusSign(int N, vector<vector<int>>& _mines) {
        _N = N;
        for (auto &v : _mines) {
            mines.insert((int32_t)v[0] << 16 | (int32_t)v[1]);
        }

        int ans = 0;
        vector<vector<int>> dp(N, vector<int>(N, 0));
        vector<vector<int>> len(N, vector<int>(N, INT_MAX));

        for (int i = 0; i < N; i++) {
            if (!isMine(i, 0)) {
                dp[i][0] = 1;
                len[i][0] = min(len[i][0], dp[i][0]);
                ans = max(ans, len[i][0]);
            }
        }
        for (int i = 0; i < N; i++) {
            for (int j = 1; j < N; j++) {
                if (isMine(i, j))
                    continue;

                dp[i][j] = dp[i][j - 1] + 1;
                len[i][j] = min(len[i][j], dp[i][j]);
            }
        }

        dp.assign(N, vector<int>(N, 0));
        for (int i = 0; i < N; i++) {
            if (!isMine(0, i)) {
                dp[0][i] = 1;
                len[0][i] = min(len[0][i], dp[0][i]);
                ans = max(ans, len[0][i]);
            }
        }

        for (int i = 1; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (isMine(i, j))
                    continue;

                dp[i][j] = dp[i - 1][j] + 1;
                len[i][j] = min(len[i][j], dp[i][j]);
            }
        }

        dp.assign(N, vector<int>(N, 0));
        for (int i = N - 1; i >= 0; i--) {
            if (!isMine(N - 1, i)) {
                dp[N - 1][i] = 1;
                len[N - 1][i] = min(len[N - 1][i], dp[N - 1][i]);
                ans = max(ans, len[N - 1][i]);
            }
        }

        for (int i = N - 2; i >= 0; i--) {
            for (int j = N - 1; j >= 0; j--) {
                if (isMine(i, j))
                    continue;

                dp[i][j] = dp[i + 1][j] + 1;
                len[i][j] = min(len[i][j], dp[i][j]);
            }
        }

        dp.assign(N, vector<int>(N, 0));
        for (int i = N - 1; i >= 0; i--) {
            if (!isMine(i, N - 1)) {
                dp[i][N - 1] = 1;
                len[i][N - 1] = min(len[i][N - 1], dp[i][N - 1]);
                ans = max(ans, len[i][N - 1]);
            }
        }

        for (int i = N - 1; i >= 0; i--) {
            for (int j = N - 2; j >= 0; j--) {
                if (isMine(i, j))
                    continue;

                dp[i][j] = dp[i][j + 1] + 1;
                len[i][j] = min(len[i][j], dp[i][j]);
                ans = max(ans, len[i][j]);
            }
        }

        return ans;
    }

    bool isMine (int x, int y) {
        return (bool)mines.count((int32_t)x << 16 | (int32_t)y);
    }

    bool valid (int x, int y) {
        return (x >= 0 && x < _N && y >= 0 && y < _N);
    }
};
```

