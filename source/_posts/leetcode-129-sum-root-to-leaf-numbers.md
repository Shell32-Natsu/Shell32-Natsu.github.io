---
title: LeetCode 129. Sum Root to Leaf Numbers
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 搜索
  - 算法
url: 788.html
id: 788
categories:
  - LeetCode
date: 2016-09-22 17:09:44
---
题目描述:

> Given a binary tree containing digits from `0-9` only, each root-to-leaf path could represent a number.
>
> An example is the root-to-leaf path `1->2->3` which represents the number `123`.
>
> Find the total sum of all root-to-leaf numbers.
>
> For example,
>
> ```
>     1
>    / \
>   2   3
>
> ```
>
> The root-to-leaf path `1->2` represents the number `12`.
> The root-to-leaf path `1->3` represents the number `13`.
>
> Return the sum = 12 + 13 = `25`.

简单的DFS获取所有从根节点到叶子节点的路径的问题.

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
    int sumNumbers(TreeNode* root) {
        if(!root) return 0;
        vector<int> sums;
        string path;
        getPath(root, path, sums);
        int sum = 0;
        for(int i = 0; i < sums.size(); i++){
            sum += sums[i];
        }
        return sum;
    }
    
    void getPath(TreeNode* root, string &path, vector<int> &sums){
        if(!root->left && !root->right){
            path.push_back(root->val + '0');
            sums.push_back(stoi(path));
            path.pop_back();
            return;
        }
        path.push_back(root->val + '0');
        if(root->left){
            getPath(root->left, path, sums);
        }
        if(root->right){
            getPath(root->right, path, sums);
        }
        path.pop_back();
    }
};
```

