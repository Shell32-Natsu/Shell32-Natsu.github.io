---
title: LeetCode 135. Candy
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 808.html
id: 808
categories:
  - LeetCode
date: 2016-09-28 16:00:19
---
题目描述:

> There are *N* children standing in a line. Each child is assigned a rating value.
>
> You are giving candies to these children subjected to the following requirements:
>
> - Each child must have at least one candy.
> - Children with a higher rating get more candies than their neighbors.
>
> What is the minimum candies you must give?

分糖果的问题, 有两条规则:

+ 每个孩子必须至少有一个糖果.
+ 如果rating比相邻的孩子高, 那么也必须有更多的糖果. 也就是说**相等的rating是没有要求的, 跟小于一样**.

我所采用的思路是一种类似双指针的方法:

1. 扫描一遍ratings, 找到所有**小于等于相邻元素的元素**的rating, 这些rating是可以直接设为1的.
2. 在上一步的到的数组中每两个相邻的rating中间找到rating的最大值
3. 比较这个最大值与相邻的两个最小rating的距离, 使用等差数列来算出所需要的总rating值.

对于最后一步为什么可以使用等差数列, 因为对于两个candy值为1的孩子中间的孩子, 按照索引顺序的话他们各自的candy值是先增后减的趋势, 为了保证总得candy最小每次增加或减少1是唯一方法, 是两个等差数列. 但是由于最大rating的孩子与两边candy为1的孩子的距离不同, 这两个数列也不同. 比如对于以下的ratings

`[6,8,9,10,2,1]`

对应的最小candy值应为:

`[1,2,3,4,2,1]`

左边数列是一个从左边的candy为1的孩子到rating最大的孩子共4个, 而右边则是到2就结束了. 把输入数据颠倒一下:

`[1,2,10,9,8,6]`

对应的结果应为:

`[1,2,4,3,2,1]`

数列的形式也颠倒了, 所以要根据rating最大的孩子到左右两边的距离来分别求和.

还有一些其他问题:

1. 关于最左边与最右边的值, 因为他们只有一边有邻居, 所以不能像中间的节点一样计算. 我的方法是在前后各插入一个INT_MIN, 这样就可以把两端节点当作中间节点来处理了. 最后再从结果中减去.
2. rating的最大值有多个. 这种情况只有一种可能, 就是两个连续的最大rating值(从我的方法来说, 其他情况都是不可能的), 由于相等的两个值没有大小要求, 因此也应该分别计算.

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        if(n < 2) return 1;
        
        vector<int> oneIndex;
        oneIndex.push_back(-1);
        if(ratings[0] <= ratings[1]) oneIndex.push_back(0);
        for(int i = 1; i < n - 1; i++){
            if(ratings[i] <= ratings[i - 1] && ratings[i] <= ratings[i + 1]) 
                oneIndex.push_back(i);
        }
        if(ratings[n - 1] <= ratings[n - 2]) oneIndex.push_back(n - 1);
        
        oneIndex.push_back(n);
        
        int ans = oneIndex.size() - 2, i = 0;
        while(i < oneIndex.size()){
            while(i < oneIndex.size() - 1 && oneIndex[i + 1] == oneIndex[i] + 1) i++; // 跳过连续的相等值
            if(i == oneIndex.size() - 1) break;
            int left = oneIndex[i], right = oneIndex[i + 1];
            int maxRating = INT_MIN, maxIndex;
            for(int j = left + 1; j < right; j++){ // 找出最大rating值
                if(ratings[j] >= maxRating){
                    maxRating = ratings[j];
                    maxIndex = j;
                }
            }
            if((ratings[maxIndex - 1] == ratings[maxIndex] && maxIndex - 1 != left)){
                // 有两个最大rating值
                ans += (2 + maxIndex - left) * (maxIndex - left - 1) / 2;
                ans += (right - maxIndex) * (3 + right - maxIndex) / 2;
            }
            else if(right - maxIndex < maxIndex - left){
                // 距左边较远
                ans += (3 + maxIndex - left) * (maxIndex - left) / 2;
                ans += (right - maxIndex - 1) * (2 + right - maxIndex) / 2;
            }
            else{ // 距右边较远
                ans += (2 + maxIndex - left) * (maxIndex - left - 1) / 2;
                ans += (right - maxIndex) * (3 + right - maxIndex) / 2;
            }
            i++;
        }
        return ans;
    }
};
```

