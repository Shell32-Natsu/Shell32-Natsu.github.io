---
title: LeetCode 145. Binary Tree Postorder Traversal
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 846.html
id: 846
categories:
  - LeetCode
date: 2016-10-06 15:57:30
---
题目描述:

> Given a binary tree, return the *postorder* traversal of its nodes' values.
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
> return `[3,2,1]`.
>
> **Note:** Recursive solution is trivial, could you do it iteratively?

非递归后序遍历.

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
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> ans;
        if(!root) return ans;
        vector<TreeNode*> stack = {root};
        
        while(!stack.empty()){
            TreeNode* n = stack.back();
            stack.pop_back();
            ans.push_back(n->val);
            if(n->left) stack.push_back(n->left);
            if(n->right) stack.push_back(n->right);
        }
        reverse(ans.begin(), ans.end());
        
        return ans;
    }
};
```

