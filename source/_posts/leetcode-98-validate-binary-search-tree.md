---
title: LeetCode 98. Validate Binary Search Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 675.html
id: 675
categories:
  - LeetCode
date: 2016-08-28 15:51:28
---
题目描述:

> Given a binary tree, determine if it is a valid binary search tree (BST).
>
> Assume a BST is defined as follows:
>
> - The left subtree of a node contains only nodes with keys **less than** the node's key.
> - The right subtree of a node contains only nodes with keys **greater than** the node's key.
> - Both the left and right subtrees must also be binary search trees.
>
> **Example 1:**
>
> ```
>     2
>    / \
>   1   3
>
> ```
>
> Binary tree 
>
> ```
> [2,1,3]
> ```
>
> , return true.
>
> **Example 2:**
>
> ```
>     1
>    / \
>   2   3
>
> ```
>
> Binary tree 
>
> ```
> [1,2,3]
> ```
>
> , return false.

验证一个二叉搜索树是否合法, 使用递归的方法来依次遍历左右子树.

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
    bool isValidBST(TreeNode* root) {
        if(!root) return true;
        if(root->left && BSTMax(root->left) >= root->val){
            return false;
        }
        if(root->right && BSTMin(root->right) <= root->val){
            return false;
        }
        return isValidBST(root->left) && isValidBST(root->right);
    }
    
    int BSTMax(TreeNode* root){
        if(!root->right){
            return root->val;
        }
        return BSTMax(root->right);
    }
    
    int BSTMin(TreeNode* root){
        if(!root->left){
            return root->val;
        }
        return BSTMin(root->left);
    }
};
```

