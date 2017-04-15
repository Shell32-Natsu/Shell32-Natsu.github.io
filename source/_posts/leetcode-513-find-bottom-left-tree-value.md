---
title: LeetCode 513. Find Bottom Left Tree Value
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 1138.html
id: 1138
categories:
  - LeetCode
date: 2017-02-21 18:31:21
---
题目描述：

> Given a binary tree, find the leftmost value in the last row of the tree.
>
> **Example 1:**
>
> ```
> Input:
>
>     2
>    / \
>   1   3
>
> Output:
> 1
>
> ```
>
> **Example 2: **
>
> ```
> Input:
>
>         1
>        / \
>       2   3
>      /   / \
>     4   5   6
>        /
>       7
>
> Output:
> 7
>
> ```
>
> **Note:** You may assume the tree (i.e., the given root node) is not **NULL**.

用DFS/BFS遍历一遍二叉树，要保证左子树比右子树先遍历到，这样没出现一个更深的节点就一定是该深度的最左边的节点。

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
    int findBottomLeftValue(TreeNode* root) {
        return BFS(root);
    }
    
    int BFS(TreeNode *root) {
        queue<TreeNode*> nodeQueue;
        queue<int>       depthQueue; // Store the corresponding depth
        nodeQueue.push(root);
        depthQueue.push(0);
        
        int maxDepth = -1;
        int leftBottomVal;
        while (!nodeQueue.empty()) {
            TreeNode *node = nodeQueue.front();
            nodeQueue.pop();
            int depth = depthQueue.front();
            depthQueue.pop();
            if (maxDepth < depth) {
                maxDepth = depth;
                leftBottomVal = node->val;
            }
            if (node->left) {
                nodeQueue.push(node->left);
                depthQueue.push(depth + 1);
            }
            if (node->right) {
                nodeQueue.push(node->right);
                depthQueue.push(depth + 1);
            }
        }
        return leftBottomVal;
    }
};
```

