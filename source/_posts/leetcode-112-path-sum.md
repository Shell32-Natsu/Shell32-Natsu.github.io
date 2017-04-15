---
title: LeetCode 112. Path Sum
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 721.html
id: 721
categories:
  - LeetCode
date: 2016-09-07 15:47:29
---
题目描述:

> Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.
>
> For example:
>
> Given the below binary tree and 
>
> ```
> sum = 22
> ```
>
> ,
>
> ```
>               5
>              / \
>             4   8
>            /   / \
>           11  13  4
>          /  \      \
>         7    2      1
>
> ```
>
> return true, as there exist a root-to-leaf path `5->4->11->2` which sum is 22.

深度优先搜索就可以了.

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
    bool hasPathSum(TreeNode* root, int sum) {
        return DFS(root, 0, sum);
    }
    
    bool DFS(TreeNode *node, int n, int sum){
        if(!node){
            return false;
        }
        if(!node->left && !node->right){
            if(n + node->val == sum)
                return true;
            else
                return false;
        }
        if(!node->left && node->right){
            return DFS(node->right, node->val + n, sum);
        }
        if(node->left && !node->right){
            return DFS(node->left, node->val + n, sum);
        }
        if(node->left && node->right){
            return DFS(node->left, node->val + n, sum) || DFS(node->right, node->val + n, sum);
        }
    }
};
```

