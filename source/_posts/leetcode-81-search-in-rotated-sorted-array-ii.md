---
title: LeetCode 81. Search in Rotated Sorted Array II
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 算法
url: 625.html
id: 625
categories:
  - LeetCode
date: 2016-08-14 16:15:49
---
题目描述:

> Follow up for "Search in Rotated Sorted Array":
> What if *duplicates* are allowed?
>
> Would this affect the run-time complexity? How and why?
>
> Write a function to determine if a given target is in the array.

仍然使用二分搜索, 数组中可能出现重复元素并没有什么影响.

```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int mid = nums.size();
        for(int i = 0; i < nums.size() - 1; i++){
            if(nums[i] > nums[i + 1]){
                mid = i + 1;
                break;
            }
        }
        if(target == nums[0]) return true;
        else if(target > nums[0]) return binSearch(nums, 0, mid, target);
        else return binSearch(nums, mid, nums.size(), target);
    }
    
    bool binSearch(vector<int> &nums, int left, int right, int target){
        int mid = (left + right) / 2;
        while(left < right){
            if(nums[mid] == target){
                return true;
            }
            else if(nums[mid] < target){
                left = mid + 1;
            }
            else{
                right = mid;
            }
            mid = (left + right) / 2;
        }
        return false;
    }
};
```

