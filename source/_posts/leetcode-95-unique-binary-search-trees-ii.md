---
title: LeetCode 95. Unique Binary Search Trees II
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 669.html
id: 669
categories:
  - LeetCode
date: 2016-08-24 16:08:00
---
题目描述:

> Given an integer *n*, generate all structurally unique **BST's** (binary search trees) that store values 1...*n*.
>
> For example,
> Given *n* = 3, your program should return all 5 unique BST's shown below.
>
> ```
>    1         3     3      2      1
>     \       /     /      / \      \
>      3     2     1      1   3      2
>     /     /       \                 \
>    2     1         2                 3
> ```

返回由1-n组成的所有可能的二叉搜索树. 先来复习一下二叉搜索树BST的定义:

1. 任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
2. 任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
3. 任意节点的左、右子树也分别为二叉查找树；
4. 没有键值相等的节点。

根据定义, 很容易想到通过递归的方法来产生所有可能的BST, 对于[1,n]n个节点, 从中取一个值1<=r<=n, 则属于[1, r)的值在左子树, 属于(r,n]的值在右子树, 再分别调用递归函数生成相应的左右子树.

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
    vector<TreeNode*> generateTrees(int n) {
        return buildBST(1, n + 1);
    }
    
    vector<TreeNode*> buildBST(int left, int right){
        vector<TreeNode*> re;
        if(left >= right){
            return re;
        }
        for(int i = left; i < right; i++){
            auto leftVector = buildBST(left, i);
            auto rightVector = buildBST(i + 1, right);
            for(int j = 0; j < leftVector.size(); j++){
                if(rightVector.empty()){
                    TreeNode* node = new TreeNode(i);
                    node->left = leftVector[j];
                    node->right = nullptr;
                    re.push_back(node);
                }
                else{
                    for(int k = 0; k < rightVector.size(); k++){
                        TreeNode* node = new TreeNode(i);
                        node->left = leftVector[j];
                        node->right = rightVector[k];
                        re.push_back(node);
                    }
                }
            }
            if(leftVector.empty()){
                if(rightVector.empty()){
                    TreeNode* node = new TreeNode(i);
                    node->left = nullptr;
                    node->right = nullptr;
                    re.push_back(node);
                }
                else{
                    for(int k = 0; k < rightVector.size(); k++){
                        TreeNode* node = new TreeNode(i);
                        node->left = nullptr;
                        node->right = rightVector[k];
                        re.push_back(node);
                    }
                }
            }
        }
        return re;
    }
};
```

