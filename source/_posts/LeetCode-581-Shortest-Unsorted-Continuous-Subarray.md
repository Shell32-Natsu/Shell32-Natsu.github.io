---
title: LeetCode 581. Shortest Unsorted Continuous Subarray
date: 2017-08-04 17:27:43
tags:
 - LeetCode
 - CPP
 - 算法
 - 排序
 - 栈
categories:
 - LeetCode
---

Given an integer array, you need to find one **continuous subarray** that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order, too.

You need to find the **shortest** such subarray and output its length.

**Example 1:**

```
Input: [2, 6, 4, 8, 10, 9, 15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.

```

**Note:**

1. Then length of the input array is in range [1, 10,000].
2. The input array may contain duplicates, so ascending order here means **<=**.

<!-- more -->

----------------

这道题最直观的解法就是排序，对输入数组排序之后分别从两段向中间查找，直到出现与有序数组不同的元素就停下来，去掉两端的有序数组，中间就是我们要找的子数组。

```cpp
class Solution {
public:
    int findUnsortedSubarray(vector<int>& nums) {
        int left, right;
        vector<int> order_nums = nums;
        sort(order_nums.begin(), order_nums.end());
        
        for (left = 0; left < order_nums.size(); left++) {
            if (order_nums[left] != nums[left]) break;
        }
        
        for (right = order_nums.size() - 1; right >= 0; right--) {
            if (order_nums[right] != nums[right]) break;
        }
        
        if (right <= left) return 0;
        else return right - left + 1;
    }
};
```

接下来是使用栈的解法，这个解法的核心思想是左边的不用排序的子串的结尾后一个元素的位置是不对的，我们应该找到这个元素。首先建立一个栈，从左边开始依次按升序入栈，当出现下一个元素小于栈顶时，不断弹出栈顶元素直到栈顶小于下一个元素，假设此时栈的长度为L， 那么L就是这个左边的合法子串的长度，重复这个操作，记录最小的L。对于右边同理。

```cpp
class Solution {
public:
    int findUnsortedSubarray(vector<int>& nums) {
        int left = nums.size(), right = nums.size();
        vector<int> stack;
        for (int i = 0; i < nums.size(); i++) {
            if (stack.empty() || nums[i] >= stack.back()) stack.push_back(nums[i]);
            else {
                while(!stack.empty() && stack.back() > nums[i]) stack.pop_back();
                left = min(left, (int)stack.size());
                stack.push_back(nums[i]);
            }
        }
        stack.clear();
        for (int i = nums.size() - 1; i >= 0; i--) {
            if (stack.empty() || nums[i] <= stack.back()) stack.push_back(nums[i]);
            else {
                while(!stack.empty() && stack.back() < nums[i]) stack.pop_back();
                right = min(right, (int)stack.size());
                stack.push_back(nums[i]);
            }
        }
        
        if (left + right > nums.size()) return 0;
        return nums.size() - left - right;
    }
};
```

