---
title: LeetCode 508. Most Frequent Subtree Sum
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 哈希表
  - 算法
url: 1136.html
id: 1136
categories:
  - LeetCode
date: 2017-02-21 18:26:05
---
题目描述：

> Given the root of a tree, you are asked to find the most frequent subtree sum. The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself). So what is the most frequent subtree sum value? If there is a tie, return all the values with the highest frequency in any order.
>
> **Examples 1**
> Input:
>
> ```
>   5
>  /  \
> 2   -3
>
> ```
>
> return [2, -3, 4], since all the values happen only once, return all of them in any order.
>
> **Examples 2**
> Input:
>
> ```
>   5
>  /  \
> 2   -5
>
> ```
>
> return [2], since 2 happens twice, however -5 only occur once.
>
> **Note:** You may assume the sum of values in any subtree is in the range of 32-bit signed integer.

用递归来计算每个节点的subtree sum，然后用哈希表保存每个sum的出现次数。

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
    unordered_map<int, int> sumFreq;
    int maxSumFreq = INT_MIN;
public:
    vector<int> findFrequentTreeSum(TreeNode* root) {
        DFS_sum(root);
        vector<int> ans;
        for (auto i : sumFreq) {
            if (i.second == maxSumFreq) 
                ans.push_back(i.first);
        }
        return ans;
    }
    
    int DFS_sum(TreeNode *node) {
        if (node == nullptr) {
            return 0;
        }
        int sum = DFS_sum(node->left) + DFS_sum(node->right) + node->val;
        maxSumFreq = max(maxSumFreq, ++sumFreq[sum]);
        return sum;
    }
};
```

