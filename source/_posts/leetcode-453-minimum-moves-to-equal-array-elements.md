---
title: LeetCode 453. Minimum Moves to Equal Array Elements
tags:
  - CPP
  - LeetCode
  - 算法
url: 955.html
id: 955
categories:
  - LeetCode
date: 2016-11-07 12:30:12
---
题目描述:

> Given a **non-empty** integer array of size *n*, find the minimum number of moves required to make all array elements equal, where a move is incrementing *n* - 1 elements by 1.
>
> **Example:**
>
> ```
> Input:
> [1,2,3]
>
> Output:
> 3
>
> Explanation:
> Only three moves are needed (remember each move increments two elements):
>
> [1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
> ```

有很多种move的策略, 可以任意选择一种. 我的办法是:

1. 找到当前的最小值与最大值
2. 增加除了该最大值以外的其他元素, 直到最小值与最大值相等
3. 如果没有全部相等则回到第一步, 否则结束

这样的话总的move次数应该为每个元素与最小元素之差的和. 

```cpp
class Solution {
public:
    int minMoves(vector<int>& nums) {
        int ans = 0, nMin = INT_MAX;
        for(auto i : nums){
            nMin = min(nMin, i);
        }
        for(auto i : nums){
            ans += (i - nMin);
        }
        return ans;
    }
};
```

