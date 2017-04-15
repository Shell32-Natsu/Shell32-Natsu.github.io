---
title: LeetCode 51. N-Queens
tags:
  - CPP
  - LeetCode
  - 回溯
  - 算法
  - 递归
url: 537.html
id: 537
categories:
  - LeetCode
date: 2016-08-01 18:54:41
---
题目描述:

>The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.
>
>![](http://www.leetcode.com/wp-content/uploads/2012/03/8-queens.png)
>
>Given an integer n, return all distinct solutions to the n-queens puzzle.
>
>Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space respectively.
>
>For example,
>There exist two distinct solutions to the 4-queens puzzle:
>
>     [
>         [".Q..",  // Solution 1
>         "...Q",
>         "Q...",
>         "..Q."],
>
>         ["..Q.",  // Solution 2
>         "Q...",
>         "...Q",
>         ".Q.."]
>     ]

N皇后问题, 采用递归+回溯的方法, 依次穷举每一种情况.

    class Solution {
    public:
        vector<vector<string>> solveNQueens(int n) {
            vector<vector<int>> board(n, vector<int>(n, 0));
            vector<vector<string>> re;
            NQueensRow(n, board, 0, re);
            return re;
        }

        void NQueensRow(int n, vector<vector<int>> &board, int row, vector<vector<string>> &re) {
            if (row == n) {
                reItem(board, re);
                return;
            }
            for (int i = 0; i < n; i++) {
                if (validPos(board, row, i)) {
                    board[row][i] = 1;
                    NQueensRow(n, board, row + 1, re);
                    board[row][i] = 0;
                }
            }
        }

        bool validPos(vector<vector<int>> &board, int x, int y) {
            int n = board.size();
            for (int i = 0; i < n; i++) {
                if (board[x][i] && i != y)
                    return false;
                else if (board[i][y] && i != x)
                    return false;
            }

            int xt, yt;
            for (xt = x - 1, yt = y - 1; xt >= 0 && yt >= 0; xt--, yt--){
                if (board[xt][yt])
                    return false;
            }
            for (xt = x + 1, yt = y + 1; xt < n && yt < n; xt++, yt++) {
                if (board[xt][yt])
                    return false;
            }
            for (xt = x - 1, yt = y + 1; xt >= 0 && yt < n; xt--, yt++){
                if (board[xt][yt])
                    return false;
            }
            for (xt = x + 1, yt = y - 1; xt < n && yt >= 0; xt++, yt--) {
                if (board[xt][yt])
                    return false;
            }

            return true;
        }

        void reItem(vector<vector<int>> &board, vector<vector<string>> &ret) {
            int n = board.size();
            vector<string> re(n, string(n, '.'));
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if(board[i][j]) re[i][j] = 'Q';
                }
            }
            ret.push_back(re);
        }
    };