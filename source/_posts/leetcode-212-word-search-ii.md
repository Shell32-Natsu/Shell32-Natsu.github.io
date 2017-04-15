---
title: LeetCode 212. Word Search II
tags:
  - CPP
  - LeetCode
  - 前缀树(Trie)
  - 图
  - 字符串
  - 搜索
  - 算法
url: 1105.html
id: 1105
categories:
  - LeetCode
date: 2017-01-19 17:42:45
---
题目描述：

> Given a 2D board and a list of words from the dictionary, find all words in the board.
>
> Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
>
> For example,
> Given **words** = `["oath","pea","eat","rain"]` and **board** =
>
> ```
> [
>   ['o','a','a','n'],
>   ['e','t','a','e'],
>   ['i','h','k','r'],
>   ['i','f','l','v']
> ]
>
> ```
>
> Return 
>
> ```
> ["eat","oath"]
> ```
>
> .
>
> **Note:**
> You may assume that all inputs are consist of lowercase letters `a-z`.

用DFS来遍历表格，用前缀树来实现判断一个路径是否在目标字符串中。

```cpp
class TrieNode {
public:
    bool isEnd;
    char val;
    vector<TrieNode*> children;
    TrieNode(char _v): isEnd(false), val(_v) {
        children = vector<TrieNode*>(26, nullptr);
    }
};

class Solution {
    TrieNode* root = new TrieNode(0);
    vector<vector<int>> visited;
    vector<string> ans;
    vector<vector<int>> steps = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    int row, col;
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        for(auto word : words) {
            insertToTrie(word);
        }
        row = board.size();
        if(row == 0) return ans;
        col = board[0].size();
        if(col == 0) return ans;
        visited = vector<vector<int>>(row, vector<int>(col, 0));
        
        string path;
        for(int i = 0; i < row; i++){
            for(int j = 0; j < col; j++){
                DFS(board, path, i, j, root->children[board[i][j] - 'a']);
            }
        }
        return ans;
    }
    
    void DFS(vector<vector<char>>& board, string &boardPath, int r, int c, TrieNode *node) {
        if (node == nullptr) return;
        visited[r][c] = 1;
        char val = board[r][c];
        boardPath.push_back(val);
        
        if (node->isEnd) {
            ans.push_back(boardPath); 
            node->isEnd = false;
        }
        
        for (int i = 0; i < 4; i++) {
            int tr = r + steps[i][0], tc = c + steps[i][1];
            if (isValidPoint(board, tr, tc)) {
                TrieNode *next = node->children[board[tr][tc] - 'a'];
                DFS(board, boardPath, tr, tc, next);
            }
        }
        boardPath.pop_back();
        visited[r][c] = 0;
    }
    
    bool isValidPoint(vector<vector<char>>& board, int r, int c) {
        if(r < 0 || r >= row || c < 0 || c >= col || visited[r][c]) return false;
        else return true;
    }
    
    void insertToTrie(string s) {
        TrieNode *p = root, *prev;
        int i = 0;
        do {
            int next = s[i++] - 'a';
            prev = p;
            p = p->children[next];
        } while (p && i < s.length());
        if (i < s.length() || p == nullptr) {
            p = prev;
            for(i--; i < s.length(); i++){
                int next = s[i] - 'a';
                p->children[next] = new TrieNode(s[i]);
                p = p->children[next];
            }
        }
        p->isEnd = true;
    }
};
```

