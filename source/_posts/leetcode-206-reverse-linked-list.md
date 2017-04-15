---
title: LeetCode 206. Reverse Linked List
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 1035.html
id: 1035
categories:
  - LeetCode
date: 2016-12-07 17:50:36
---
题目描述:

> Reverse a singly linked list.

翻转一个单向链表, 就是从前往后依次翻转即可.

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
    ListNode* reverseList(ListNode* head) {
        if(!head) return NULL;
        ListNode *p1 = head, *p2 = head->next, *p = head->next;
        if(!p1 || !p2) return head;
        while(p2 && p1){
            ListNode *t = p2->next;
            p2->next = p1;
            p1 = p2;
            p2 = t;
        }
        head->next = NULL;
        return p1;
    }
};
```

