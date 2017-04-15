---
title: LeetCode 107. Binary Tree Level Order Traversal II
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 搜索
  - 算法
url: 702.html
id: 702
categories:
  - LeetCode
date: 2016-09-01 16:51:20
---
题目描述:

> Given a binary tree, return the *bottom-up level order* traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).
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
> return its bottom-up level order traversal as:
>
> ```
> [
>   [15,7],
>   [9,20],
>   [3]
> ]
> ```

先层次遍历, 然后将得到的二维数组颠倒顺序.

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
	vector<vector<int>> levelOrderBottom(TreeNode* root) {
        if(!root) return ret;
        BFS(root);
        reverse(ret.begin(), ret.end());
		return ret;
	}
	
	void BFS(TreeNode *root){
	    queue<TreeNode*> nodeQueue;
	    queue<int> levelQueue;
	    
	    nodeQueue.push(root);
	    levelQueue.push(0);
	    
	    while(!nodeQueue.empty()){
	        TreeNode *node = nodeQueue.front();
	        int nodeLevel = levelQueue.front();
	        nodeQueue.pop();
	        levelQueue.pop();
	        
	        if(nodeLevel >= ret.size()){
	            ret.resize(nodeLevel + 1);
	        }
	        ret[nodeLevel].push_back(node->val);
	        
	        if(node->left){
	            nodeQueue.push(node->left);
	            levelQueue.push(nodeLevel + 1);
	        }
	        if(node->right){
	            nodeQueue.push(node->right);
	            levelQueue.push(nodeLevel + 1);
	        }
	    }
	}
};
```

