---
title: LeetCode 565. Array Nesting
date: 2017-08-09 18:12:27
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

A zero-indexed array A consisting of N different integers is given. The array contains all integers in the range [0, N - 1].

Sets S[K] for 0 <= K < N are defined as follows:

S[K] = { A[K], A[A[K]], A[A[A[K]]], ... }.

Sets S[K] are finite for each K and should NOT contain duplicates.

Write a function that given an array A consisting of N integers, return the size of the largest set S[K] for this array.

**Example 1:**

```
Input: A = [5,4,0,3,1,6,2]
Output: 4
Explanation: 
A[0] = 5, A[1] = 4, A[2] = 0, A[3] = 3, A[4] = 1, A[5] = 6, A[6] = 2.

One of the longest S[K]:
S[0] = {A[0], A[5], A[6], A[2]} = {5, 6, 2, 0}

```

**Note:**

1. N is an integer within the range [1, 20,000].
2. The elements of A are all distinct.
3. Each element of array A is an integer within the range [0, N-1].

<!-- more -->

-----------------

以数组中的当前元素值作为下一个下标，依次访问直到到达一个已经访问过的元素。类似于构造一个链表。

因为数组中的元素是连续的而且不重复，所以不存在多个元素指向同一个下标。所以最后得到的一定是一个或者多个循环链表的结构。

因此遍历数组，从每个元素开始构造到结束，把遍历过的所有位置设为-1表示访问过不用再处理，记录得到的最大长度。

```cpp
class Solution {
public:
    int arrayNesting(vector<int>& nums) {
        int ans = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == -1) continue;
            int index = nums[i];
            int len = 0;
            while (nums[index] != -1) {
                int pre = index;
                index = nums[index];
                nums[pre] = -1;
                len++;
            }
            ans = max(ans, len);
        }
        return ans;
    }
};
```

