---
title: LeetCode 120. Triangle
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 744.html
id: 744
categories:
  - LeetCode
date: 2016-09-11 17:27:00
---
题目描述：
>Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.
>
>For example, given the following triangle
>```
[
>     [2],
>    [3,4],
>   [6,5,7],
>  [4,1,8,3]
>]
>```
>The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
>
>Note:
>Bonus point if you are able to do this using only O(n) extra space, where n is the total number of rows in the triangle.

比较简单的动态规划题, 每次需要的数据就是上一行到达每个位置的最小路径和. 只要比较左上方与右上方的两个和然后选择较小的一个就可以了.

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        if(triangle.empty()) return 0;
        vector<int> lastRow, rowSum;
        lastRow = triangle[0];
        for(int i = 1; i < triangle.size(); i++){
            rowSum.resize(triangle[i].size());
            rowSum[0] = lastRow[0] + triangle[i][0];
            for(int j = 1; j < triangle[i].size() - 1; j++){
                rowSum[j] = min(lastRow[j - 1], lastRow[j]) + triangle[i][j];
            }
            rowSum.back() = lastRow.back() + triangle[i].back();
            lastRow = rowSum;
        }
        int ret = INT_MAX;
        for(int i = 0; i < lastRow.size(); i++){
            ret = min(lastRow[i], ret);
        }
        return ret;
    }
};
```