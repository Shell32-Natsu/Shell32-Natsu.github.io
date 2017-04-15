---
title: LeetCode 144. Binary Tree Preorder Traversal
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 842.html
id: 842
categories:
  - LeetCode
date: 2016-10-05 15:41:32
---
题目描述:

> Given a binary tree, return the *preorder* traversal of its nodes' values.
>
> For example:
> Given binary tree `{1,#,2,3}`,
>
> ```
>    1
>     \
>      2
>     /
>    3
>
> ```
>
> return `[1,2,3]`.
>
> **Note:** Recursive solution is trivial, could you do it iteratively?

二叉树非递归前序遍历. 需要背下来的代码了......

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
    vector<int> preorderTraversal(TreeNode *root) {
        vector<TreeNode*> path;
        vector<int> ret;
        if(root == NULL) return ret;
        TreeNode *node = root;

        while(node || !path.empty()){
            if(node){
                ret.push_back(node->val);
                path.push_back(node);
                node = node->left;
            }
            else{
                node = path.back();
                path.pop_back();
                node = node->right;
            }
        }

        return ret;
    }
};
```

