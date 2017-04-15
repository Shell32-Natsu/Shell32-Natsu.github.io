---
title: LeetCode 124. Binary Tree Maximum Path Sum
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 764.html
id: 764
categories:
  - LeetCode
date: 2016-09-17 16:04:59
---
题目描述:

> Given a binary tree, find the maximum path sum.
>
> For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path does not need to go through the root.
>
> For example:
> Given the below binary tree,
>
> ```
>        1
>       / \
>      2   3
>
> ```
>
> Return `6`.

这道题我一开始是先用DFS来搜索出所有节点到根节点的路径, 然后再用双重循环来计算出每对节点的路径和. 如果有n个节点的话, 这个方法的时间复杂度是O(n<sup>2</sup>), 所以超时了.

后来发现了递归的方法. 对于一个二叉树的根节点来说, 这棵树中的最长路径和要么经过它, 要么经过它的后代, 所以我们就可以算出经过根节点的最长路径和是多少, 然后对每一个节点都计算一遍就可以找出最长的路径和. 

在递归过程中, 除了维护一个最终的最长路径和以外, 我们还要知道每个节点的左右子树到该节点的最长路径和(注意, 这里的路径必须有一端是该节点)才能找出经过该节点的最长路径和. 

同时还要注意路径和与0的大小关系, 如果到某节点的路径和小于0, 那么就不应该把这部分路径包含进去.

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
    int maxPath = INT_MIN;
public:
    int maxPathSum(TreeNode* root) {
        DFS(root);
        return maxPath;
    }
    
    int DFS(TreeNode *root){
        if(!root) return 0;
        int leftPath = DFS(root->left), rightPath = DFS(root->right);
        // 经过root节点的路径的四种情况, 选择最大的.
        maxPath = max(maxPath, (leftPath + rightPath + root->val));
        maxPath = max(maxPath, root->val);
        maxPath = max(maxPath, root->val + leftPath);
        maxPath = max(maxPath, root->val + rightPath);
        // 如果左右子树都小于0, 那么应该只返回root节点的值
        return root->val + max(0, max(leftPath, rightPath));
    }
};
```

