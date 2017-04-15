---
title: LeetCode 33. Search in Rotated Sorted Array
tags:
  - CPP
  - LeetCode
  - 搜索
  - 算法
url: 477.html
id: 477
categories:
  - LeetCode
date: 2016-07-24 18:52:59
---
题目描述:

> Suppose a sorted array is rotated at some pivot unknown to you beforehand.
> 
> (i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).
> 
> You are given a target value to search. If found in the array return its index, otherwise return -1.
> 
> You may assume no duplicate exists in the array.

首先找到有序序列平移了多少位, 然后根据target在哪个范围内使用二分搜索.

    class Solution {
    public:
        int search(vector<int>& nums, int target) {
            if(nums.empty()) return -1;
            int start = 0, end = nums.size();
            for(int i = 0; i < nums.size() - 1; i++){
                if(nums[i] > nums[i + 1]){
                    start = i + 1;
                    break;
                }
            }
            if(target < nums[0]){
                return binSearch(nums, start, nums.size(), target);
            }
            else{
                return binSearch(nums, 0, start ? start : nums.size(), target);
            }
        }
        
        int binSearch(vector<int> &nums, int left, int right, int target){
            int low = left, high = right, mid = (low + high) / 2;
            while(low < high){
                if(nums[mid] == target)
                    return mid;
                else if(nums[mid] > target)
                    high = mid;
                else
                    low = mid + 1;
                
                mid = (low + high) / 2;
            }
            return -1;
        }
    };