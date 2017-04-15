---
title: LeetCode 84. Largest Rectangle in Histogram
tags:
  - CPP
  - LeetCode
  - 栈
  - 算法
url: 633.html
id: 633
categories:
  - LeetCode
date: 2016-08-15 19:47:26
---
题目描述:

> Given *n* non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.
>
> ![img](http://www.leetcode.com/wp-content/uploads/2012/04/histogram.png)
>
> Above is a histogram where width of each bar is 1, given height = `[2,1,5,6,2,3]`.
>
> ![img](http://www.leetcode.com/wp-content/uploads/2012/04/histogram_area.png)
>
> The largest rectangle is shown in the shaded area, which has area = `10` unit.
>
> For example,
> Given heights = `[2,1,5,6,2,3]`,
> return `10`.

这道题目使用栈来解决, 方法是每读入一个高度就判断该高度左边有哪些高度所组成的矩形到此为止, 最终得到的是一个单调递增的序列.

这篇解答写的比较详细: <http://www.cnblogs.com/boring09/p/4231906.html>

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        vector<int> s;
        heights.push_back(0);
        int ret = 0;
        for(int i = 0; i < heights.size(); i++){
            if(s.empty() || heights[i] > heights[s.back()]){
                s.push_back(i);
            }
            else{
                while(!s.empty() && heights[s.back()] >= heights[i]){
                    int h = heights[s.back()];
                    s.pop_back();
                    int w = s.empty() ? i : i - s.back() - 1;
                    ret = max(ret, w * h);
                }
                s.push_back(i);
            }
        }
        return ret;
    }
};
```

