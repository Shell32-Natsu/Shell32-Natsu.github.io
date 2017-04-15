---
title: LeetCode 16. 3Sum Closest
url: 411.html
id: 411
categories:
  - LeetCode
date: 2016-07-15 17:06:33
tags:
---
题目描述:

> Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. Return the sum of the three integers. You may assume that each input would have exactly one solution.
> 
>     For example, given array S = {-1 2 1 -4}, and target = 1.
>     The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

首先这是一个3Sum问题, 因此仍然先使用上一道题目的思路, 用双指针实现2Sum, 用target - nums[i]作为2Sum的target. 接下来的问题就是**closest**的问题了, 我的办法是遍历所有的2Sum组合(只需要遍历下标在i之后的元素), 找到最接近target - nums[i]的组合. 当三个数的和与target差距为0时也可以退出循环, 否则直到i等于nums.size() - 1为止.

    class Solution {
    public:
        int threeSumClosest(vector<int>& nums, int target) {
            sort(nums.begin(), nums.end());
            int minLen = INT_MAX, ret;
            for(int i = 0; i < nums.size(); i++){
                int oldMinLen = minLen;
                int sum = twoSum(nums, target - nums[i], i + 1, nums.size(), minLen);
                if(minLen < oldMinLen){
                    ret = sum + nums[i];
                }
                if(minLen == 0) break;
            }
            return ret;
        }
        
        int twoSum(vector<int>& nums, int target, int left, int right, int &minLen) {
            int l = left, r = right - 1;
            int ret;
            while(l < r){
                int sum = nums[l] + nums[r];
                if(sum == target){
                    ret = sum;
                    minLen = 0;
                    break;
                }
                else if(sum > target){
                    r--;
                }
                else{
                    l++;
                }
                int len = lenBetweenInt(sum, target);
                if(len < minLen){
                    minLen = len;
                    ret = sum;
                }
            }
            return ret;
        }
        
        int lenBetweenInt(int a, int b){
            return abs(a - b);
        }
    };