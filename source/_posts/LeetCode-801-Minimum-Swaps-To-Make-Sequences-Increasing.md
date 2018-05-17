---
title: LeetCode 801. Minimum Swaps To Make Sequences Increasing
date: 2018-03-18 18:36:36
tags:
 - LeetCode
 - CPP
 - 算法
 - 动态规划
categories:
 - LeetCode
---

We have two integer sequences `A` and `B` of the same non-zero length.

We are allowed to swap elements `A[i]` and `B[i]`. Note that both elements are in the same index position in their respective sequences.

At the end of some number of swaps, `A` and `B` are both strictly increasing. (A sequence is *strictly increasing* if and only if `A[0] < A[1] < A[2] < ... < A[A.length - 1]`.)

Given A and B, return the minimum number of swaps to make both sequences strictly increasing. It is guaranteed that the given input always makes it possible.

```
Example:
Input: A = [1,3,5,4], B = [1,2,3,7]
Output: 1
Explanation: 
Swap A[3] and B[3].  Then the sequences are:
A = [1, 3, 5, 7] and B = [1, 2, 3, 4]
which are both strictly increasing.
```

**Note:**

- `A, B` are arrays with the same length, and that length will be in the range `[1, 1000]`.
- `A[i], B[i]` are integer values in the range `[0, 2000]`.

<!-- more -->

使用DP，如果array长度为n，那么使用2行n列的二维DP。`dp[0][i]`保存`i`位置没有交换的步数，`dp[1][i]`保存`i`位置交换了的最小步数。与`i-1`位置的情况组合之后有四种情况。但是实际上只有两种：

1. 在`i-1`位置没有交换的情况下`i`位置不需要交换；`i-1`和`i`位置都进行了交换。这两种情况都是`A`和`B`的`i`元素分别大于`i-1`元素。
2. 如果`A`或`B`中有一个不满足递增，那么就要交换，分为`i-1`交换和`i`交换两种。

```cpp
class Solution {
public:
    int minSwap(vector<int>& A, vector<int>& B) {
        int len = A.size();
        vector<vector<int>> dp(2, vector<int>(len, INT_MAX));
        dp[0][0] = 0;
        dp[1][0] = 1;
        for (int i = 1; i < len; i++) {
            if (A[i] > A[i - 1] && B[i] > B[i - 1]) {
                dp[0][i] = min(dp[0][i], dp[0][i - 1]);
                dp[1][i] = min(dp[1][i], dp[1][i - 1]) + 1;
            }

            if (A[i] > B[i - 1] && B[i] > A[i - 1]) {
                dp[0][i] = min(dp[0][i], dp[1][i - 1]);
                dp[1][i] = min(dp[1][i], dp[0][i - 1]) + 1;
            }
        }
        return min(dp[0][len - 1], dp[1][len - 1]);
    }
};
```

