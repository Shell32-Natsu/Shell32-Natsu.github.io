---
title: LeetCode 54. Spiral Matrix
tags:
  - CPP
  - LeetCode
  - 算法
url: 548.html
id: 548
categories:
  - LeetCode
date: 2016-08-02 19:29:11
---
题目描述:

>Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.
>
>For example,
>Given the following matrix:
>
>     [
>       [ 1, 2, 3 ],
>       [ 4, 5, 6 ],
>       [ 7, 8, 9 ]
>     ]
>You should return `[1,2,3,6,9,8,7,4,5]`.

螺旋形输出一个矩阵, 我的方法就是螺旋形地遍历这个矩阵. 用一个变量来表示方向, 到达矩阵边缘的时候就更改方向.

    class Solution {
    public:
        vector<int> spiralOrder(vector<vector<int>>& matrix) {
            vector<int> re;
            if (matrix.size() == 0 || matrix[0].size() == 0)
                return re;
            int m = matrix.size(), n = matrix[0].size(), num = m * n;
            vector<int> row(n, 0);
            vector<vector<int>> visited(m, row);
            int direction = 0;// 0 => right, 1 => down, 2 => left, 3 => up
            int posRow = 0, posCol = 0, cnt = 0;
            while (cnt < num) {
                int nextPosRow, nextPosCol;
                if(!visited[posRow][posCol]){
                    re.push_back(matrix[posRow][posCol]);
                    visited[posRow][posCol] = 1;
                    cnt++;
                }
                bool nextPosValid = true;
                switch (direction) {
                case 0:
                    nextPosRow = posRow;
                    nextPosCol = posCol + 1;
                    if (nextPosCol >= n || visited[nextPosRow][nextPosCol] == 1) {
                        nextPosValid = false;
                    }
                    break;
                case 1:
                    nextPosRow = posRow + 1;
                    nextPosCol = posCol;
                    if (nextPosRow >= m || visited[nextPosRow][nextPosCol] == 1) {
                        nextPosValid = false;
                    }
                    break;
                case 2:
                    nextPosRow = posRow;
                    nextPosCol = posCol - 1;
                    if (nextPosCol < 0 || visited[nextPosRow][nextPosCol] == 1) {
                        nextPosValid = false;
                    }
                    break;
                case 3:
                    nextPosRow = posRow - 1;
                    nextPosCol = posCol;
                    if (nextPosRow < 0 || visited[nextPosRow][nextPosCol] == 1) {
                        nextPosValid = false;
                    }
                    break;
                }
                if(nextPosValid){
                    posRow = nextPosRow;
                    posCol = nextPosCol;
                }
                else{
                    direction = (direction + 1) % 4;
                }
            }
            return re;
        }
    };