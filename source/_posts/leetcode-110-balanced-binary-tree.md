---
title: LeetCode 110. Balanced Binary Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 716.html
id: 716
categories:
  - LeetCode
date: 2016-09-06 20:57:50
---
题目描述:

> Given a binary tree, determine if it is height-balanced.
>
> For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of *every* node never differ by more than 1.

题目中二叉树平衡的定义为: 每个节点的左右子树的高度相差都不超过1. 因此可以用递归的方式依次遍历每个节点同时计算每个节点左右子树的高度. 用一个bool变量来保存是否出现了不平衡的节点.

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
    bool isBalanced(TreeNode* root) {
        if(!root) return true;
        bool re = true;
        height(root, re);
        return re;
    }
    
    int height(TreeNode *node, bool &re){
        if(node == nullptr) return 0;
        int leftHeight = height(node->left, re), rightHeight = height(node->right, re);
        if(abs(leftHeight - rightHeight) > 1) re = false;
        return max(leftHeight, rightHeight) + 1;
    }
};
```

