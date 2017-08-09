---
title: LeetCode 594. Longest Harmonious Subsequence
date: 2017-08-09 16:41:46
tags:
 - LeetCode
 - CPP
 - 算法
 - 哈希表
categories:
 - LeetCode
---

We define a harmonious array is an array where the difference between its maximum value and its minimum value is **exactly** 1.

Now, given an integer array, you need to find the length of its longest harmonious subsequence among all its possible [subsequences](https://en.wikipedia.org/wiki/Subsequence).

**Example 1:**

```
Input: [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].

```

**Note:** The length of the input array will not exceed 20,000.

<!-- more -->

---------------------

这道题要注意两点：

1. 是**子串**而不是连续子串
2. 是**exactly one**而不是less than one

因为不要求连续，所以实际上找到两个连续的数，把他们的出现次数加起来就是要找的子串长度了。每个整数出现了多少次用哈希表来保存。

```cpp
class Solution {
public:
    int findLHS(vector<int>& nums) {
        unordered_map<int, int> existTimes;
        for (auto i : nums) {
            existTimes[i]++;
        }
        
        int ans = 0;
        for (auto &iter : existTimes) {
            if (existTimes.count(iter.first + 1)) {
                ans = max(ans, iter.second + existTimes[iter.first + 1]);
            }
        }
        return ans;
    }
};
```

