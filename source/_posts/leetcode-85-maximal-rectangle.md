---
title: LeetCode 85. Maximal Rectangle
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 栈
  - 算法
url: 637.html
id: 637
categories:
  - LeetCode
date: 2016-08-17 16:48:21
---
题目描述:

> Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
>
> For example, given the following matrix:
>
> ```
> 1 0 1 0 0
> 1 0 1 1 1
> 1 1 1 1 1
> 1 0 0 1 0
>
> ```
>
> Return 6.

本来我想直接用动态规划, 但是做起来非常麻烦. 然后想起了上一道题[Largest Rectangle in Histogram](http://xiadong.info/2016/08/leetcode-84-largest-rectangle-in-histogram/)是本题解决的步骤之一, 先用动态规划法计算出matrix中每个元素的高(就是该元素和该元素之上的1的个数), 然后以行为单位计算最大的矩形面积.

```cpp
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        int row = matrix.size(), col;
        if(row == 0) return 0;
        col = matrix[0].size();
        vector<vector<int>> heights(row, vector<int>(col, 0));
        for(int j = 0; j < col; j++){
            heights[0][j] = (matrix[0][j] == '1' ? 1 : 0);
        }
        for(int i = 1; i < row; i++){
            for(int j = 0; j < col; j++){
                heights[i][j] = (matrix[i][j] == '1' ? heights[i - 1][j] + 1 : 0);
            }
        }
        int maxArea = 0;
        for(int i = 0; i < row; i++){
            maxArea = max(maxArea, largestRectangleArea(heights[i]));
        }
        return maxArea;
    }
    
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

