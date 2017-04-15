---
title: LeetCode 485. Max Consecutive Ones
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 1093.html
id: 1093
categories:
  - LeetCode
date: 2017-01-15 13:53:04
---
题目描述：

> Given a binary array, find the maximum number of consecutive 1s in this array.
>
> **Example 1:**
>
> ```
> Input: [1,1,0,1,1,1]
> Output: 3
> Explanation: The first two digits or the last three digits are consecutive 1s.
>     The maximum number of consecutive 1s is 3.
>
> ```
>
> **Note:**
>
> - The input array will only contain `0` and `1`.
> - The length of input array is a positive integer and will not exceed 10,000

最长的连续1的个数。很简单，方法也很多。一开始在最后加一个0是为了方便结尾的处理。

```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        nums.push_back(0);
        int maxNum = 0;
        int beginIndex = -1;
        for (int i = 0; i < nums.size(); i++) {
            if(nums[i] == 1 && beginIndex == -1){
                beginIndex = i;
            }
            else if(nums[i] == 0){
                if(beginIndex != -1){
                    maxNum = max(maxNum, i - beginIndex);
                }
                beginIndex = -1;
            }
        }
        return maxNum;
    }
};
```

