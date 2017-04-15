---
title: LeetCode 441. Arranging Coins
tags:
  - CPP
  - LeetCode
  - 算法
url: 919.html
id: 919
categories:
  - LeetCode
date: 2016-10-31 16:17:51
---
 题目描述:

> You have a total of *n* coins that you want to form in a staircase shape, where every *k*-th row must have exactly *k* coins.
>
> Given *n*, find the total number of **full** staircase rows that can be formed.
>
> *n* is a non-negative integer and fits within the range of a 32-bit signed integer.
>
> **Example 1:**
>
> ```
> n = 5
>
> The coins can form the following rows:
> ¤
> ¤ ¤
> ¤ ¤
>
> Because the 3rd row is incomplete, we return 2.
>
> ```
>
> **Example 2:**
>
> ```
> n = 8
>
> The coins can form the following rows:
> ¤
> ¤ ¤
> ¤ ¤ ¤
> ¤ ¤
>
> Because the 4th row is incomplete, we return 3.
> ```

等差数列的问题, 前m行共有
$$
\frac{m(m+1)}{2}
$$
个硬币, 共有n个硬币, 那么应该找出最大的m满足
$$
\frac{m(m+1)}{2} \le n \rightarrow m^2+m-2n \le 0
$$
因为m是正整数, 所以
$$
m \le \frac{-1+\sqrt{1+8n}}{2}
$$


```cpp
class Solution {
public:
    int arrangeCoins(int n) {
        return (sqrt((long long)n * 8 + 1) - 1.0) / 2;
    }
};
```

