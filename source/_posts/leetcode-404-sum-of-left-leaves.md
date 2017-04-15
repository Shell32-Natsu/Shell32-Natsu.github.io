---
title: LeetCode 404. Sum of Left Leaves
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 802.html
id: 802
categories:
  - LeetCode
date: 2016-09-26 16:00:42
---
题目描述:

> Find the sum of all left leaves in a given binary tree.
>
> **Example:**
>
> ```
>     3
>    / \
>   9  20
>     /  \
>    15   7
>
> There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.
> ```

用DFS找出所有左叶子节点再求和即可.

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
    int sum;
public:
    int sumOfLeftLeaves(TreeNode* root) {
        sum = 0;
        DFS(root, false);
        return sum;
    }
    
    void DFS(TreeNode *node, bool left){
        if(!node) return;
        if(!node->left && !node->right && left){
            sum += node->val;
            return;
        }
        DFS(node->left, true);
        DFS(node->right, false);
    }
};
```

