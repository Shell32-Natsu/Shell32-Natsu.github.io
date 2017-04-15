---
title: LeetCode 47. Permutations II
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
  - 递归
url: 519.html
id: 519
categories:
  - LeetCode
date: 2016-07-30 16:56:29
---
题目描述:

> Given a collection of numbers that might contain duplicates, return all possible unique permutations.
>
> For example,
> `[1,1,2]` have the following unique permutations:
>
>     [
>       [1,1,2],
>       [1,2,1],
>       [2,1,1]
>     ]

与上一题[46. Permutations](http://xiadong.info/2016/07/leetcode-46-permutations/)类似, 只不过输入集合中可能有重复数字, 而输出要求没有重复. 所以先对输入序列进行排序, 然后每次递归时跳过多次出现的数字中除了第一个数字以外的数.

    class Solution {
        vector<vector<int>> ret;
        int numsLen;
    public:
        vector<vector<int>> permuteUnique(vector<int>& nums) {
            sort(nums.begin(), nums.end());
            vector<bool> flag(nums.size(), false);
            vector<int> p;
            numsLen = nums.size();
            for(int i = 0; i < numsLen; i++){
                if(i > 0 && nums[i] == nums[i - 1]) continue;
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
                if(i > 0 && nums[i] == nums[i - 1] && !flag[i - 1]) continue;
                flag[i] = true;
                p.push_back(nums[i]);
                permute(nums, flag, p, lastLen - 1);
                p.pop_back();
                flag[i] = false;
            }
        }
    };