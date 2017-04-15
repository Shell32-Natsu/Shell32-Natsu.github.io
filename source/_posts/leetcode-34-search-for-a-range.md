---
title: LeetCode 34. Search for a Range
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 搜索
  - 算法
url: 484.html
id: 484
categories:
  - LeetCode
date: 2016-07-25 20:48:12
---
题目描述:

> Given a sorted array of integers, find the starting and ending position of a given target value.
> 
> Your algorithm's runtime complexity must be in the order of O(log n).
> 
> If the target is not found in the array, return [-1, -1].
> 
> For example,
> Given `[5, 7, 7, 8, 8, 10]` and target value 8,
> return `[3, 4]`.

先使用二分搜索查找到目标, 再向前后搜索到数值的起始位置.

    class Solution {
    public:
        vector<int> searchRange(vector<int>& nums, int target) {
            int left = 0, right = nums.size();
            while(left < right){
                int mid = left + (right - left) / 2;
                if(nums[mid] == target){
                    vector<int> ret = {mid, mid};
                    while(ret[0] >= 0 && nums[ret[0]] == target) ret[0]--;
                    while(ret[1] < nums.size() && nums[ret[1]] == target) ret[1]++;
                    ret[0]++;
                    ret[1]--;
                    return ret;
                }
                else if(nums[mid] > target){
                    right = mid;
                }
                else{
                    left = mid + 1;
                }
            }
            return vector<int>(2, -1);
        }
    };