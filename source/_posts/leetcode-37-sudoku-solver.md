---
title: LeetCode 37. Sudoku Solver
tags:
  - CPP
  - LeetCode
  - 搜索
  - 算法
  - 递归
url: 490.html
id: 490
categories:
  - LeetCode
date: 2016-07-27 17:33:58
---
题目描述:

> Write a program to solve a Sudoku puzzle by filling the empty cells.
> 
> Empty cells are indicated by the character '.'.
> 
> You may assume that there will be only one unique solution.
> 
> ![](http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)
> 
> A sudoku puzzle...
> 
> ![](http://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png)
> 
> ...and its solution numbers marked in red.

题目要求解数独, 首先想到的解法是通过递归来穷举每一种可能的解. 在`getValidNum`函数中根据数独中已经存在的数获得当前位置可能填入的数. 该解法运行时间356ms.

    class Solution {
    public:
        vector<char> getValidNum(vector<vector<char>>& board, int step) {
            int r = step / 9, c = step % 9;
            set<char> re = { '1', '2', '3', '4', '5', '6', '7', '8', '9' };
            for (int i = 0; i < 9; i++) {
                if (board[r][i] != '.')
                    re.erase(board[r][i]);
                if (board[i][c] != '.')
                    re.erase(board[i][c]);
            }
            int rr = (r / 3) * 3, cc = (c / 3) * 3;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (board[rr + i][cc + j] != '.')
                        re.erase(board[rr + i][cc + j]);
                }
            }
            vector<char> rev;
            for (auto i : re)
                rev.push_back(i);
            return rev;
        }
        bool solveStep(vector<vector<char>>& board, int step) {
            if (step >= 81)
                return true;
            int r = step / 9, c = step % 9;
            if (board[r][c] != '.') {
                return solveStep(board, step + 1);
            }
            vector<char> validNum = getValidNum(board, step);
            for (auto i : validNum) {
                board[r][c] = i;
                if (solveStep(board, step + 1))
                    return true;
            }
            board[r][c] = '.';
            return false;
        }
        void solveSudoku(vector<vector<char>>& board) {
            bool re = solveStep(board, 0);
        }
    };

使用位运算代替set和vector来记录合法数字, 运算时间可以降至20ms.

    class Solution {
    public:
        int getValidNum(vector<vector<char>>& board, int step) {
            int r = step / 9, c = step % 9;
            int re = 0;
            for (int i = 0; i < 9; i++) {
                if (board[r][i] != '.')
                    re |= 1 << (board[r][i] - '1');
                if (board[i][c] != '.')
                    re |= 1 << (board[i][c] - '1');
            }
            int rr = (r / 3) * 3, cc = (c / 3) * 3;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (board[rr + i][cc + j] != '.')
                        re |= 1 << (board[rr + i][cc + j] - '1');
                }
            }
            return re;
        }
        bool solveStep(vector<vector<char>>& board, int step) {
            if (step >= 81)
                return true;
            int r = step / 9, c = step % 9;
            if (board[r][c] != '.') {
                return solveStep(board, step + 1);
            }
            int validNum = getValidNum(board, step);
            for (int i = 0; i < 9; i++) {
                if(validNum & (1 << i)) continue;
                board[r][c] = i + '1';
                if (solveStep(board, step + 1))
                    return true;
            }
            board[r][c] = '.';
            return false;
        }
        void solveSudoku(vector<vector<char>>& board) {
            bool re = solveStep(board, 0);
        }
    };