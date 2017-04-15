---
title: LeetCode 442. Find All Duplicates in an Array
tags:
  - CPP
  - LeetCode
  - 算法
url: 1062.html
id: 1062
categories:
  - LeetCode
date: 2017-01-09 18:45:18
---
题目描述：

> Given an array of integers, 1 ≤ a[i] ≤ *n* (*n* = size of array), some elements appear **twice** and others appear **once**.
>
> Find all the elements that appear **twice** in this array.
>
> Could you do it without extra space and in O(*n*) runtime?
>
> **Example:**
>
> ```
> Input:
> [4,3,2,7,8,2,3,1]
>
> Output:
> [2,3]
> ```

跟[LeetCode 448. Find All Numbers Disappeared in an Array](http://xiadong.info/2017/01/leetcode-448-find-all-numbers-disappeared-in-an-array/)类似，只不过这次是寻找出现过两次的数。我用0（输入数据中不会出现）来表示该数已经记录过来防止重复计数。

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> ans;
        for(int i = 0; i < nums.size(); i++){
            if(nums[nums[i] - 1] == 0 || nums[i] == i + 1){
                continue;
            }
            else if(nums[nums[i] - 1] != nums[i]){
                swap(nums[nums[i] - 1], nums[i]);
                i--;
            }
            else{
                ans.push_back(nums[i]);
                nums[nums[i] - 1] = 0;
            }
        }
        return ans;
    }
};
```

