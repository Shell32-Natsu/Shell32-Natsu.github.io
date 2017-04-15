---
title: LeetCode 18. 4Sum
url: 424.html
id: 424
categories:
  - LeetCode
date: 2016-07-16 23:13:31
tags:
---
题目描述:

> Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
>
> Note: The solution set must not contain duplicate quadruplets.
>
>     For example, given array S = [1, 0, -1, 0, -2, 2], and target = 0.
> 
>     A solution set is:
>     [
>       [-1,  0, 0, 1],
>       [-2, -1, 1, 2],
>       [-2,  0, 0, 2]
>     ]

这道题可以继续使用2Sum, 3Sum题目的方法, 在3Sum外面再增加一次处理. 还有另外一种使用HashMap的方法, 但是我现在还没有完全实现它, 主要问题在于最后的去重. 更多的信息可以参考这里:<http://www.sigmainfy.com/blog/summary-of-ksum-problems.html>.

我的代码, 效率并不高:

    class Solution {
        vector<vector<int>> fourSumRet;
    public:
        vector<vector<int>> fourSum(vector<int>& nums, int target) {
            sort(nums.begin(), nums.end());
            for(int i = 0; i < nums.size(); i++){
                if(i >= 1 && nums[i] == nums[i - 1]) continue;
                if(target > 0 && nums[i] > target) break;
                threeSum(nums, target - nums[i], i + 1, nums.size());
            }
            return fourSumRet;
        }
        
        void threeSum(vector<int>& nums, int target, int left, int right) {
            for(int i = left; i < right; i++){
                if(i >= left + 1 && nums[i] == nums[i - 1]) continue;
                twoSum(nums, target - nums[i], i + 1, right, left - 1);
            }
        }
        
        void twoSum(vector<int>& nums, int target, int left, int right, int fourSumIndex) {
            int l = left, r = right - 1;
            while(l < r){
                int sum = nums[l] + nums[r];
                if(sum == target){
                    vector<int> t = {nums[fourSumIndex], nums[left - 1], nums[l], nums[r]};
                    fourSumRet.push_back(t);
                    do{r--;}while(nums[r] == nums[r + 1]);
                    do{l++;}while(nums[l] == nums[l - 1]);
                }
                else if(sum > target){
                    r--;
                }
                else{
                    l++;
                }
            }
        }
    };