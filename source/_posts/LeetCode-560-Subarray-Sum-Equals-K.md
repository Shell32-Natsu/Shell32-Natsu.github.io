---
title: LeetCode 560. Subarray Sum Equals K
date: 2017-08-09 18:48:33
tags:
 - LeetCode
 - CPP
 - 算法
 - 哈希表
categories:
 - LeetCode
---

Given an array of integers and an integer **k**, you need to find the total number of continuous subarrays whose sum equals to **k**.

**Example 1:**

```
Input:nums = [1,1,1], k = 2
Output: 2

```

**Note:**

1. The length of the array is in range [1, 20,000].
2. The range of numbers in the array is [-1000, 1000] and the range of the integer **k** is [-1e7, 1e7].

<!-- more -->

--------------

因为数组中可能出现负数，所以不能用双指针。

用一个哈希表记录所有前缀和出现的下标，然后对于每一个下标`i`对应的前缀和`sum`，找到`sum+k`出现的下标，其中**大于等于**i的下标的个数就是从i开始的和为k的连续子串的个数。

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, vector<int>> sum2index;
        int sum = 0, ans = 0;
        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i];
            sum2index[sum].push_back(i);
        }
        
        sum = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (!sum2index.count(sum + k)) {
                sum += nums[i];
                continue;
            }
            vector<int> &indexes = sum2index[sum + k];
            int j;
            for (j = 0; j < indexes.size() && indexes[j] < i; j++);
            ans += (indexes.size() - j);
            sum += nums[i];
        }
        return ans;
    }
};
```

