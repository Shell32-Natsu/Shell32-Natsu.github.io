---
title: LeetCode 111. Minimum Depth of Binary Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 718.html
id: 718
categories:
  - LeetCode
date: 2016-09-07 15:12:22
---
题目描述:

> Given a binary tree, find its minimum depth.
>
> The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

DFS/BFS都可以, 但是我觉得大概BFS会快一点, 因为在最坏的情况下DFS需要遍历完所有节点才能知道最短的高度.

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int minDepth(TreeNode* root) {
        if(!root) return 0;
        queue<TreeNode*> BFS;
        queue<int> depth;
        BFS.push(root);
        depth.push(1);
        while(!BFS.empty()){
            TreeNode *p = BFS.front();
            int d = depth.front();
            if(!p->left && !p->right){
                return d;
            }
            if(p->left){
                BFS.push(p->left);
                depth.push(d + 1);
            }
            if(p->right){
                BFS.push(p->right);
                depth.push(d + 1);
            }
            BFS.pop();
            depth.pop();
        }
    }
};
```

