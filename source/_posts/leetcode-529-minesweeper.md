---
title: LeetCode 529. Minesweeper
tags:
  - CPP
  - LeetCode
  - 算法
  - 递归
url: 1150.html
id: 1150
categories:
  - LeetCode
date: 2017-03-03 22:22:28
---
题目描述：

> Let's play the minesweeper game ([Wikipedia](https://en.wikipedia.org/wiki/Minesweeper_(video_game)), [online game](http://minesweeperonline.com/))!
>
> You are given a 2D char matrix representing the game board. **'M'** represents an **unrevealed** mine, **'E'** represents an **unrevealed** empty square, **'B'** represents a **revealed** blank square that has no adjacent (above, below, left, right, and all 4 diagonals) mines, **digit** ('1' to '8') represents how many mines are adjacent to this **revealed** square, and finally **'X'** represents a **revealed** mine.
>
> Now given the next click position (row and column indices) among all the **unrevealed** squares ('M' or 'E'), return the board after revealing this position according to the following rules:
>
> 1. If a mine ('M') is revealed, then the game is over - change it to **'X'**.
> 2. If an empty square ('E') with **no adjacent mines** is revealed, then change it to revealed blank ('B') and all of its adjacent **unrevealed** squares should be revealed recursively.
> 3. If an empty square ('E') with **at least one adjacent mine** is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
> 4. Return the board when no more squares will be revealed.
>
> **Example 1:**
>
> ```
> Input: 
>
> [['E', 'E', 'E', 'E', 'E'],
>  ['E', 'E', 'M', 'E', 'E'],
>  ['E', 'E', 'E', 'E', 'E'],
>  ['E', 'E', 'E', 'E', 'E']]
>
> Click : [3,0]
>
> Output: 
>
> [['B', '1', 'E', '1', 'B'],
>  ['B', '1', 'M', '1', 'B'],
>  ['B', '1', '1', '1', 'B'],
>  ['B', 'B', 'B', 'B', 'B']]
>
> Explanation:
>
>
> ```
>
> **Example 2:**
>
> ```
> Input: 
>
> [['B', '1', 'E', '1', 'B'],
>  ['B', '1', 'M', '1', 'B'],
>  ['B', '1', '1', '1', 'B'],
>  ['B', 'B', 'B', 'B', 'B']]
>
> Click : [1,2]
>
> Output: 
>
> [['B', '1', 'E', '1', 'B'],
>  ['B', '1', 'X', '1', 'B'],
>  ['B', '1', '1', '1', 'B'],
>  ['B', 'B', 'B', 'B', 'B']]
>
> Explanation:
>
>
> ```
>
> **Note:**
>
> 1. The range of the input matrix's height and width is [1,50].
> 2. The click position will only be an unrevealed square ('M' or 'E'), which also means the input board contains at least one clickable square.
> 3. The input board won't be a stage when game is over (some mines have been revealed).
> 4. For simplicity, not mentioned rules should be ignored in this problem. For example, you **don't** need to reveal all the unrevealed mines when the game is over, consider any cases that you will win the game or flag any squares.

扫雷游戏，根据题目要求做相应的处理就可以了。

```cpp
class Solution {
    int totalRow, totalCol;
public:
    vector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {
        totalRow = board.size();
        totalCol = board[0].size();
        char cur = board[click[0]][click[1]];
        switch (cur) {
            case 'M':
                updateM(board, click[0], click[1]);
                break;
            case 'E':
                updateE(board, click[0], click[1]);
                break;
        }
        return board;
    }
    
    void updateM (vector<vector<char>>& board, int row, int col) {
        board[row][col] = 'X';
    }
    
    void updateE (vector<vector<char>>& board, int row, int col) {
        if (row < 0 || col < 0 || row >= totalRow || col >= totalCol || board[row][col] != 'E') return;
        int mine = adjacentMine(board, row, col);
        if (mine) {
            board[row][col] = mine + '0';
        }
        else {
            board[row][col] = 'B';
            updateE(board, row - 1, col - 1);
            updateE(board, row - 1, col);
            updateE(board, row - 1, col + 1);
            updateE(board, row, col + 1);
            updateE(board, row + 1, col + 1);
            updateE(board, row + 1, col);
            updateE(board, row + 1, col - 1);
            updateE(board, row, col - 1);
        }
    }
    
    int adjacentMine (vector<vector<char>>& board, int row, int col) {
        int cnt = 0;
        if (row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] == 'M')                cnt++;
        if (row - 1 >= 0 && board[row - 1][col] == 'M')                                    cnt++;
        if (row - 1 >= 0 && col + 1 < totalCol && board[row - 1][col + 1] == 'M')          cnt++;
        if (col + 1 < totalCol && board[row][col + 1] == 'M')                              cnt++;
        if (row + 1 < totalRow && col + 1 < totalCol && board[row + 1][col + 1] == 'M')    cnt++;
        if (row + 1 < totalRow && board[row + 1][col] == 'M')                              cnt++;
        if (row + 1 < totalRow && col - 1 >= 0 && board[row + 1][col - 1] == 'M')          cnt++;
        if (col - 1 >= 0 && board[row][col - 1] == 'M')                                    cnt++;
        
        return cnt;
    }
};
```

