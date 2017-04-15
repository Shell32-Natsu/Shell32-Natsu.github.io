---
title: LeetCode 501. Find Mode in Binary Search Tree
tags:
  - BST
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 1115.html
id: 1115
categories:
  - CPP
date: 2017-02-03 18:24:00
---
题目描述：

> Given a binary search tree (BST) with duplicates, find all the [mode(s)](https://en.wikipedia.org/wiki/Mode_(statistics)) (the most frequently occurred element) in the given BST.
>
> Assume a BST is defined as follows:
>
> - The left subtree of a node contains only nodes with keys **less than or equal to** the node's key.
> - The right subtree of a node contains only nodes with keys **greater than or equal to** the node's key.
> - Both the left and right subtrees must also be binary search trees.
>
> For example:
> Given BST `[1,null,2,2]`,
>
> ```
>    1
>     \
>      2
>     /
>    2
>
> ```
>
> return `[2]`.
>
> **Note:** If a tree has more than one mode, you can return them in any order.
>
> **Follow up:** Could you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).

使用Hash表可以快速解决。

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
    vector<int> ans;
    unordered_map<int, int> val;
    int maxOccur = 0;
public:
    vector<int> findMode(TreeNode* root) {
        inOrder(root);
        for (auto i : val) {
            if (i.second == maxOccur) 
                ans.push_back(i.first);
        }
        return ans;
    }
    
    void inOrder(TreeNode *node) {
        if(!node) return ;
        inOrder(node->left);
        maxOccur = max(maxOccur, ++val[node->val]);
        inOrder(node->right);
    }
};
```

在要求不使用额外存储空间的情况下，因为这是一棵BST，所以中序遍历结果是一个有序序列，问题就转化为在一个有序序列中连续出现次数最多的元素有哪些。除了维护结果集以外，还要维护结果集中元素的出现次数，上一个元素的值和当前元素的出现次数。当前元素的出现次数超过结果集中元素的出现次数后就清空结果集，然后增加当前元素。

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
    vector<int> ans;
    int lastElem = INT_MAX;
    int lastElemOccurTimes;
    int valInAnsOccurTimes = 0;
public:
    vector<int> findMode(TreeNode* root) {
        inOrder(root);
        return ans;
    }
    
    void inOrder(TreeNode *node) {
        if(!node) return ;
        inOrder(node->left);
        if (lastElem == node->val) {
            lastElemOccurTimes++;
        }
        else {
            lastElemOccurTimes = 1;
            lastElem = node->val;
        }
        
        if (lastElemOccurTimes == valInAnsOccurTimes) {
            ans.push_back(node->val);
        }
        else if (lastElemOccurTimes > valInAnsOccurTimes) {
            valInAnsOccurTimes = lastElemOccurTimes;
            ans.clear();
            ans.push_back(node->val);
        }
            
        inOrder(node->right);
    }
};
```

