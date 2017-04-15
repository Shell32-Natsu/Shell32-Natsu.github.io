---
title: LeetCode 102. Binary Tree Level Order Traversal
tags:
  - CPP
  - LeetCode
  - 搜索
  - 算法
url: 688.html
id: 688
categories:
  - LeetCode
date: 2016-08-31 16:43:21
---
题目描述:

> Given a binary tree, return the *level order* traversal of its nodes' values. (ie, from left to right, level by level).
>
> For example:
> Given binary tree `[3,9,20,null,null,15,7]`,
>
> ```
>     3
>    / \
>   9  20
>     /  \
>    15   7
>
> ```
>
> return its level order traversal as:
>
> ```
> [
>   [3],
>   [9,20],
>   [15,7]
> ]
> ```

我的方法是使用广度优先搜索遍历每一个节点并计算出每一个节点的level值, 然后再遍历一次节点把节点放到相应的level中去. 时间和空间复杂度都是O(n).

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
    vector<vector<int>> levelOrder(TreeNode* root) {
        if(!root){
            return vector<vector<int>>();
        }
        // 用于BFS的队列, qLevel用于保存BFS中相应节点的level
        queue<TreeNode*> BFS;
        queue<int> qLevel;
        // 把遍历到的每一个节点都放到vector中保存, 用于最后汇总
        vector<int> level;
        vector<TreeNode*> nodes;
        
        BFS.push(root);
        qLevel.push(0);
        int maxLevel = 0;
        nodes.push_back(root);
        level.push_back(0);
        while(!BFS.empty()){
            TreeNode* node = BFS.front();
            int currentLevel = qLevel.front();
            if(node->left){
                BFS.push(node->left);
                qLevel.push(currentLevel + 1);
                nodes.push_back(node->left);
                level.push_back(currentLevel + 1);
            }
            if(node->right){
                BFS.push(node->right);
                qLevel.push(currentLevel + 1);
                nodes.push_back(node->right);
                level.push_back(currentLevel + 1);
            }
            if(currentLevel + 1 > maxLevel) maxLevel = currentLevel + 1;
            BFS.pop();
            qLevel.pop();
        }
        // 再次遍历节点并放到相应的level中去
        vector<vector<int>> re(maxLevel);
        for(int i = 0; i < nodes.size(); i++){
            re[level[i]].push_back(nodes[i]->val);
        }
        return re;
    }
};
```

