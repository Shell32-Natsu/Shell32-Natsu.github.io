---
title: LeetCode 167. Two Sum II - Input array is sorted
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 890.html
id: 890
categories:
  - LeetCode
date: 2016-10-17 17:18:19
---
题目描述:

> Given an array of integers that is already **sorted in ascending order**, find two numbers such that they add up to a specific target number.
>
> The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.
>
> You may assume that each input would have exactly one solution.
>
> **Input:** numbers={2, 7, 11, 15}, target=9
> **Output:** index1=1, index2=2

输入数据是有序的反而更简单了, 两个指针从两端开始向中间移动就可以了.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int l = 0, r = numbers.size() - 1;
        vector<int> ans(2);
        while(true){
            if(numbers[l] + numbers[r] > target){
                r--;
            }
            else if(numbers[l] + numbers[r] < target){
                l++;
            }
            else{
                ans[0] = l + 1;
                ans[1] = r + 1;
                break;
            }
        }
        return ans;
    }
};
```

