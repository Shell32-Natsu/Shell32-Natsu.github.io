---
title: LeetCode 100. Same Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 680.html
id: 680
categories:
  - LeetCode
date: 2016-08-28 18:26:39
---
题目描述:

> Given two binary trees, write a function to check if they are equal or not.
>
> Two binary trees are considered equal if they are structurally identical and the nodes have the same value.

很简单, 使用递归来判断每个节点是否相等.

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
    bool isSameTree(TreeNode *p, TreeNode *q) {
        if(p == NULL && q == NULL) return true;
        if((p == NULL && q != NULL) || (p != NULL && q == NULL))return false;
        if(p->val != q->val)return false;
        
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```

