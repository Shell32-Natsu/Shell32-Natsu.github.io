---
title: LeetCode 611. Valid Triangle Number
date: 2017-08-05 16:48:23
tags:
 - LeetCode
 - CPP
 - 算法
 - 数组
 - 双指针
categories:
 - LeetCode
---

Given an array consists of non-negative integers, your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

**Example 1:**

```
Input: [2,2,3,4]
Output: 3
Explanation:
Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3

```

**Note:**

1. The length of the given array won't exceed 1000.
2. The integers in the given array are in the range of [0, 1000].

<!-- more -->

--------------

三角形三边的成立条件是：任意两边之和大于第三边/任意两边之差小于第三边。为了方便使用双指针，先对数组进行排序。

然后遍历数组，选定每一个元素作为一条边L1，接下来就是找到另外两条边了。在内层循环中遍历所有比L1短的边，作为另一条边L2。在寻找第三条边的过程中，使用另一个指针扫描比L1长的边（L3），因为在扫描L2的过程中，L1+L2是递减的，因此我们不必从最长的边开始扫描，而可以从上一次的L3位置继续，这样，对于每一个L1，只需要遍历整个数组一次，因此复杂度为O(n^2)。

```cpp
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int ans = 0;
        if (nums.size() < 3) return 0;
        for (int i = 1; i < nums.size() - 1; i++) {
            int right = nums.size() - 1;
            for (int left = i - 1; left >= 0; left--) {
                while (right > i && nums[right] >= nums[i] + nums[left]) right--;
                ans += right - i;
            }
        }
        return ans;
    }
};
```

