---
title: LeetCode 80. Remove Duplicates from Sorted Array II
tags:
  - CPP
  - LeetCode
  - 算法
url: 623.html
id: 623
categories:
  - LeetCode
date: 2016-08-13 17:30:25
---
题目描述:

> Follow up for "Remove Duplicates":
> What if duplicates are allowed at most *twice*?
>
> For example,
> Given sorted array *nums* = `[1,1,1,2,2,3]`,
>
> Your function should return length = `5`, with the first five elements of *nums* being `1`, `1`, `2`, `2` and `3`. It doesn't matter what you leave beyond the new length.

O(n)空间复杂度, O(n)时间复杂度的方法是使用另一个数组来保存去除超过两个重复元素之后的结果.

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size() < 2)
            return nums.size();
        int tp = 1;
        vector<int> t = {nums[0], nums[1]};
        t.resize(nums.size());
        for(int np = 2; np < nums.size(); np++){
            if(t[tp] < nums[np] || (t[tp] == nums[np] && t[tp - 1] < nums[np])){
                t[++tp] = (nums[np]);
            }
        }
        swap(nums, t);
        return tp + 1;
    }
};
```

而不使用辅助空间则是直接删除vector中对应位置的元素, 虽然这会使vector中之后的元素都前移一位, 但是在实际的测试中这种方法还快一点, 上一种方法是20ms, 而这种是16ms.....

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size() < 2)
            return nums.size();
        int val = nums[0], dup = 1;
        for(int i = 1; i < nums.size(); i++){
            if(nums[i] > nums[i - 1]){
                val = nums[i];
                dup = 1;
            }
            else if(dup == 2){
                nums.erase(nums.begin() + i);
                i--;
            }
            else{
                dup++;
            }
        }
        return nums.size();
    }
};
```

