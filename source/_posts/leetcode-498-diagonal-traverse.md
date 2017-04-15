---
title: LeetCode 498. Diagonal Traverse
tags:
  - CPP
  - LeetCode
  - 算法
url: 1134.html
id: 1134
categories:
  - LeetCode
date: 2017-02-19 19:04:23
---
题目描述：

> Given a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order as shown in the below image.
>
> **Example:**
>
> ```
> Input:
> [
>  [ 1, 2, 3 ],
>  [ 4, 5, 6 ],
>  [ 7, 8, 9 ]
> ]
> Output:  [1,2,4,7,5,3,6,8,9]
> Explanation:
>
>
> ```
>
> **Note:**
>
> 1. The total number of elements of the given matrix will not exceed 10,000.

这道题就是按照题目要求的顺序遍历这个矩阵就可以了。首先有两个方向，对于每个方向在到达矩阵边缘的时候又有两种处理方式，分情况来处理就可以了。
值得注意的是矩阵的右上角与左下角。他们的处理方式分别与矩阵的右边缘和下边缘相同，要注意安排判断横纵坐标的顺序以免越界。

```cpp
class Solution {
    enum DIRECTION {
        DownLeft = 0,
        UpRight = 1
    };
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& matrix) {
        int row = matrix.size();
        if (row == 0) return vector<int>();
        int col = matrix[0].size();
        if (col == 0) return vector<int>();
        
        vector<int> ans;
        
        DIRECTION direction = UpRight;
        
        int x = 0, y = 0;
        while (x != row - 1 || y != col - 1) {
            ans.push_back(matrix[x][y]);
            if (direction == UpRight) {
                if (y == col - 1) {
                    x++;
                    direction = DownLeft;
                }
                else if (x == 0) {
                    y++;
                    direction = DownLeft;
                }
                else {
                    x--;
                    y++;
                }
            }
            else {
                if (x == row - 1) {
                    y++;
                    direction = UpRight;
                }
                else if (y == 0) {
                    x++;
                    direction = UpRight;
                }
                else {
                    x++;
                    y--;
                }
            }
        }
        ans.push_back(matrix[row - 1][col - 1]);
        
        return ans;
    }
};
```