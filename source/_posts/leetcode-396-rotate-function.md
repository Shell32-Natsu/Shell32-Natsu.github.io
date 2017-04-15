---
title: LeetCode 396. Rotate Function
tags:
  - CPP
  - LeetCode
  - 算法
url: 751.html
id: 751
categories:
  - LeetCode
date: 2016-09-12 15:49:04
---
问题描述:

> Given an array of integers `A` and let *n* to be its length.
>
> Assume `Bk` to be an array obtained by rotating the array `A` *k* positions clock-wise, we define a "rotation function" `F` on `A` as follow:
>
> `F(k) = 0 * Bk[0] + 1 * Bk[1] + ... + (n-1) * Bk[n-1]`.
>
> Calculate the maximum value of `F(0), F(1), ..., F(n-1)`.
>
> **Note:**
> *n* is guaranteed to be less than 105.
>
> **Example:**
>
> ```
> A = [4, 3, 2, 6]
>
> F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
> F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
> F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
> F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26
>
> So the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.
> ```

按照题目要求的步骤来计算一个数组的每个元素与下标乘积的和, 然后每次循环右移一位, 找出所有的和中的最大值. 不需要在每次右移后都计算一次数组的和, 只要把上一次得到的结果减去最后一项`(n-1) * Bk[n-1]`再加上所有元素的和(不乘下标)再减去`Bk[n-1]`即可.

```cpp
class Solution {
public:
    int maxRotateFunction(vector<int>& A) {
        int sum = 0, stepSum = 0, maxSum = INT_MIN, n = A.size();
        for(int i = 0; i < n; i++){
            sum += A[i];
            stepSum += (i * A[i]);
        }
        maxSum = stepSum;
        for(int i = 1; i < n; i++){
            stepSum = stepSum - A[n - i] * (n - 1) + sum - A[n - i];
            maxSum = max(maxSum, stepSum);
        }
        return maxSum;
    }
};
```

