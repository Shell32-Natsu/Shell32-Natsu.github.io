---
title: LeetCode 122. Best Time to Buy and Sell Stock II
tags:
  - CPP
  - LeetCode
  - 算法
url: 749.html
id: 749
categories:
  - LeetCode
date: 2016-09-11 18:28:56
---
题目描述:

> Say you have an array for which the *i*th element is the price of a given stock on day *i*.
>
> Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times). However, you may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

这道题与[上一题](http://xiadong.info/2016/09/leetcode-121-best-time-to-buy-and-sell-stock/)相比不同点在于可以多次买入卖出股票但是不能同时持有多份股票, 所以整个的操作流程必须是"买入-卖出-买入-卖出...-买入-卖出". 考虑一个简单的情况:

`1,4,2,10`

显然有两种策略, 分别的利润为`(4-1)+(10-2)=11`和`10-1=9`, 应选择第一种. 而另一种情况:

`1,2,4,10`

两种策略的利润为`(2-1)+(10-4)=8`和`10-1=9`, 此时应该选择第二种. 对于一般情况来说:

`a1,a2,a3...,ap,...,aq,...,an`

如果在a1买入ap卖出然后再aq买入an卖出的话, 利润为`(an-aq)+(ap-a1)`, 如果在a1买入an卖出的话, 利润为`an-a1`, 两者之差为`(an-a1)-[(an-aq)+(ap-a1)]=aq-ap`, 所以如果`ap>aq`, 那么应该选择前者, 反之选择后者. 从编程策略上来说就应该是搜索一个从低价位开始的递增序列, 在不能再保持递增的时候就是应该卖出的时候.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if(prices.size() < 2) return 0;
        int low = prices[0], profit = 0;
        for(int i = 1; i < prices.size() - 1; i++){
            if(prices[i] < low) low = prices[i];
            else if(prices[i] > prices[i + 1]){
                profit += (prices[i] - low);
                low = prices[i + 1];
            }
        }
        if(prices.back() > low) profit += (prices.back() - low);
        return profit;
    }
};
```

