---
title: LeetCode 414. Third Maximum Number
tags:
  - CPP
  - LeetCode
  - 算法
url: 915.html
id: 915
categories:
  - LeetCode
date: 2016-10-29 17:52:23
---
题目描述:

> Given a **non-empty** array of integers, return the **third** maximum number in this array. If it does not exist, return the maximum number. The time complexity must be in O(n).
>
> **Example 1:**
>
> ```
> Input: [3, 2, 1]
>
> Output: 1
>
> Explanation: The third maximum is 1.
>
> ```
>
> **Example 2:**
>
> ```
> Input: [1, 2]
>
> Output: 2
>
> Explanation: The third maximum does not exist, so the maximum (2) is returned instead.
>
> ```
>
> **Example 3:**
>
> ```
> Input: [2, 2, 3, 1]
>
> Output: 1
>
> Explanation: Note that the third maximum here means the third maximum distinct number.
> Both numbers with value 2 are both considered as second maximum.
> ```

只要求保存前三个最大的数(不重复), 所以可以在遍历过程中维护已经遍历过的元素中最大的三个值. 由于有可能不重复的数值不足三个, 所以还要记录已经保存的最大元素的个数.

```cpp
class Solution {
public:
    int thirdMax(vector<int>& nums) {
        int max1, max2, max3;
        max1 = max2 = max3 = INT_MIN;
        int num = 0;
        for(auto i : nums){
            if((i == max1 && num > 0) || 
               (i == max2 && num > 1) || 
               (i == max3 && num > 2)) 
                continue;
            if(num == 0 || i > max1){
                max3 = max2;
                max2 = max1;
                max1 = i;
            }
            else if(num == 1 || i > max2){
                max3 = max2;
                max2 = i;
            }
            else if(num == 2 || i > max3){
                max3 = i;
            }
            num = min(num + 1, 3);
        }
        if(num == 3) return max3;
        return max1;
    }
};
```

