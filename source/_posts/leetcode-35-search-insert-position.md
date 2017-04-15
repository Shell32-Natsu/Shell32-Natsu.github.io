---
title: LeetCode 35. Search Insert Position
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 搜索
  - 算法
url: 486.html
id: 486
categories:
  - LeetCode
date: 2016-07-25 21:05:34
---
﻿题目描述:

> Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
> 
> You may assume no duplicates in the array.
> 
> Here are few examples.
> 
> `[1,3,5,6], 5 → 2`
> 
> `[1,3,5,6], 2 → 1`
> 
> `[1,3,5,6], 7 → 4`
> 
> `[1,3,5,6], 0 → 0`

二分查找先确定数组中存不存在target, 如果存在则返回它的下标, 如果不存在那么就看target是不是比nums中的所有元素都大, 如果是就返回最后一个元素的下标`nums.size()`, 接下来判断二分搜索的结束位置与target的关系, 如果比target大, 那么就返回结束位置, 如果比target小, 那么就返回结束位置 + 1.

    class Solution {
    public:
        int searchInsert(vector<int>& nums, int target) {
            int low = 0, high = nums.size();
            while(low < high){
                if(nums[(low + high) / 2] == target) return (low + high) / 2;
                else if(nums[(low + high) / 2] < target){
                    low = (low + high) / 2 + 1;
                }else{
                    high = (low + high) / 2;
                }
            }
            if(low == nums.size() || nums[low] > target)return low;
            else return low + 1;
        }
    };
