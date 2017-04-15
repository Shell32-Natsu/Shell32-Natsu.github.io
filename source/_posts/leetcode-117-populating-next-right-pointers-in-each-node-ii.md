---
title: LeetCode 117. Populating Next Right Pointers in Each Node II
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 738.html
id: 738
categories:
  - LeetCode
date: 2016-09-09 15:43:17
---
题目描述:

> Follow up for problem "*Populating Next Right Pointers in Each Node*".
>
> What if the given tree could be any binary tree? Would your previous solution still work?
>
> **Note:**
>
> - You may only use constant extra space.
>
> For example,
> Given the following binary tree,
>
> ```
>          1
>        /  \
>       2    3
>      / \    \
>     4   5    7
>
> ```
>
> After calling your function, the tree should look like:
>
> ```
>          1 -> NULL
>        /  \
>       2 -> 3 -> NULL
>      / \    \
>     4-> 5 -> 7 -> NULL
> ```

这个问题仍然沿用[上一题](http://xiadong.info/2016/09/leetcode-116-populating-next-right-pointers-in-each-node/)的思路, 先对一个节点是父节点的左节点还是右节点分类. 然后再细分接下来的情况.

* 一个节点是父节点的左孩子:
  * 如果父节点有右孩子, 那么next就是右孩子
  * 如果父节点没有右孩子并且next为null, 那么该节点的next也为null
  * 如果父节点next不为null, 那么遍历父节点接下来的每一个next节点, 直到找到一个节点有孩子节点, 这个孩子节点是该节点的next. 如果找不到, 该节点的next节点为null
* 一个节点是父节点的右孩子
  * 父节点的next为null, 则该节点的next为null
  * 如果父节点next不为null, 那么遍历父节点接下来的每一个next节点, 直到找到一个节点有孩子节点, 这个孩子节点是该节点的next. 如果找不到, 该节点的next节点为null

由于对于每一层节点都是从左往右遍历的, 所以每一个父节点的所有后续next节点在处理孩子节点的时候都必须固定下来, 所以要采取从上到下, 从右到左的顺序来遍历二叉树.

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
    void connect(TreeLinkNode *root, TreeLinkNode *parent = NULL) {
        if(root == NULL)return;
        if(parent != NULL){
            if(root == parent->left){
                if(parent->right) root->next = parent->right;
                else if(!parent->next){
                    root->next = nullptr;
                }
                else{
                    TreeLinkNode* t = parent->next;
                    while(t && !(t->left || t->right)) t = t->next;
                    if(!t) root->next = nullptr;
                    else root->next = (t->left ? t->left : t->right);
                }
            }else if(root == parent->right){
                if(!parent->next){
                    root->next = nullptr;
                }
                else{
                    TreeLinkNode* t = parent->next;
                    while(t && !(t->left || t->right)) t = t->next;
                    if(!t) root->next = nullptr;
                    else root->next = (t->left ? t->left : t->right);
                }
            }
        }
        connect(root->right, root);
        connect(root->left, root);
    }
};
```

