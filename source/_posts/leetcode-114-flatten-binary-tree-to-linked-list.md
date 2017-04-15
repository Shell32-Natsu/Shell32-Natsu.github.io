---
title: LeetCode 114. Flatten Binary Tree to Linked List
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 725.html
id: 725
categories:
  - LeetCode
date: 2016-09-08 15:53:41
---
题目描述:

> Given a binary tree, flatten it to a linked list in-place.
>
> For example,
> Given
>
> ```
>          1
>         / \
>        2   5
>       / \   \
>      3   4   6
>
> ```
>
> The flattened tree should look like:
>
> ```
>    1
>     \
>      2
>       \
>        3
>         \
>          4
>           \
>            5
>             \
>              6
> ```

题目中其实并没有说清楚怎么flatten的, 但是观察给的例子后可以发现是把一个节点的左子树插到右子树之前, 原来的右子树放到左子树的最右端叶子节点的右子树位置.

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
    void flatten(TreeNode* root) {
        TreeNode *p = root;
        while(p){
            if(p->left){
                TreeNode *right = p->right;
                p->right = p->left;
                p->left = nullptr;
                leftNode(p)->right = right;
            }
            p = p->right;
        }
    }
    
    TreeNode* leftNode(TreeNode *root){
        if(!root) return nullptr;
        TreeNode *p = root;
        while(p->right){
            p = p->right;
        }
        return p;
    }
};
```

