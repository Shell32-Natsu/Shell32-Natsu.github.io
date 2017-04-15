---
title: LeetCode 15. 3Sum
url: 397.html
id: 397
categories:
  - LeetCode
date: 2016-07-13 20:05:32
tags:
---
题目描述:

> Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
> 
> Note: The solution set must not contain duplicate triplets.
> 
>     For example, given array S = [-1, 0, 1, 2, -1, -4],
> 
>     A solution set is:
>     [
>       [-1, 0, 1],
>       [-1, -1, 2]
>     ]

参考<http://xiadong.info/2016/07/1-two-sum/>Two Sum这道题, 我们可以先取得一个数n, 将-n作为target就变为了Two Sum问题, 代码如下:

    class Solution {
        vector<vector<int>> ret;
    public:
        vector<vector<int>> threeSum(vector<int>& nums) {
            sort(nums.begin(), nums.end());

            for(int i = 0; i < nums.size(); i++){
                if(i >= 1 && nums[i] == nums[i - 1]) continue;
                if(nums[i] > 0) break;
                twoSum(nums, -nums[i], i + 1, nums.size());
            }
            return ret;
        }
        
        void twoSum(vector<int>& nums, int target, int left, int right) {
            int l = left, r = right - 1;
            while(l < r){
                int sum = nums[l] + nums[r];
                if(sum == target){
                    vector<int> t = {-target, nums[l], nums[r]};
                    ret.push_back(t);
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