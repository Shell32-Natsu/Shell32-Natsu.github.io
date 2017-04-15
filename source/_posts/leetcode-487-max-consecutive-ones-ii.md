---
title: LeetCode 487. Max Consecutive Ones II
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 1095.html
id: 1095
categories:
  - LeetCode
date: 2017-01-15 14:01:19
---
题目描述：

> Given a binary array, find the maximum number of consecutive 1s in this array if you can flip at most one 0.
>
> **Example 1:**
>
> ```
> Input: [1,0,1,1,0]
> Output: 4
> Explanation: Flip the first zero will get the the maximum number of consecutive 1s.
>     After flipping, the maximum number of consecutive 1s is 4.
>
> ```
>
> **Note:**
>
> - The input array will only contain `0` and `1`.
> - The length of input array is a positive integer and will not exceed 10,000
>
> **Follow up:**
> What if the input numbers come in one by one as an **infinite stream**? In other words, you can't store all numbers coming from the stream as it's too large to hold in memory. Could you solve it efficiently?

这道题是上一题的升级版。区别在于可以把最多一个0视为1，再求最长的连续1的个数。

我的解法也延续上一题的思路使用双指针，不过这次增加一个变量来记录跳过了多少个0。需要注意的是`...100`这种情况，左指针（指向子串开头的位置）不能只简单地跳过所有1之后再加1，而应该继续跳过连续的0，这可能导致左指针超过右指针，所以这时要更新右指针。

```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
       int maxNum = 0;
       int p1 = 0, p2 = 0, zero = 1;
       for(; p2 < nums.size(); p2++){
           if(nums[p2] == 0) zero--;
           if(zero < 0){
               maxNum = max(maxNum, p2 - p1);
               while(p1 < nums.size() && nums[p1] != 0) p1++;
               while(p1 < nums.size() && nums[p1] != 1) {
                   p1++;
                   if(zero < 1) zero++;
               }
               if(p2 < p1) p2 = p1;
           }
       }
       maxNum = max(maxNum, (int)nums.size() - p1);
       return maxNum;
    }
};
```

