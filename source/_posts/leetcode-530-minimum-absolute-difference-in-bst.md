---
title: LeetCode 530. Minimum Absolute Difference in BST
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 1152.html
id: 1152
categories:
  - LeetCode
date: 2017-03-04 15:47:35
---
题目描述：

> Given a binary search tree with non-negative values, find the minimum [absolute difference](https://en.wikipedia.org/wiki/Absolute_difference) between values of any two nodes.
>
> **Example:**
>
> ```
> Input:
>
>    1
>     \
>      3
>     /
>    2
>
> Output:
> 1
>
> Explanation:
> The minimum absolute difference is 1, which is the difference between 2 and 1 (or between 2 and 3).
>
> ```
>
> **Note:** There are at least two nodes in this BST.

一个只包含非负元素的二叉搜索树中找到两个元素之间的最小差的绝对值。因为是二叉搜索树所以用中序遍历就可以得到一个有序序列，最小的差值一定是出现在相邻的元素中，只比较相邻元素的差值即可。

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
    int ans = INT_MAX;
    int prevVal = -1;
public:
    int getMinimumDifference(TreeNode* root) {
        inOrder(root);
        return ans;
    }
    
    void inOrder (TreeNode *node) {
        if (!node) return ;
        inOrder(node->left);
        if(prevVal >= 0) ans = min (ans, node->val - prevVal);
        prevVal = node->val;
        inOrder(node->right);
    }
};
```

