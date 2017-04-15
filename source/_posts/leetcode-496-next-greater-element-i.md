---
title: LeetCode 496. Next Greater Element I
tags:
  - CPP
  - LeetCode
  - 算法
  - 贪心
url: 1125.html
id: 1125
categories:
  - LeetCode
date: 2017-02-13 17:21:06
---
题目描述：

> You are given two arrays **(without duplicates)** `nums1` and `nums2` where `nums1`’s elements are subset of `nums2`. Find all the next greater numbers for `nums1`'s elements in the corresponding places of `nums2`.
>
> The Next Greater Number of a number **x** in `nums1` is the first greater number to its right in `nums2`. If it does not exist, output -1 for this number.
>
> **Example 1:**
>
> ```
> Input: nums1 = [4,1,2], nums2 = [1,3,4,2].
> Output: [-1,3,-1]
> Explanation:
>     For number 4 in the first array, you cannot find the next greater number for it in the second array, so output -1.
>     For number 1 in the first array, the next greater number for it in the second array is 3.
>     For number 2 in the first array, there is no next greater number for it in the second array, so output -1.
>
> ```
>
> **Example 2:**
>
> ```
> Input: nums1 = [2,4], nums2 = [1,2,3,4].
> Output: [3,-1]
> Explanation:
>     For number 2 in the first array, the next greater number for it in the second array is 3.
>     For number 4 in the first array, there is no next greater number for it in the second array, so output -1.
>
> ```
>
> **Note:**
>
> 1. All elements in `nums1` and `nums2` are unique.
> 2. The length of both `nums1` and `nums2` would not exceed 1000.

使用双重循环即可。先搜索数值，再向后搜索比它大的第一个值。

```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& findNums, vector<int>& nums) {
        vector<int> ans;
        for (auto toFind : findNums) {
            for (int i = 0; i < nums.size(); i++) {
                if (nums[i] == toFind) {
                    int j;
                    for (j = i + 1; j < nums.size() && nums[j] <= toFind; j++) ;
                    if (j < nums.size()) ans.push_back(nums[j]);
                    else ans.push_back(-1);
                }
            }
        }
        return ans;
    }
};
```

