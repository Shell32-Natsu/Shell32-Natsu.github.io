---
title: LeetCode 55. Jump Game
tags:
  - CPP
  - LeetCode
  - 算法
url: 550.html
id: 550
categories:
  - LeetCode
date: 2016-08-03 16:52:12
---
题目描述:

>Given an array of non-negative integers, you are initially positioned at the first index of the array.
>
>Each element in the array represents your maximum jump length at that position.
>
>Determine if you are able to reach the last index.
>
>For example:
>
>A = [2,3,1,1,4], return true.
>
>A = [3,2,1,0,4], return false.

数组中的每个元素表示从当前下标可以向前跳的距离, 返回能不能到达最后一个下标. 从第一个元素开始记录从当前元素能到达的最远的下标值, 对之后的每个元素更新这个值, 如果该值小于当前下标则说明该下标无法到达.

    class Solution {
    public:
        bool canJump(vector<int>& nums) {
            int farthest = nums[0], i;
            for(i = 1; i < nums.size() && farthest >= i; i++){
                farthest = max(farthest, nums[i] + i);
            }
            if(farthest >= nums.size() - 1)
                return true;
            else
                return false;
        }
    };