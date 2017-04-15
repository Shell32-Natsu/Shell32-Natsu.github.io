---
title: LeetCode 130. Surrounded Regions
tags:
  - CPP
  - LeetCode
  - 搜索
  - 算法
url: 790.html
id: 790
categories:
  - LeetCode
date: 2016-09-23 16:18:48
---
题目描述:

> Given a 2D board containing `'X'` and `'O'` (the **letter** O), capture all regions surrounded by `'X'`.
>
> A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.
>
> For example,
>
> ```
> X X X X
> X O O X
> X X O X
> X O X X
>
> ```
>
> After running your function, the board should be:
>
> ```
> X X X X
> X X X X
> X X X X
> X O X X
> ```

这道题可以使用并查集或者BFS的方法. 基本思想都是把没有接触边缘的元素归为一类, 然后设置为X. 我使用BFS的方法, 由于查找所有没有接触边缘的区块要遍历整个二维数组, 而查找与边缘有接触的区块只要遍历四条边, 所以我选择找出与边缘有接触的O组成的区块, 把它们使用另一种符号标记(比如T), 然后再遍历整个数组, 把O变为X, T变为O即可得到最终的结果.

```cpp
class Solution {
    int row, col;
public:
    void solve(vector<vector<char>>& board) {
        if(board.empty() || board[0].empty()) return;
        row = board.size();
        col = board[0].size();
        for(int i = 0; i < col; i++){
            if(board[0][i] == 'O') BFS(board, 0, i);
        }
        for(int i = 1; i < row - 1; i++){
            if(board[i][0] == 'O') BFS(board, i, 0);
            if(board[i][col - 1] == 'O') BFS(board, i, col - 1);
        }
        for(int i = 0; i < col; i++){
            if(board[row - 1][i] == 'O') BFS(board, row - 1, i);
        }
        
        for(int i = 0; i < row; i++){
            for(int j = 0; j < col; j++){
                if(board[i][j] == 'O') board[i][j] = 'X';
                else if(board[i][j] == 'T') board[i][j] = 'O';
            }
        }
    }
    
    void BFS(vector<vector<char>> &b, int x, int y){
        queue<pair<int, int>> q;
        q.push(pair<int, int>(x, y));
        b[x][y] = 'T';
        while(!q.empty()){
            int cx = q.front().first, cy = q.front().second;
            if(cx > 0 && b[cx - 1][cy] == 'O'){
                b[cx - 1][cy] = 'T';
                q.push(pair<int, int>(cx - 1, cy));
            }
            if(cy > 0 && b[cx][cy - 1] == 'O'){
                b[cx][cy - 1] = 'T';
                q.push(pair<int, int>(cx, cy - 1));
            }
            if(cx < row - 1 && b[cx + 1][cy] == 'O'){
                b[cx + 1][cy] = 'T';
                q.push(pair<int, int>(cx + 1, cy));
            }
            if(cy < col - 1 && b[cx][cy + 1] == 'O'){
                b[cx][cy + 1] = 'T';
                q.push(pair<int, int>(cx, cy + 1));
            }
            q.pop();
        }
    }
};
```

