---
title: LeetCode 598. Range Addition II
date: 2017-08-09 17:21:27
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

Given an m * n matrix **M** initialized with all **0**'s and several update operations.

Operations are represented by a 2D array, and each operation is represented by an array with two **positive** integers **a** and **b**, which means `M[i][j]` should be **added by one** for all **0 <= i < a** and **0 <= j < b**.

You need to count and return the number of maximum integers in the matrix after performing all the operations.

**Example 1:**

```
Input: 
m = 3, n = 3
operations = [[2,2],[3,3]]
Output: 4
Explanation: 
Initially, M = 
[[0, 0, 0],
 [0, 0, 0],
 [0, 0, 0]]

After performing [2,2], M = 
[[1, 1, 0],
 [1, 1, 0],
 [0, 0, 0]]

After performing [3,3], M = 
[[2, 2, 1],
 [2, 2, 1],
 [1, 1, 1]]

So the maximum integer in M is 2, and there are four of it in M. So return 4.

```

**Note:**

1. The range of m and n is [1,40000].
2. The range of a is [1,m], and the range of b is [1,n].
3. The range of operations size won't exceed 10,000.

<!-- more -->

------------------

首先注意到每一步的更新策略：

> `M[i][j]` should be **added by one** for all **0 <= i < a** and **0 <= j < b**.

也就是说，`M[0][0]`是每次都必然+1的，也就是说最大的值一定是`M[0][0]`，而且这个最大的值也等于操作的次数。这样，我们要找的就是每一次都发生了+1操作的位置，换句话说，只要求所有操作所对应的区域的交集就可以了。

```cpp
class Solution {
public:
    int maxCount(int m, int n, vector<vector<int>>& ops) {
        vector<int> final = {m, n};
        for (int i = 0; i < ops.size(); i++) {
            final[0] = min(final[0], ops[i][0]);
            final[1] = min(final[1], ops[i][1]);
        }
        return final[0] * final[1];
    }
};
```

