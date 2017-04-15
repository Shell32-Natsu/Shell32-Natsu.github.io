---
title: LeetCode 52. N-Queens II
tags:
  - CPP
  - LeetCode
  - 回溯
  - 算法
  - 递归
url: 539.html
id: 539
categories:
  - LeetCode
date: 2016-08-01 19:19:25
---
题目描述:

>Follow up for N-Queens problem.
>
>Now, instead outputting board configurations, return the total number of distinct solutions.

与上一题[51. N-Queens](http://xiadong.info/2016/08/leetcode-51-n-queens/)基本类似, 但是要求返回共有多少个解, 对上一个程序稍加改动即可. ~~当然, 最投机取巧的做法是算出n=1到9的结果然后直接返回~~.

    class Solution {
    public:
        int totalNQueens(int n) {
            vector<vector<int>> board(n, vector<int>(n, 0));
            int re = 0;
            NQueensRow(n, board, 0, re);
            return re;
        }
        void NQueensRow(int n, vector<vector<int>> &board, int row, int &re) {
            if (row == n) {
                re++;
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
    };