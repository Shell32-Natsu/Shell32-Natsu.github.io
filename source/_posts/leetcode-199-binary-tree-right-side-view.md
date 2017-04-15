---
title: LeetCode 199. Binary Tree Right Side View
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 996.html
id: 996
categories:
  - LeetCode
date: 2016-12-04 18:54:59
---
题目描述:

> Given a binary tree, imagine yourself standing on the *right* side of it, return the values of the nodes you can see ordered from top to bottom.
>
> For example:
> Given the following binary tree,
>
> ```
>    1            <---
>  /   \
> 2     3         <---
>  \     \
>   5     4       <---
>
> ```
>
> You should return `[1, 3, 4]`.

我用DFS对二叉树进行遍历, 先遍历右节点再遍历左节点. 把每次遍历到的新的一层的第一个节点加入结果中.

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
    vector<int> rightSideView(TreeNode* root) {
        if(!root) return vector<int>();
        vector<int> ans;
        DFS(root, ans, 1);
        return ans;
    }
    
    void DFS(TreeNode *node, vector<int> &ans, int level){
        if(!node) return;
        if(level > ans.size()){
            ans.push_back(node->val);
        }
        DFS(node->right, ans, level + 1);
        DFS(node->left, ans, level + 1);
    }
};
```

