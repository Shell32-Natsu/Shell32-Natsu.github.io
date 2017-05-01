---
title: LeetCode 566. Reshape the Matrix
date: 2017-05-01 17:59:42
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

题目描述：

In MATLAB, there is a very useful function called 'reshape', which can reshape a matrix into a new one with different size but keep its original data.

You're given a matrix represented by a two-dimensional array, and two **positive** integers **r** and **c** representing the **row** number and **column** number of the wanted reshaped matrix, respectively.

The reshaped matrix need to be filled with all the elements of the original matrix in the same **row-traversing** order as they were.

If the 'reshape' operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.

**Example 1:**

```
Input: 
nums = 
[[1,2],
 [3,4]]
r = 1, c = 4
Output: 
[[1,2,3,4]]
Explanation:
The row-traversing of nums is [1,2,3,4]. The new reshaped matrix is a 1 * 4 matrix, fill it row by row by using the previous list.

```

**Example 2:**

```
Input: 
nums = 
[[1,2],
 [3,4]]
r = 2, c = 4
Output: 
[[1,2],
 [3,4]]
Explanation:
There is no way to reshape a 2 * 2 matrix to a 2 * 4 matrix. So output the original matrix.

```

**Note:**

1. The height and width of the given matrix is in range [1, 100].
2. The given r and c are all positive.

------------------------

没什么好说的，就按照顺序遍历矩阵把元素放进新矩阵就可以了。

<!-- more -->

```cpp
class Solution {
public:
    vector<vector<int>> matrixReshape(vector<vector<int>>& nums, int r, int c) {
        int n = nums.size() * nums.front().size();
        if (n != r * c) return nums;
        vector<vector<int>> ans;
        vector<int> tmp;
        for (auto &row : nums) {
            for (auto &col : row) {
                tmp.push_back(col);
                if (tmp.size() == c) {
                    ans.push_back(tmp);
                    tmp.clear();
                }
            }
        }
        return ans;
    }
};
```

