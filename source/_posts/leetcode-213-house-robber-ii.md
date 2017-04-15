---
title: LeetCode 213. House Robber II
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 1107.html
id: 1107
categories:
  - LeetCode
date: 2017-01-19 17:49:01
---
题目描述：

> **Note:** This is an extension of [House Robber](https://leetcode.com/problems/house-robber/).
>
> After robbing those houses on that street, the thief has found himself a new place for his thievery so that he will not get too much attention. This time, all houses at this place are **arranged in a circle.** That means the first house is the neighbor of the last one. Meanwhile, the security system for these houses remain the same as for those in the previous street.
>
> Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight **without alerting the police**.

在[House Robber](http://xiadong.info/2016/11/leetcode-198-house-robber/)的简单DP基础上考虑首尾也是相邻的。我把第一个house是否rob分开来进行了两次DP，然后根据最后一个house有没有被抢来从中选择正确的结果。

```cpp
class Solution {
public:
	int rob(vector<int>& nums) {
		if (nums.empty()) return 0;
		else if (nums.size() == 1) return nums[0];
		else if (nums.size() == 2) {
			return max(nums[0], nums[1]);
		}
		vector<int> v(nums.size(), 0);
		vector<bool> robbed(nums.size(), false);
		v[0] = nums[0];
		robbed[0] = true;
		v[1] = v[0];
		for (int i = 2; i < nums.size(); i++) {
			if (nums[i] + v[i - 2] > v[i - 1]) {
				v[i] = nums[i] + v[i - 2];
				robbed[i] = true;
				robbed[i - 1] = false;
				robbed[i - 2] = true;
			}
			else {
				v[i] = v[i - 1];
				robbed[i - 1] = true;
				robbed[i - 2] = false;
			}
		}
		bool lastRobbed = robbed.back();
		int firstRobbedMax = v.back(), firstRobbedLastNotMax3 = v[v.size() - 3], firstRobbedLastNotMax2 = v[v.size() - 2];
		v[0] = 0;
		robbed[0] = false;
		v[1] = nums[1];
		robbed[1] = true;
		for (int i = 2; i < nums.size(); i++) {
			if (nums[i] + v[i - 2] > v[i - 1]) {
				v[i] = nums[i] + v[i - 2];
				robbed[i] = true;
			}
			else {
				v[i] = v[i - 1];
			}
		}
		int firstNotRobbedMax = v.back();
		if (firstRobbedMax > firstNotRobbedMax && !lastRobbed) return firstRobbedMax;
		else return max(firstNotRobbedMax, max(firstRobbedLastNotMax3, firstRobbedLastNotMax2));
	}
};
```

