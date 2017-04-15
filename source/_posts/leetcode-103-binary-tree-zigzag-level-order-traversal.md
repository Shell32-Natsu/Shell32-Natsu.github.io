---
title: LeetCode 103. Binary Tree Zigzag Level Order Traversal
tags:
  - CPP
  - LeetCode
  - 搜索
  - 算法
url: 690.html
id: 690
categories:
  - LeetCode
date: 2016-08-31 16:50:16
---
题目描述:

> Given a binary tree, return the *zigzag level order* traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).
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
> return its zigzag level order traversal as:
>
> ```
> [
>   [3],
>   [20,9],
>   [15,7]
> ]
> ```

这道题与上一题[Binary Tree Level Order Traversal](http://xiadong.info/2016/08/leetcode-102-binary-tree-level-order-traversal/)非常相似, 只需要在BFS之后汇总的时候以正反方向间隔的形式放入level中即可. 我是全部正向放入之后再对偶数行颠倒来完成的.

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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if(!root) return vector<vector<int>>();
        vector<int> vals, level;
        generateMap(root, vals, level);
        int maxLevel = 0;
        for(int i = 0; i < level.size(); i++) if(maxLevel < level[i]) maxLevel = level[i];
        vector<vector<int>> re(maxLevel + 1);
        for(int i = 0; i < vals.size(); i++){
            re[level[i]].push_back(vals[i]);
        }
        
        for(int i = 1; i <= maxLevel; i += 2){
            reverse(re[i].begin(), re[i].end());
        }
        return re;
    }
    
    void generateMap(TreeNode* root, vector<int> &vals, vector<int> &level){
        queue<TreeNode*> nodes;
        queue<int> levels;
        nodes.push(root);
        levels.push(0);
        while(!nodes.empty()){
            TreeNode* p = nodes.front();
            int l = levels.front();
            vals.push_back(p->val);
            level.push_back(l);
            if(p->left){
                nodes.push(p->left);
                levels.push(l + 1);
            }
            if(p->right){
                nodes.push(p->right);
                levels.push(l + 1);
            }
            nodes.pop();
            levels.pop();
        }
    }
};
```

