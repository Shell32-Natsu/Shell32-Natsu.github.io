---
title: LeetCode 36. Valid Sudoku
tags:
  - CPP
  - LeetCode
  - 算法
url: 488.html
id: 488
categories:
  - LeetCode
date: 2016-07-26 20:59:00
---
题目描述:

> Determine if a Sudoku is valid, according to: [Sudoku Puzzles - The Rules](http://sudoku.com.au/TheRules.aspx).
> 
> The Sudoku board could be partially filled, where empty cells are filled with the character '.'.
>
> ![](http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)
>
> A partially filled sudoku which is valid.
>
> Note:
> A valid Sudoku board (partially filled) is not necessarily solvable. Only the filled cells need to be validated.

要求判断一个数独题目是否合法, 但并不要求一定有解. 一个数独题目合法有以下三个条件:

1. 每一行都没有重复元素
2. 每一列都没有重复元素
3. 九个3x3方格中都没有重复元素

因此验证这三个条件即可.

    class Solution {
    public:
        void setNumFlag(vector<int>& v){
            for(int i = 0; i < v.size(); i++) v[i] = 0;
        }
        bool isValidSudoku(vector<vector<char>>& board) {
            vector<int> numFlag(9);
            for(int i = 0; i < 9; i++){
                setNumFlag(numFlag);
                for(int j = 0; j < 9; j++){
                    char t = board[i][j];
                    if(t >= '1' && t <= '9'){
                        if(numFlag[t - '1'] == 1)
                            return false;
                        else
                            numFlag[t - '1'] = 1;
                    }
                }
            }

            for(int i = 0; i < 9; i++){
                setNumFlag(numFlag);
                for(int j = 0; j < 9; j++){
                    char t = board[j][i];
                    if(t >= '1' && t <= '9'){
                        if(numFlag[t - '1'] == 1)
                            return false;
                        else
                            numFlag[t - '1'] = 1;
                    }
                }
            }

            for(int i = 0; i < 3; i++){
                for(int j = 0; j < 3; j++){
                    int x = i * 3, y = j * 3;
                    setNumFlag(numFlag);
                    for(int ii = 0; ii < 3; ii++){
                        for(int jj = 0; jj < 3; jj++){
                            char t = board[x + ii][y + jj];
                            if(t >= '1' && t <= '9'){
                                if(numFlag[t - '1'] == 1)
                                    return false;
                                else
                                    numFlag[t - '1'] = 1;
                            }
                        }
                    }
                }
            }

            return true;
        }
    };