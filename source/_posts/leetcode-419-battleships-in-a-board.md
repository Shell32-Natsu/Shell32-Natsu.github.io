---
title: LeetCode 419. Battleships in a Board
tags:
  - CPP
  - LeetCode
  - 算法
url: 943.html
id: 943
categories:
  - LeetCode
date: 2016-11-04 16:06:00
---
题目描述:

> Given an 2D board, count how many different battleships are in it. The battleships are represented with `'X'`s, empty slots are represented with `'.'`s. You may assume the following rules:
>
> - You receive a valid board, made of only battleships or empty slots.
> - Battleships can only be placed horizontally or vertically. In other words, they can only be made of the shape `1xN` (1 row, N columns) or`Nx1` (N rows, 1 column), where N can be of any size.
> - At least one horizontal or vertical cell separates between two battleships - there are no adjacent battleships.
>
> **Example:**
>
> ```
> X..X
> ...X
> ...X
>
> ```
>
> In the above board there are 2 battleships.
>
> **Invalid Example:**
>
> ```
> ...X
> XXXX
> ...X
>
> ```
>
> This is an invalid board that you will not receive - as battleships will always have a cell separating between them.
>
> **Follow up:**
> Could you do it in **one-pass**, using only **O(1) extra memory** and **without modifying** the value of the board?

这道题题目中举的invalid的例子是不会作为输入数据的, 所以不需要对它进行判断. 最直接的方法就是遍历数组, 然后~~找舰娘(雾)/老婆(大雾)~~在遇到一个X的时候计数器加1, 并把与它相邻接的所有X清除以防止重复计算. 

但是Follow up中是要求不修改原数组的. 对于横向的战舰只要直接跳过就可以了, 因为一般都是按行=>列的方式来遍历. 而对于纵向的战舰, 则要判断它上方是否有X, 如果有的话说明这艘战舰已经计算过了, 不应该重复计算.

```cpp
class Solution {
public:
    int countBattleships(vector<vector<char>>& board) {
        int ans = 0;
        int row = board.size();
        if(board.empty()) return ans;
        int col = board[0].size();
        for(int i = 0; i < row; i++){
            for(int j = 0; j < col; j++){
                if(board[i][j] == 'X'){
                    if(i > 0 && board[i - 1][j] == 'X'){
                        continue;
                    }
                    ans++;
                    if(j < col - 1 && board[i][j + 1] == 'X'){
                        for(; j < col && board[i][j] == 'X'; j++) board[i][j] = '.';
                        j--;
                    }
                }
            }
        }
        return ans;
    }
};
```

