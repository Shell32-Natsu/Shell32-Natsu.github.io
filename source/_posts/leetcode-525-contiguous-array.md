---
title: LeetCode 525. Contiguous Array
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
url: 1146.html
id: 1146
categories:
  - LeetCode
date: 2017-03-03 22:12:57
---
题目描述：

> Given a binary array, find the maximum length of a contiguous subarray with equal number of 0 and 1.
>
> **Example 1:**
>
> ```
> Input: [0,1]
> Output: 2
> Explanation: [0, 1] is the longest contiguous subarray with equal number of 0 and 1.
>
> ```
>
> **Example 2:**
>
> ```
> Input: [0,1,0]
> Output: 2
> Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
>
> ```
>
> **Note:** The length of the given binary array will not exceed 50,000.

这道题一看上去我想到了贪心orDP的方向，但是可以用哈希表来解决。思考的关键在于连续子数组中含有相同数目的0和1会具有什么样的特征，另外一点要考虑的是数据规模。数据规模达到50000，说明解法是小于O(n^2)的，而通过对数组一次遍历可以得到的结果有从数组开始到某一个下标为止所包含的0和1的个数。

如果一个连续子数组`[i:j]`中的0和1数目相等，那么子数组`[0:i]`和`[0:j]`中的0的个数与1的个数之差是相等的。因此对于每一个差值记录最小的下标，当再次出现这个差值时，两个下标之间的子数组就含有相同的0和1.

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        unordered_map<int, int> diff;
        int cnt[2] = {0, 0};
        int ans = 0;
        diff[0] = -1;
        for (int i = 0; i < nums.size(); i++) {
            cnt[nums[i]]++;
            int t = cnt[0] - cnt[1];
            if (diff.count(t)) {
                ans = max(ans, i - diff[t]);
            }
            else {
                diff[t] = i;
            }
        }
        return ans;
    }
};
```

