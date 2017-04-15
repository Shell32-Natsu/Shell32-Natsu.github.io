---
title: LeetCode 515. Find Largest Value in Each Tree Row
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
url: 1140.html
id: 1140
categories:
  - LeetCode
date: 2017-02-21 18:34:36
---
题目描述：

> You need to find the largest value in each row of a binary tree.
>
> **Example:**
>
> ```
> Input: 
>
>           1
>          / \
>         3   2
>        / \   \  
>       5   3   9 
>
> Output: [1, 3, 9]
> ```

我使用BFS来遍历二叉树，这样可以保证一行的节点是连续出现的。对于每一行维护一个当前搜索到的最大值，当遇到下一行时说明这一行已经搜索完了，保存结果。

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
    vector<int> ans;
public:
    vector<int> largestValues(TreeNode* root) {
        if (root == nullptr) return ans;
        BFS(root);
        return ans;
    }
    
    void BFS(TreeNode *root) {
        queue<TreeNode*> nodeQueue;
        queue<int>       depthQueue;
        nodeQueue.push(root);
        depthQueue.push(0);
        
        int maxDepth = 0;
        int maxInDepth = root->val;
        while (!nodeQueue.empty()) {
            TreeNode *node = nodeQueue.front();
            nodeQueue.pop();
            int depth = depthQueue.front();
            depthQueue.pop();
            if (maxDepth < depth) {
                maxDepth = depth;
                ans.push_back(maxInDepth);
                maxInDepth = node->val;
            }
            else {
                maxInDepth = max(maxInDepth, node->val);
            }
            
            if (node->left) {
                nodeQueue.push(node->left);
                depthQueue.push(depth + 1);
            }
            if (node->right) {
                nodeQueue.push(node->right);
                depthQueue.push(depth + 1);
            }
        }
        ans.push_back(maxInDepth); // Last row
    }
};
```

