---
title: LeetCode 113. Path Sum II
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 723.html
id: 723
categories:
  - LeetCode
date: 2016-09-07 15:58:48
---
题目描述:

> Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.
>
> For example:
>
> Given the below binary tree and 
>
> ```
> sum = 22
> ```
>
> ,
>
> ```
>               5
>              / \
>             4   8
>            /   / \
>           11  13  4
>          /  \    / \
>         7    2  5   1
>
> ```
>
> return
>
> ```
> [
>    [5,4,11,2],
>    [5,8,4,5]
> ]
> ```

与[上一题](http://xiadong.info/2016/09/leetcode-112-path-sum/)类似, 只不过在DFS的过程中维护一个路径path, 保存从根节点到当前节点的值, 抵达叶子节点并且path中元素的和与sum相等时就把它加到结果中.

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
    vector<vector<int>> ret;
public:
    vector<vector<int>> pathSum(TreeNode* root, int sum) {
        vector<int> path;
        DFS(root, 0, sum, path);
        return ret;
    }
    
    void DFS(TreeNode *node, int n, int sum, vector<int> &path){
        if(!node){
            return;
        }
        path.push_back(node->val);
        if(!node->left && !node->right){
            if(n + node->val == sum){
                ret.push_back(path);
            }
        }
        else if(!node->left && node->right){
            DFS(node->right, node->val + n, sum, path);
        }
        else if(node->left && !node->right){
            DFS(node->left, node->val + n, sum, path);
        }
        else{
            DFS(node->left, node->val + n, sum, path);
            DFS(node->right, node->val + n, sum, path);
        }
        path.pop_back();
    }
};
```

