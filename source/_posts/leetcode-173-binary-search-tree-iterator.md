---
title: LeetCode 173. Binary Search Tree Iterator
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 931.html
id: 931
categories:
  - LeetCode
date: 2016-10-31 16:56:46
---
题目描述:

> Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.
>
> Calling `next()` will return the next smallest number in the BST.
>
> **Note: **`next()` and `hasNext()` should run in average O(1) time and uses O(*h*) memory, where *h* is the height of the tree.

二叉树的非递归中序遍历, 只不过不是放在循环中, 而是通过next来触发每一步的进行.

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
class BSTIterator {
    TreeNode *BST, *curNode;
    vector<TreeNode*> path;
public:
    BSTIterator(TreeNode *root) {
        BST = root;
        mostLeft(root);
        curNode = nullptr;
    }
    
    TreeNode* mostLeft(TreeNode *root){
        TreeNode *node = root;
        while(node) {
            path.push_back(node);
            node = node->left;
        }
        return node;
    }

    /** @return whether we have a next smallest number */
    bool hasNext() {
        if(path.empty() && !curNode) return false;
        else return true;
    }

    /** @return the next smallest number */
    int next() {
        //curNode = path.back();
        int ans;
        if(!curNode){
            ans = path.back()->val;
            curNode = path.back()->right;
            path.pop_back();
        }
        else{
            mostLeft(curNode);
            ans = path.back()->val;
            curNode = path.back()->right;
            path.pop_back();
        }
        //cout<<ans<<endl;
        return ans;
    }
};

/**
 * Your BSTIterator will be called like this:
 * BSTIterator i = BSTIterator(root);
 * while (i.hasNext()) cout << i.next();
 */
```

