---
title: LeetCode 563. Binary Tree Tilt
date: 2017-04-24 18:37:02
tags:
 - LeetCode
 - CPP
 - 算法
 - 二叉树
 - 递归
categories:
 - LeetCode
---

题目描述：

Given a binary tree, return the tilt of the **whole tree**.

The tilt of a **tree node** is defined as the **absolute difference** between the sum of all left subtree node values and the sum of all right subtree node values. Null node has tilt 0.

The tilt of the **whole tree** is defined as the sum of all nodes' tilt.

**Example:**


```
Input: 
     1
   /   \
  2     3
Output: 1
Explanation: 
Tilt of node 2 : 0
Tilt of node 3 : 0
Tilt of node 1 : |2-3| = 1
Tilt of binary tree : 0 + 0 + 1 = 1
```



**Note:**

1. The sum of node values in any subtree won't exceed the range of 32-bit integer.
2. All the tilt values won't exceed the range of 32-bit integer.

------------------------

使用递归来分别计算左右子树。

<!-- more -->

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
    int findTilt(TreeNode* root) {
        tilt(root);
        return ans;
    }
    
    int tilt(TreeNode *node) {
        if (!node) return 0;
        int leftTilt = tilt(node->left);
        int rightTilt = tilt(node->right);
        int tilt = abs(leftTilt - rightTilt);
        ans += tilt;
        return leftTilt + rightTilt + node->val;
    }
};
```

