---
title: LeetCode 437. Path Sum III
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 949.html
id: 949
categories:
  - LeetCode
date: 2016-11-05 18:28:51
---
题目描述:

> You are given a binary tree in which each node contains an integer value.
>
> Find the number of paths that sum to a given value.
>
> The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
>
> The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.
>
> **Example:**
>
> ```
> root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
>
>       10
>      /  \
>     5   -3
>    / \    \
>   3   2   11
>  / \   \
> 3  -2   1
>
> Return 3. The paths that sum to 8 are:
>
> 1.  5 -> 3
> 2.  5 -> 2 -> 1
> 3. -3 -> 11
> ```

这道题用很直接的遍历方法就可以AC, 所以才会是Easy. 我还想了很久有没有O(n)或者O(nlogn)的办法......

对于每一棵子树, 都计算从根节点开始的路径和有没有等于sum的, 这一步用DFS遍历所有路径. 然后递归地处理左子树和右子树.

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
    int ans = 0;
public:
    int pathSum(TreeNode* root, int sum) {
        if(!root) return 0;
        DFS(root, sum);
        pathSum(root->left, sum);
        pathSum(root->right, sum);
        return ans;
    }
    
    void DFS(TreeNode *node, int target){
        if(!node) return;
        target -= node->val;
        if(0 == target) ans++;
        DFS(node->left, target);
        DFS(node->right, target);
        target += node->val;
    }
};
```

