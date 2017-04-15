---
title: LeetCode 45. Jump Game II
tags:
  - CPP
  - LeetCode
  - 算法
url: 514.html
id: 514
categories:
  - LeetCode
date: 2016-07-30 16:22:20
---
问题描述:

> Given an array of non-negative integers, you are initially positioned at the first index of the array.
> 
> Each element in the array represents your maximum jump length at that position.
>
> Your goal is to reach the last index in the minimum number of jumps.
>
> For example:
> Given array A = [2,3,1,1,4]
>
> The minimum number of jumps to reach the last index is 2. (Jump 1 step from index 0 to 1, then 3 steps to the last index.)
>
> Note:
>
> You can assume that you can always reach the last index.

当走到`nums[i]`时, 遍历`[i + 1, i + nums[i]]`范围内的元素, 找到其中最大的值, 作为下一次循环的`i`. 对于只有一个元素的nums单独处理.

    class Solution {
    public:
        int jump(vector<int>& nums) {
            if(nums.size() == 1) return 0;
            int p = 0,step = 0;
            while(p + nums[p] < nums.size() - 1){
                step++;
                int nextP = -1, nextPPos = 0;
                for(int j = 1; j <= nums[p] && p + j < nums.size(); j++){
                    if(nums[p + j] + p + j > nextP){
                        nextP = nums[p + j] + p + j;
                        nextPPos = p + j;
                    }
                }
                p = nextPPos;
            }
            return step + 1;
        }
    };