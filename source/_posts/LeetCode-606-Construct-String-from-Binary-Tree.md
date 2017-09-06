---
title: LeetCode 606. Construct String from Binary Tree
date: 2017-08-25 09:15:23
tags:
 - LeetCode
 - CPP
 - 算法
 - 二叉树
categories:
 - LeetCode
---

You need to construct a string consists of parenthesis and integers from a binary tree with the preorder traversing way.

The null node needs to be represented by empty parenthesis pair "()". And you need to omit all the empty parenthesis pairs that don't affect the one-to-one mapping relationship between the string and the original binary tree.

**Example 1:**

```
Input: Binary tree: [1,2,3,4]
       1
     /   \
    2     3
   /    
  4     

Output: "1(2(4))(3)"

Explanation: Originallay it needs to be "1(2(4)())(3()())", 
but you need to omit all the unnecessary empty parenthesis pairs. 
And it will be "1(2(4))(3)".

```

**Example 2:**

```
Input: Binary tree: [1,2,3,null,4]
       1
     /   \
    2     3
     \  
      4 

Output: "1(2()(4))(3)"

Explanation: Almost the same as the first example, 
except we can't omit the first parenthesis pair to break the one-to-one mapping relationship between the input and the output.
```

<!-- more -->

---------------

把一颗二叉树用前序遍历的方法序列化成一个字符串，但是除了节点的值以外，还要用括号来表示子节点的信息，而且不能有歧义，要能完全反序列化成原来的二叉树，也不能有多余的括号。

关于括号的问题的问题其实就是右子树不为空时左子树的括号不能省略，其他情况下都不用为空节点添加括号。

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
    string ans;
public:
    string tree2str(TreeNode* t) {
        tree2strImpl(t);
        return string(ans.begin() + 1, ans.end() - 1);
    }
    
    void tree2strImpl(TreeNode* t) {
        ans += "(";
        if (t != nullptr) {
            ans += to_string(t->val);
            if (t->left || t->right) {
                tree2strImpl(t->left);
                if (t->right) tree2strImpl(t->right);
            }
        }
        ans += ")";
    }
};
```

