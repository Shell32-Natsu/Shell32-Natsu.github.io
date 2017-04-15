---
title: LeetCode 413. Arithmetic Slices
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 906.html
id: 906
categories:
  - LeetCode
date: 2016-10-29 17:13:50
---
题目描述:

> A sequence of number is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.
>
> For example, these are arithmetic sequence:
>
> ```
> 1, 3, 5, 7, 9
> 7, 7, 7, 7
> 3, -1, -5, -9
> ```
>
> The following sequence is not arithmetic.
>
> ```
> 1, 1, 2, 5, 7
> ```
>
> A zero-indexed array A consisting of N numbers is given. A slice of that array is any pair of integers (P, Q) such that 0 <= P < Q < N.
>
> A slice (P, Q) of array A is called arithmetic if the sequence:
> A[P], A[p + 1], ..., A[Q - 1], A[Q] is arithmetic. In particular, this means that P + 1 < Q.
>
> The function should return the number of arithmetic slices in the array A.
>
> **Example:**
>
> ```
> A = [1, 2, 3, 4]
>
> return: 3, for 3 arithmetic slices in A: [1, 2, 3], [2, 3, 4] and [1, 2, 3, 4] itself.
> ```

这道题我首先用双指针找到所有的尽量长的连续等差数列. 对于每个数列, 假设长度为n, 那么它所包含的所有可能长度的等差数列(长度>=3)有$1+2+3+\dots+(n-2)=(n-2)(n-1)/2=(n^2-3n+2)/2$个.

```cpp
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& A) {
        if(A.size() < 3) return 0;
        int p = 0, q = 2;
        int ans = 0;
        while(q < A.size()) {
            if(A[p + 1] - A[p] != A[q] - A[p + 1]) {
                p++, q++;
                continue;
            }
            int diff = A[p + 1] - A[p];
            while(q + 1 < A.size() && A[q + 1] - A[q] == diff) q++;
            int seqLength = q - p + 1;
            ans += (seqLength * seqLength - 3 * seqLength + 2) / 2;
            p = q;
            q = p + 2;
        }
        return ans;
    }
};
```

