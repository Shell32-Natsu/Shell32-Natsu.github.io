---
title: LeetCode 108. Convert Sorted Array to Binary Search Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 704.html
id: 704
categories:
  - LeetCode
date: 2016-09-04 15:31:18
---
题目描述;

> Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
>

根据有序数组来构建一颗平衡二叉搜索树. 比较直观的方法就是选择给定数组的中间位置的元素作为根节点的值, 然后把左边和右边的元素分别递归地生成左右子树, 这样可以保证高度平衡.

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
    TreeNode *sortedArrayToBST(vector<int> &num) {
        if(num.size() == 0)return NULL;
        
        return sortedArrayToBSTImpl(num, 0, num.size());
    }
    
    TreeNode* sortedArrayToBSTImpl(vector<int> &num, int start, int end){
        if(end <= start)return NULL;
        int mid = (start + end) / 2;
        TreeNode *root = new TreeNode(num[mid]);
        
        root->left = sortedArrayToBSTImpl(num, start, mid);
        root->right = sortedArrayToBSTImpl(num, mid + 1, end);
        
        return root;
    }
};
```

