---
title: LeetCode 106. Construct Binary Tree from Inorder and Postorder Traversal
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 700.html
id: 700
categories:
  - LeetCode
date: 2016-09-01 16:24:48
---
题目描述:

> Given inorder and postorder traversal of a tree, construct the binary tree.
>
> **Note:**
> You may assume that duplicates do not exist in the tree.

与上一题[LeetCode 105. Construct Binary Tree from Preorder and Inorder Traversal](http://xiadong.info/2016/09/leetcode-105-construct-binary-tree-from-preorder-and-inorder-traversal/)非常相似, 只不过先序序列变成了后序序列, 实质上并没有什么变化, 仍然使用相同的方法.

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
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        return buildTreeImpl(inorder, 0, inorder.size(), postorder, 0, postorder.size());
    }
    
    TreeNode* buildTreeImpl(vector<int> &inorder, int inStart, int inEnd, vector<int> &postorder, int postStart, int postEnd){
        if(inStart == inEnd || postStart == postEnd) return nullptr;
        int rootVal = postorder[postEnd - 1];
        TreeNode *root = new TreeNode(rootVal);
        int leftLen, rightLen;
        for(int i = inStart; i < inEnd; i++){
            if(inorder[i] == rootVal){
                leftLen = i - inStart;
                break;
            }
        }
        rightLen = (inEnd - inStart - leftLen - 1);
        root->left = buildTreeImpl(inorder, inStart, inStart + leftLen, postorder, postStart, postStart + leftLen);
        root->right = buildTreeImpl(inorder, inStart + leftLen + 1, inEnd, postorder, postStart + leftLen, postEnd - 1);
        return root;
    }
};
```

