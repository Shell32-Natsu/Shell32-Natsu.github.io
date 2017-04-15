---
title: LeetCode 46. Permutations
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
  - 递归
url: 517.html
id: 517
categories:
  - LeetCode
date: 2016-07-30 16:45:22
---
﻿题目描述:

>Given a collection of distinct numbers, return all possible permutations.
>
>For example,
>
>     [1,2,3] have the following permutations:
>     [
>       [1,2,3],
>       [1,3,2],
>       [2,1,3],
>       [2,3,1],
>       [3,1,2],
>       [3,2,1]
>     ]

使用递归来创建所有排列.

    class Solution {
        vector<vector<int>> ret;
        int numsLen;
    public:
        vector<vector<int>> permute(vector<int>& nums) {
            vector<bool> flag(nums.size(), false);
            vector<int> p;
            numsLen = nums.size();
            for(int i = 0; i < numsLen; i++){
                flag[i] = true;
                p.push_back(nums[i]);
                permute(nums, flag, p, nums.size() - 1);
                p.pop_back();
                flag[i] = false;
            }
            return ret;
        }
        
        void permute(vector<int>& nums, vector<bool> &flag, vector<int> &p, int lastLen){
            if(lastLen == 0){
                ret.push_back(p);
                return;
            }
            for(int i = 0; i < numsLen; i++){
                if(flag[i]) continue;
                flag[i] = true;
                p.push_back(nums[i]);
                permute(nums, flag, p, lastLen - 1);
                p.pop_back();
                flag[i] = false;
            }
        }
    };