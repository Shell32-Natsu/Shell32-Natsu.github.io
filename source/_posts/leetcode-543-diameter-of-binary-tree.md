---
title: LeetCode 543. Diameter of Binary Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 分治
  - 算法
url: 1192.html
id: 1192
categories:
  - LeetCode
date: 2017-03-27 18:55:46
---
题目描述：

> Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the **longest** path between any two nodes in a tree. This path may or may not pass through the root.
>
> **Example:**
> Given a binary tree 
>
>
>           1
>          / \
>         2   3
>        / \     
>       4   5    
>
> Return **3**, which is the length of the path [4,2,1,3] or [5,2,1,3].
>
> **Note:** The length of path between two nodes is represented by the number of edges between them.

这道题可以采用分治法，对于一颗树来说，任意两个节点之间的最长路径从大的方面来说存在两种情况：

- 路径经过根节点，则最长路径为左子数的最大深度与右子树的最大深度之和
- 路径不经过根节点，又有两种情况：
  - 最长路径为左子树的最长路径
  - 最长路径为右子树的最长路径

所以就可以通过递归求出根节点的这三个长度取最大值就是整棵树的最长路径。

计算子树的深度可以和计算子树的最长路径结合到一起。

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
    int diameterOfBinaryTree(TreeNode* root) {
        int maxDepth = 0;
        return diameterOfBinaryTreeImpl(root, maxDepth);
    }
    
    int diameterOfBinaryTreeImpl(TreeNode* node, int &maxDepth) {
        if (!node) return 0;
        int leftMaxDepth = 0, rightMaxDepth = 0;
        int leftAns = diameterOfBinaryTreeImpl(node->left, leftMaxDepth);
        int rightAns = diameterOfBinaryTreeImpl(node->right, rightMaxDepth);
        maxDepth = max(leftMaxDepth, rightMaxDepth) + 1;
        return max(leftMaxDepth + rightMaxDepth, max(leftAns, rightAns));
    }
};
```



