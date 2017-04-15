---
title: LeetCode 109. Convert Sorted List to Binary Search Tree
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
  - 链表
url: 706.html
id: 706
categories:
  - LeetCode
date: 2016-09-04 15:45:21
---
题目描述:

> Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
>

最简单的方法就是遍历一次链表, 把每个节点的值放入一个数组中, 然后就变成了[上一题](http://xiadong.info/2016/09/leetcode-108-convert-sorted-array-to-binary-search-tree/). 

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
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
    TreeNode* sortedListToBST(ListNode* head) {
        deque<int> nums;
        ListNode *p = head;
        while(p){
            nums.push_back(p->val);
            p = p->next;
        }
        return buildBST(nums, 0, nums.size());
    }
    
    TreeNode* buildBST(deque<int> &nums, int left, int right){
        if(left >= right) return nullptr;
        
        int mid = (left + right) / 2;
        TreeNode* node = new TreeNode(nums[mid]);
        node->left = buildBST(nums, left, mid);
        node->right = buildBST(nums, mid + 1, right);
        return node;
    }
};
```

如果不使用辅助空间, 就要实现一个根据节点距头结点的距离来获取节点的函数. 这样的话每次访问节点都要遍历一部分链表.

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
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
    TreeNode* sortedListToBST(ListNode* head) {
        int len = 0;
        ListNode *p = head;
        while(p){
            len++;
            p = p->next;
        }
        return buildBST(head, len);
    }
    
    TreeNode* buildBST(ListNode *head, int len){
        if(len <= 0) return nullptr;
        
        int mid = len / 2;
        ListNode *n = getNode(head, mid);
        
        TreeNode* node = new TreeNode(n->val);
        node->left = buildBST(head, mid);
        node->right = buildBST(n->next, len - mid - 1);
        return node;
    }
    
    ListNode* getNode(ListNode *head, int index){
        int i = index;
        while(head && index > 0){
            head = head->next;
            index--;
        }
        return head;
    }
};
```

