---
title: LeetCode 79. Word Search
tags:
  - CPP
  - LeetCode
  - 回溯
  - 算法
  - 递归
url: 621.html
id: 621
categories:
  - LeetCode
date: 2016-08-13 17:02:36
---
题目描述:

> Given a 2D board and a word, find if the word exists in the grid.
>
> The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.
>
> For example,
> Given **board** =
>
> ```
> [
>   ['A','B','C','E'],
>   ['S','F','C','S'],
>   ['A','D','E','E']
> ]
>
> ```
>
> word = `"ABCCED"`, -> returns `true`,
> word = `"SEE"`, -> returns `true`,
> word = `"ABCB"`, -> returns `false`.

一个搜索问题, 使用回溯+递归, 先遍历二维数组, 找到目标字符串的开头字母, 然后向上下左右四个方向搜索下一个字母, 同时标记该位置已访问, 直到找到整个字符串为止.

```cpp
class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        if(board.empty()){
            return false;
        }
        else if(board[0].empty()){
            return false;
        }
        int row = board.size(), col = board[0].size();
        vector<vector<int>> flag(row, vector<int>(col, 0));
        int str_p = 0;
        for(int i = 0; i < row; i++){
            for(int j = 0; j < col; j++){
                if(board[i][j] == word[str_p] && existNext(board, i, j, word, str_p + 1, flag, row, col)){
                    return true;
                }
            }
        }
        return false;
    }
    
    bool existNext(vector<vector<char>>& board, int r, int c, string &word, int p, vector<vector<int>> &flag, int row, int col){
        flag[r][c] = 1;
        bool re = false;
        if(p == word.size()){
            flag[r][c] = 0;
            return true;
        }
        if(r - 1 >= 0 && flag[r - 1][c] == 0 && board[r - 1][c] == word[p]){
            re = existNext(board, r - 1, c, word, p + 1, flag, row, col);
        }
        if(!re && c - 1 >= 0 && flag[r][c - 1] == 0 && board[r][c - 1] == word[p]){
            re = existNext(board, r, c - 1, word, p + 1, flag, row, col);
        }
        if(!re && r + 1 < row && flag[r + 1][c] == 0 && board[r + 1][c] == word[p]){
            re = existNext(board, r + 1, c, word, p + 1, flag, row, col);
        }
        if(!re && c + 1 < col && flag[r][c + 1] == 0 && board[r][c + 1] == word[p]){
            re = existNext(board, r, c + 1, word, p + 1, flag, row, col);
        }

        flag[r][c] = 0;
        return re;
    }
};
```

