---
title: LeetCode 74. Search a 2D Matrix
tags:
  - CPP
  - LeetCode
  - 算法
url: 604.html
id: 604
categories:
  - LeetCode
date: 2016-08-10 17:26:42
---
题目描述:
> Write an efficient algorithm that searches for a value in an *m* x *n* matrix. This matrix has the following properties:
>
> - Integers in each row are sorted from left to right.
> - The first integer of each row is greater than the last integer of the previous row.
>
> For example,
>
> Consider the following matrix:
>
> ```
> [
>   [1,   3,  5,  7],
>   [10, 11, 16, 20],
>   [23, 30, 34, 50]
> ]
> ```

对矩阵应用两次二分搜索, 第一次确定元素所在行, 第二次在行内确定元素.

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int row = getRow(matrix, target) - 1;
        if(row == -1){
            if(matrix[0][0] != target)
                return false;
            else
                return true;
        }
        return getTarget(matrix, target, row);
    }
    
    int getRow(vector<vector<int>> &matrix, int target){
        int n = matrix.size();
        int left = 0, right = n, mid = (left + right) / 2;
        while(left < right){
            if(matrix[mid][0] == target)
                return mid + 1;
            if(matrix[mid][0] < target){
                left = mid + 1;
            }
            else{
                right = mid;
            }
            mid = (left + right) / 2;
        }
        return mid;
    }
    
    bool getTarget(vector<vector<int>> &matrix, int target, int row){
        int n = matrix[row].size();
        int left = 0, right = n, mid = (left + right) / 2;
        while(left < right){
            if(matrix[row][mid] == target)
                return true;
            if(matrix[row][mid] < target){
                left = mid + 1;
            }
            else{
                right = mid;
            }
            mid = (left + right) / 2;
        }
        return false;
    }
};
```

