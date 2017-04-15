---
title: LeetCode 83. Remove Duplicates from Sorted List
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 630.html
id: 630
categories:
  - LeetCode
date: 2016-08-14 16:43:51
---
题目描述:

> Given a sorted linked list, delete all duplicates such that each element appear only *once*.
>
> For example,
> Given `1->1->2`, return `1->2`.
> Given `1->1->2->3->3`, return `1->2->3`.

删除连表中的重复元素, 比较简单. 要注意不能造成内存泄漏.

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *deleteDuplicates(ListNode *head) {
        ListNode *node = head, *true_next;
        
        while(node){
            while(node->next != NULL && node->next->val == node->val){
                ListNode *toDel = node->next;
                node->next = node->next->next;
                delete toDel;
            }
            node = node->next;
        }
        
        return head;
    }
};
```