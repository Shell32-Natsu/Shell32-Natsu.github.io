---
title: LeetCode 410. Split Array Largest Sum
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 算法
url: 844.html
id: 844
categories:
  - LeetCode
date: 2016-10-05 16:45:06
---
题目描述:

> Given an array which consists of non-negative integers and an integer *m*, you can split the array into *m* non-empty continuous subarrays. Write an algorithm to minimize the largest sum among these *m* subarrays.
>
> **Note:**
> Given *m* satisfies the following constraint: 1 ≤ m ≤ length(nums) ≤ 14,000.
>
> **Examples:**
>
> ```
> Input:
> nums = [7,2,5,10,8]
> m = 2
>
> Output:
> 18
>
> Explanation:
> There are four ways to split nums into two subarrays.
> The best way is to split it into [7,2,5] and [10,8],
> where the largest sum among the two subarrays is only 18.
> ```

这道题我是采用二分搜索的方法解的. 虽然要想到对整个int型范围进行二分搜索还是不太容易, 但是只要想到这一点, 问题就基本解决了, 剩下的就可以通过贪心来判断数组能不能被分成m个并且保证最大的和不超过一个给定的值. 二分搜索上界是INT_MAX, 而下界是数组中的最大值.

```cpp
class Solution {
public:
    int splitArray(vector<int>& nums, int m) {
        int len = nums.size();
        int maxElement = 0;
        for(auto i : nums){
            maxElement = max(maxElement, i);
        }
        long long left = maxElement, right = INT_MAX, mid = (left + right) / 2;
        while(left < right){
            if(canSplit(nums, mid, m)){
                right = mid;
            }
            else{
                left = mid + 1;
            }
            mid = (left + right) / 2;
        }
        return left;
    }
    
    bool canSplit(vector<int> &nums, long long target, int m){
        long long sum = 0;
        int splitArrs = 0;
        for(int i = 0; i < nums.size() && splitArrs <= m; i++){
            if(sum + nums[i] > target){
                sum = nums[i];
                splitArrs++;
            }
            else if(sum + nums[i] == target){
                sum = 0;
                splitArrs++;
            }
            else{
                sum += nums[i];
            }
        }
        if(sum > 0) splitArrs++;
        return splitArrs <= m;
    }
};
```

