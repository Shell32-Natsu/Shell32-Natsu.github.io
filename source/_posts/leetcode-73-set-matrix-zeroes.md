---
title: LeetCode 73. Set Matrix Zeroes
tags:
  - CPP
  - LeetCode
  - 算法
url: 602.html
id: 602
categories:
  - LeetCode
date: 2016-08-10 17:20:42
---
题目描述:

> Given a *m* x *n* matrix, if an element is 0, set its entire row and column to 0. Do it in place.
>
> **Follow up:**Did you use extra space?
> A straight forward solution using O(*mn*) space is probably a bad idea.
> A simple improvement uses O(*m + n*) space, but still not the best solution.
> Could you devise a constant space solution?
>

这道题主要的要求在于空间复杂度, O(mn)的复杂度就是使用另一个m×n的矩阵来保存结果. O(m+n)的复杂度则是用两个数组分别保存要设置为0的行数和列数:

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size();
        if(!m){
            return;
        }
        int n = matrix[0].size();
        vector<int> rowFlag(m, 1), colFlag(n, 1);
        for(int i = 0; i < m; i++){
            for(int j = 0; j < n; j++){
                if(matrix[i][j] == 0){
                    rowFlag[i] = 0;
                    colFlag[j] = 0;
                }
            }
        }
        for(int i = 0; i < m; i++){
            if(!rowFlag[i]){
                setZeroRow(matrix, i, n);
            }
        }
        for(int i = 0; i < n; i++){
            if(!colFlag[i]){
                setZeroCol(matrix, i, m);
            }
        }
    }
    
    void setZeroRow(vector<vector<int>> &matrix, int row, int n){
        for(int i = 0; i < n; i++)
            matrix[row][i] = 0;
    }
    
    void setZeroCol(vector<vector<int>> &matrix, int col, int m){
        for(int i = 0; i < m; i++)
            matrix[i][col] = 0;
    }
};
```

而不使用额外空间的方法不是那么直观, 我的方法是先找到一个为0的位置(r,c), 然后使用它所在的行和列来保存要置为0的行数和列数, 最后再把该行和该列置为0.

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int x = -1, y = -1, m = matrix.size();
        if(!m){
            return;
        }
        int n = matrix[0].size();
        // 以下找到第一个0所在的位置
        for(int i = 0; i < m; i++){
            for(int j = 0; j < n; j++){
                if(matrix[i][j] == 0){
                    y = j;
                    break;
                }
            }
            if(y != -1){
                x = i;
                break;
            }
        }
        if(x == -1 && y == -1)
            return;
        // 因为之前的位置不存在0, 所以可以从x开始遍历
        for(int i = x; i < m; i++){
            for(int j = 0; j < n; j++){
                if(matrix[i][j] == 0){
                    matrix[x][j] = 0;
                    matrix[i][y] = 0;
                }
            }
        }
        
        for(int i = 0; i < m; i++){
            if(i == x)
                continue; // 跳过x, 要在最后处理
            if(matrix[i][y] == 0){
                setZeroRow(matrix, i, n);
            }
        }
        
        for(int i = 0; i < n; i++){
            if(i == y)
                continue;
            if(matrix[x][i] == 0){
                setZeroCol(matrix, i, m);
            }
        }
        
        setZeroRow(matrix, x, n);
        setZeroCol(matrix, y, m);
    }
    
    void setZeroRow(vector<vector<int>> &matrix, int row, int n){
        for(int i = 0; i < n; i++)
            matrix[row][i] = 0;
    }
    
    void setZeroCol(vector<vector<int>> &matrix, int col, int m){
        for(int i = 0; i < m; i++)
            matrix[i][col] = 0;
    }
};
```

