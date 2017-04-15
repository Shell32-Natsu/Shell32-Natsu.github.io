---
title: LeetCode 209. Minimum Size Subarray Sum
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 1053.html
id: 1053
categories:
  - LeetCode
date: 2017-01-02 18:21:33
---
题目描述：

> Given an array of **n** positive integers and a positive integer **s**, find the minimal length of a subarray of which the sum ≥ **s**. If there isn't one, return 0 instead.
>
> For example, given the array `[2,3,1,2,4,3]` and `s = 7`,
> the subarray `[4,3]` has the minimal length under the problem constraint.

使用双指针。因为都是正数，所以子串的长度越长和越大。先增大右指针直到`[left,right]`中的元素的和>=s，然后从中依次去掉开头的数，也就是left增大，直到和不再>=s，更新最短长度。然后再次增大右指针进入下一个循环。

```cpp
class Solution {
public:
    int minSubArrayLen(int s, vector<int>& nums) {
        if(nums.empty()) return 0;
        int left = 0, minSum = 0, minLen = INT_MAX, curSum = 0;
        for(int i = 0; i < nums.size(); i++){
            if(i - left + 1 > minLen){
                curSum -= nums[left++];
            }
            curSum += nums[i];
            if(curSum >= s){
                for(; left <= i && curSum >= s; left++){
                    curSum -= nums[left];
                }
                minLen = i - left + 2;
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};
```

