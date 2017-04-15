---
title: LeetCode 104. Maximum Depth of Binary Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 692.html
id: 692
categories:
  - LeetCode
date: 2016-08-31 18:43:18
---
题目描述:

> Given a binary tree, find its maximum depth.
>
> The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

递归递归递.

```cpp
/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode *root) {
        if(root == NULL) return 0;
        int left_depth = 1, right_depth = 1;
        if(root->left != NULL)
            left_depth = maxDepth(root->left) + 1;
        if(root->right != NULL)
            right_depth = maxDepth(root->right) + 1;
            
        return left_depth > right_depth ? left_depth : right_depth;
    }
};
```

