---
title: LeetCode 123. Best Time to Buy and Sell Stock III
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 762.html
id: 762
categories:
  - LeetCode
date: 2016-09-15 18:34:31
---
题目描述:

> Say you have an array for which the *i*th element is the price of a given stock on day *i*.
>
> Design an algorithm to find the maximum profit. You may complete at most *two* transactions.
>
> **Note:**
> You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

这道题可以用一种我也不知道算不算动态规划的方法来解. 首先我们可以进行零次, 一次或者两次买入卖出操作, 零次或一次是之前的题目, 比较容易解决. 问题在于两次交易, 由于不能同时持有多个stock, 所以两次交易必须是前后发生的, 那么就可以用两个数组来分别记录[0,i]中获得能获得的最大收益和[i+1, n]中能获得的最大收益, 通过遍历i就可以得到前后两次交易的最大收益.

第一个数组通过遍历一次prices得到, 而第二个数组通过反向遍历一次prices得到.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if(n < 2) return 0;
        vector<int> profit1(n, 0), profit2(n, 0);
        int lowest = prices[0];
        for(int i = 1; i < n; i++){
            lowest = min(lowest, prices[i]);
            profit1[i] = max(profit1[i - 1], prices[i] - lowest);
        }

        int highest = prices.back();
        for(int i = n - 2; i >= 0; i--){
            highest = max(highest, prices[i]);
            profit2[i] = max(profit2[i + 1], highest - prices[i]);
        }

        int maxProfit = profit1.back();
        for(int i = 0; i < n - 1; i++){
            maxProfit = max(maxProfit, profit1[i] + profit2[i + 1]);
        }
        return maxProfit;
    }
};
```

而最后两个循环可以合并为一个.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if(n < 2) return 0;
        vector<int> profit1(n, 0), profit2(n, 0);
        int lowest = prices[0];
        for(int i = 1; i < n; i++){
            lowest = min(lowest, prices[i]);
            profit1[i] = max(profit1[i - 1], prices[i] - lowest);
        }

        int highest = prices.back(), maxProfit = profit1.back();
        for(int i = n - 2; i >= 0; i--){
            highest = max(highest, prices[i]);
            profit2[i] = max(profit2[i + 1], highest - prices[i]);
            maxProfit = max(maxProfit, profit1[i] + profit2[i + 1]);
        }
        return maxProfit;
    }
};
```

