---
title: LeetCode 121. Best Time to Buy and Sell Stock
tags:
  - CPP
  - LeetCode
  - 算法
url: 747.html
id: 747
categories:
  - LeetCode
date: 2016-09-11 17:58:47
---
题目描述:

> Say you have an array for which the *i*th element is the price of a given stock on day *i*.
>
> If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.
>
> **Example 1:**
>
> ```
> Input: [7, 1, 5, 3, 6, 4]
> Output: 5
>
> max. difference = 6-1 = 5 (not 7-1 = 6, as selling price needs to be larger than buying price)
>
> ```
>
> **Example 2:**
>
> ```
> Input: [7, 6, 4, 3, 1]
> Output: 0
>
> In this case, no transaction is done, i.e. max profit = 0.
> ```

这道题我一开始看错了题意. 它的意思是只允许一次买入卖出操作或者没有操作, 所以只要找到相差最大的两个价格并且低价在高价之前就可以了. 从前往后遍历一次数组, 记录到目前为止的最低价格, 然后再记录一个差额的最大值就可以了. 时间复杂度O(n)

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if(prices.size() < 2) return 0;
        int lowest = prices[0];
        int profit = 0;
        for(int i = 1; i < prices.size(); i++){
            if(lowest > prices[i]){
                lowest = prices[i];
            }
            else{
                profit = max(profit, prices[i] - lowest);
            }
        }
        return profit;
    }
};
```

