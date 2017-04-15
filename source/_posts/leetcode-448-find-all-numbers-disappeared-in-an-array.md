---
title: LeetCode 448. Find All Numbers Disappeared in an Array
tags:
  - CPP
  - LeetCode
  - 算法
url: 1058.html
id: 1058
categories:
  - LeetCode
date: 2017-01-09 18:25:45
---
题目描述：

> Given an array of integers where 1 ≤ a[i] ≤ *n* (*n* = size of array), some elements appear twice and others appear once.
>
> Find all the elements of [1, *n*] inclusive that do not appear in this array.
>
> Could you do it without extra space and in O(*n*) runtime? You may assume the returned list does not count as extra space.
>
> **Example:**
>
> ```
> Input:
> [4,3,2,7,8,2,3,1]
>
> Output:
> [5,6]
> ```

寻找没有出现过的数字，因为数组中的元素满足1 ≤ a[i] ≤ *n*，所以可以利用下标来保存一个数是否出现过，把一个数放到它对应的下标处，然后再找出哪些下标与元素不对应就是没有出现过的数。

```cpp
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        vector<int> ans;
        for(int i = 0; i < nums.size(); i++){
            if(nums[nums[i] - 1] != nums[i]){
                swap(nums[nums[i] - 1], nums[i]);
                i--;
            }
        }
        for(int i = 0; i < nums.size(); i++){
            if(nums[i] - 1 != i) ans.push_back(i + 1);
        }
        return ans;
    }
};
```

