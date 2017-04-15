---
title: LeetCode 538. Convert BST to Greater Tree
tags:
  - BST
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 1190.html
id: 1190
categories:
  - LeetCode
date: 2017-03-27 18:54:45
---
题目描述：

> Given a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.
>
> **Example:**
>
> ```
> Input: The root of a Binary Search Tree like this:
>               5
>             /   \
>            2     13
>
> Output: The root of a Greater Tree like this:
>              18
>             /   \
>           20     13
> ```

转换一颗二叉搜索树，使其每一个节点都变为原来的值+所有比它大的节点的值的和。

这道题只要从大往小遍历BST就可以了，也就是DFS先右后左，记录已经遍历过的节点的值的和，每遍历到一个新节点就把节点值加上这个和。

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
    TreeNode* convertBST(TreeNode* root) {
        int sum = 0;
        DFS(root, sum);
        return root;
    }
    
    void DFS(TreeNode *node, int &sum) {
        if (!node) return;
        DFS(node->right, sum);
        int v = node->val;
        node->val += sum;
        sum += v;
        DFS(node->left, sum);
    }
};
```

