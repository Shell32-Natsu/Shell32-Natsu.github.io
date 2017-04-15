---
title: LeetCode 94. Binary Tree Inorder Traversal
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 栈
  - 算法
url: 664.html
id: 664
categories:
  - LeetCode
date: 2016-08-22 21:09:52
---
题目描述:

> Given a binary tree, return the *inorder* traversal of its nodes' values.
>
> For example:
> Given binary tree `[1,null,2,3]`,
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
> return `[1,3,2]`.
>
> **Note:** Recursive solution is trivial, could you do it iteratively?

返回一个树的中序遍历序列, 既然题目要求不用递归用迭代, 那么就可以使用栈来模拟递归. 因为使用栈来模拟无法直到栈顶的节点的左子树有没有访问过, 所以还要同时记录每个节点的状态. 我用-1表示未访问左子树, 0表示已访问左子树未访问右子树, 1表示左右子树都已经访问过.

一开始我用vector来作为栈使用, 运行时间4ms, 查看discuss后换用deque运行时间变为0ms. vector在分配的内存不够的情况下的扩充操作真的开销很大.

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
    vector<int> inorderTraversal(TreeNode *root) {
        deque<TreeNode*> path;
        deque<int> nodeState;
        vector<int> ret;
        if(root == NULL) return ret;
        
        path.push_back(root);
        nodeState.push_back(-1);
        
        TreeNode *node;
        while(!path.empty()){
            node = path.back();
            if(nodeState.back() == 1){
                path.pop_back();
                nodeState.pop_back();
            }
            else if(node->left && nodeState.back() == -1){
                nodeState.back() = 0;
                path.push_back(node->left);
                nodeState.push_back(-1);
            }
            else if(!node->left && nodeState.back() == -1){
                nodeState.back() = 0;
            }
            else if(node->right && nodeState.back() == 0){
                ret.push_back(node->val);
                nodeState.back() = 1;
                path.push_back(node->right);
                nodeState.push_back(-1);
            }
            else{
                ret.push_back(node->val);
                nodeState.back() = 1;
            }
            
        }

        return ret;
    }
};
```

