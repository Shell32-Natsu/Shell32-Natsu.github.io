---
title: LeetCode 617. Merge Two Binary Trees
date: 2017-08-25 09:25:05
tags:
 - LeetCode
 - CPP
 - 算法
 - 二叉树
categories:
 - LeetCode
---

Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not.

You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.

**Example 1:**

```
Input: 
	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7                  
Output: 
Merged tree:
	     3
	    / \
	   4   5
	  / \   \ 
	 5   4   7

```

**Note:** The merging process must start from the root nodes of both trees.

<!-- more -->

-----------------

同时遍历两棵二叉树就行了，两棵二叉树都是空时结果二叉树也为空，其他情况下继续遍历。

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
    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return nullptr;
        int val = 0;
        if (t1) val += t1->val;
        if (t2) val += t2->val;
        TreeNode *node = new TreeNode(val);
        TreeNode *t1next, *t2next;
        t1next = t1 ? t1->left : nullptr;
        t2next = t2 ? t2->left : nullptr;
        
        node->left = mergeTrees(t1next, t2next);
        
        t1next = t1 ? t1->right : nullptr;
        t2next = t2 ? t2->right : nullptr;
        
        node->right = mergeTrees(t1next, t2next);
        
        return node;
    }
};
```

