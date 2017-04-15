---
title: LeetCode 99. Recover Binary Search Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 677.html
id: 677
categories:
  - LeetCode
date: 2016-08-28 18:20:50
---
题目描述:

> Two elements of a binary search tree (BST) are swapped by mistake.
>
> Recover the tree without changing its structure.
>
> Note:
> A solution using O(n) space is pretty straight forward. Could you devise a constant space solution?

使用O(n)辅助空间的方法就是使用中序遍历从BST中获得一个有序递增的序列, 但是其中有两个元素的位置交换了. 被交换的元素的特征就是前一个元素大于后一个元素, 找到这样两个元素再把它们交换回来即可, 如果只找到了一个这样的元素, 说明是相邻的两个元素交换了.

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
    deque<TreeNode*> seq;
public:
    void recoverTree(TreeNode* root) {
        inOrder(root);
        vector<int> mistakeNodes;
        for(int i = 0; i < seq.size() - 1; i++){
            if(seq[i]->val > seq[i + 1]->val){
                mistakeNodes.push_back(i);
            }
        }
        if(mistakeNodes.size() == 1){
            swap(seq[mistakeNodes[0]]->val, seq[mistakeNodes[0] + 1]->val);
        }
        else{
            swap(seq[mistakeNodes[0]]->val, seq[mistakeNodes[1] + 1]->val);
        }
    }
    
    void inOrder(TreeNode *root){
        if(root == nullptr) return;
        inOrder(root->left);
        seq.push_back(root);
        inOrder(root->right);
    }
};
```

而把这一思路推广到不使用辅助空间, 很容易就可以发现我们并不需要一个完整的序列, 只需要相邻两个值的大小关系, 所以我们只要在遍历过程中维持两个节点值即可. 另外由于我们没有完整的序列, 所以在mistakeNodes中要同时保存前一个元素比后一个元素大的这两个元素, 因为对于被交换的较小值来说, 它在后一个元素的位置, 而对于较大值来说, 它位于前一个元素的位置. 当然也可以通过判断mistakeNodes中是否已经有元素来避免同时保存.

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
    vector<TreeNode*> mistakeNodes;
    vector<TreeNode*> tmpNodes;
public:
    void recoverTree(TreeNode* root) {
        tmpNodes.resize(2);
        inOrder(root);
        if(mistakeNodes.size() == 2){
            swap(mistakeNodes[0]->val, mistakeNodes[1]->val);
        }
        else{
            swap(mistakeNodes[0]->val, mistakeNodes[3]->val);
        }
    }
    
    void inOrder(TreeNode *root){
        if(root == nullptr || mistakeNodes.size() == 4) return ;
        inOrder(root->left);
        tmpNodes[0] = tmpNodes[1];
        tmpNodes[1] = root;
        if(tmpNodes[0] && tmpNodes[0]->val > tmpNodes[1]->val){
            mistakeNodes.push_back(tmpNodes[0]);
            mistakeNodes.push_back(tmpNodes[1]);
        }
        inOrder(root->right);
    }
};
```

