---
title: LeetCode 116. Populating Next Right Pointers in Each Node
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 734.html
id: 734
categories:
  - LeetCode
date: 2016-09-09 15:28:58
---
题目描述:

> Given a binary tree
>
> ```
>     struct TreeLinkNode {
>       TreeLinkNode *left;
>       TreeLinkNode *right;
>       TreeLinkNode *next;
>     }
>
> ```
>
> Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.
>
> Initially, all next pointers are set to `NULL`.
>
> **Note:**
>
> - You may only use constant extra space.
> - You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).
>
> For example,
> Given the following perfect binary tree,
>
> ```
>          1
>        /  \
>       2    3
>      / \  / \
>     4  5  6  7
>
> ```
>
> After calling your function, the tree should look like:
>
> ```
>          1 -> NULL
>        /  \
>       2 -> 3 -> NULL
>      / \  / \
>     4->5->6->7 -> NULL
> ```

给一颗完全二叉树的每一个节点确定它同层中的下一个节点. 规则比较简单:

* 如果一个节点是父节点的左孩子, 那么它的next就是父节点的右孩子
* 如果一个节点是父节点的右孩子, 那么分两种情况:
  * 父节点的next为null, 则该节点的next为null
  * 父节点的next不为null, 则该节点的next为父节点next节点的左孩子

为了知道一个节点的父节点, 在函数参数中要同时把节点的父节点传入.

```cpp
/**
 * Definition for binary tree with next pointer.
 * struct TreeLinkNode {
 *  int val;
 *  TreeLinkNode *left, *right, *next;
 *  TreeLinkNode(int x) : val(x), left(NULL), right(NULL), next(NULL) {}
 * };
 */
class Solution {
public:
    void connect(TreeLinkNode *root, TreeLinkNode *parent = NULL) { // 与题目提供的函数原型略有不同S
        if(root == NULL)return;
        if(parent != NULL){
            if(root == parent->left){
                root->next = parent->right;
            }else if(root == parent->right){
                if(parent->next != NULL)root->next = parent->next->left;
                else root->next = NULL;
            }
        }
        connect(root->left, root);
        connect(root->right, root);
    }
};
```

