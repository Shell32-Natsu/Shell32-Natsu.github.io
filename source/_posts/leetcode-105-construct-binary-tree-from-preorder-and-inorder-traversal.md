---
title: LeetCode 105. Construct Binary Tree from Preorder and Inorder Traversal
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 697.html
id: 697
categories:
  - LeetCode
date: 2016-09-01 15:36:49
---
题目描述:

> Given preorder and inorder traversal of a tree, construct the binary tree.
>
> **Note:**
> You may assume that duplicates do not exist in the tree.

通过中序遍历序列和先序遍历序列来还原一颗二叉树. 由于题目指出可以假设树中不存在重复元素, 所以在先序序列的第一个元素就是根节点的值, 然后再中序序列中找到这个值就可以把中序序列划分为左子树的中序序列和右子树的中序序列, 并且得到左右子树的节点数量, 根据节点数量就可以把先序序列划分开来. 然后就可以通过递归来分别构建左右子树.

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
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        if(preorder.empty()) return nullptr;
        return buildBinaryTree(preorder, 0, preorder.size(), inorder, 0, inorder.size());
    }
    
    TreeNode* buildBinaryTree(vector<int> &preorder, int preLeft, int preRight, vector<int> &inorder, int inLeft, int inRight){
        if(preLeft >= preRight || inLeft >= inRight) return nullptr;
        TreeNode *node = new TreeNode(preorder[preLeft]);
        int rootPosInOrder;
        for(int i = inLeft; i < inRight; i++){
            if(inorder[i] == node->val){
                rootPosInOrder = i;
                break;
            }
        }
        int leftNum = rootPosInOrder - inLeft, rightNum = inRight - rootPosInOrder - 1;
        node->left = buildBinaryTree(preorder, preLeft + 1, preLeft + 1 + leftNum, inorder, inLeft, inLeft + leftNum);
        node->right = buildBinaryTree(preorder, preLeft + 1 + leftNum, preRight, inorder, inLeft + leftNum + 1, inRight);
        return node;
    }
};
```

