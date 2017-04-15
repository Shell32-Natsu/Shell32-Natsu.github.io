---
title: LeetCode 495. Teemo Attacking
tags:
  - CPP
  - LeetCode
  - 算法
url: 1117.html
id: 1117
categories:
  - CPP
date: 2017-02-03 18:30:03
---
题目描述：

> In LLP world, there is a hero called Teemo and his attacking can make his enemy Ashe be in poisoned condition. Now, given the Teemo's attacking **ascending** time series towards Ashe and the poisoning time duration per Teemo's attacking, you need to output the total time that Ashe is in poisoned condition.
>
> You may assume that Teemo attacks at the very beginning of a specific time point, and makes Ashe be in poisoned condition immediately.
>
> **Example 1:**
>
> ```
> Input: [1,4], 2
> Output: 4
> Explanation: At time point 1, Teemo starts attacking Ashe and makes Ashe be poisoned immediately. 
> This poisoned status will last 2 seconds until the end of time point 2. 
> And at time point 4, Teemo attacks Ashe again, and causes Ashe to be in poisoned status for another 2 seconds. 
> So you finally need to output 4.
>
> ```
>
> **Example 2:**
>
> ```
> Input: [1,2], 2
> Output: 3
> Explanation: At time point 1, Teemo starts attacking Ashe and makes Ashe be poisoned. 
> This poisoned status will last 2 seconds until the end of time point 2. 
> However, at the beginning of time point 2, Teemo attacks Ashe again who is already in poisoned status. 
> Since the poisoned status won't add up together, though the second poisoning attack will still work at time point 2, it will stop at the end of time point 3. 
> So you finally need to output 3.
>
> ```
>
> **Note:**
>
> 1. You may assume the length of given time series array won't exceed 10000.
> 2. You may assume the numbers in the Teemo's attacking time series and his poisoning time duration per attacking are non-negative integers, which won't exceed 10,000,000.

*提莫队长，正在送命！*

题目比较简单，就是debuff状态时间不会叠加，每次击中目标后重新开始计时，要求返回总的debuff时间。只要每次判断与上一次攻击后的生效时间是否有重合，有的话就减去重合部分即可。

```cpp
class Solution {
public:
    int findPoisonedDuration(vector<int>& timeSeries, int duration) {
        int ans = 0;
        if (timeSeries.empty()) return ans;
        ans = duration;
        for (int i = 1; i < timeSeries.size(); i++) {
            if (timeSeries[i] >= timeSeries[i - 1] + duration) {
                ans += duration;
            }
            else {
                ans += (timeSeries[i] - timeSeries[i - 1]);
            }
        }
        return ans;
    }
};
```

