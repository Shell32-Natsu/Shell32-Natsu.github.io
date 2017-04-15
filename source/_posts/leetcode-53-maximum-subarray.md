---
title: LeetCode 53. Maximum Subarray
tags:
  - CPP
  - LeetCode
  - 分治
  - 动态规划
  - 算法
url: 545.html
id: 545
categories:
  - LeetCode
date: 2016-08-02 19:00:59
---
题目描述:

>Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
>
>For example, given the array [−2,1,−3,4,−1,2,1,−5,4],
>the contiguous subarray [4,−1,2,1] has the largest sum = 6.

题目要求找出最大的连续子序列的和, 首先采用一种分治法. 对于一个数组, 把它中中间分成两半, 和最大的连续子序列可能出现在左半边, 可能出现在右半边, 也有可能出现跨越左右的情况. 对于在左半边或右半边的情况, 可以使用递归缩小问题, 对于跨越左右的情况, 可以使用线性算法来获得结果. 最后返回三个值中的最大值.

    class Solution {
    public:
        int maxSubArray(vector<int>& nums) {
            return maxSub(nums, 0, nums.size());
        }

        int maxSub(vector<int>& nums, int left, int right) {
            if (right - left == 1) {
                return nums[left];
            }
            int leftSum, rightSum, mid = (left + right) / 2;
            leftSum = maxSub(nums, left, mid);
            rightSum = maxSub(nums, mid, right);

            int midLeftSum = 0, midLeftMaxSum = INT_MIN, midRightSum = 0, midRightMaxSum = INT_MIN;
            for (int i = mid - 1; i >= left; i--) {
                midLeftSum += nums[i];
                if (midLeftSum > midLeftMaxSum) midLeftMaxSum = midLeftSum;
            }
            for (int i = mid; i < right; i++) {
                midRightSum += nums[i];
                if (midRightSum > midRightMaxSum) midRightMaxSum = midRightSum;
            }
            int midSum = midRightMaxSum + midLeftMaxSum;

            return max(midSum, max(leftSum, rightSum));
        }
    };

还可以使用动态规划法. 使用`dp[i]`来表示包含`nums[i]`的和最大的连续子串的和. 如果`dp[i-1]`是大于0的, 那么就可以加上`dp[i-1]`, 因为`nums[i]`是必须有的. 用另一种方式来说, 这个题目的主要问题在于和最大的连续子串中可能出现负数, 要考虑的是负数及负数之前的子串要不要加到当前子串中来, 而这个判断就是看以该负数结尾的连续子串的和是否大于0, 如果小于0则不能加进来, 大于0则可以.

    class Solution {
    public:
        int maxSubArray(vector<int>& nums) {
            vector<int> dp(nums.size(), 0);
            int ret = nums[0];
            dp[0] = nums[0];
            for(int i = 1; i < nums.size(); i++){
                dp[i] = dp[i - 1] > 0 ? dp[i - 1] + nums[i] : nums[i];
                if(ret < dp[i])
                    ret = dp[i];
            }
            return ret;
        }
    };