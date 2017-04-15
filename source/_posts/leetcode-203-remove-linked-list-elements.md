---
title: LeetCode 203. Remove Linked List Elements
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 1007.html
id: 1007
categories:
  - LeetCode
date: 2016-12-06 18:20:03
---
题目描述:

> Remove all elements from a linked list of integers that have value **val**.
>
> **Example**
> **Given:** 1 --> 2 --> 6 --> 3 --> 4 --> 5 --> 6, **val** = 6
> **Return:** 1 --> 2 --> 3 --> 4 --> 5

就是单纯的删除链表节点.

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
    ListNode* removeElements(ListNode* head, int val) {
        if(!head) return head;
        ListNode *p = new ListNode(0), *h = p;
        p->next = head;
        while(p && p->next){
            if(p->next->val == val){
                p->next = p->next->next;
            }
            else
                p = p->next;
        }
        return h->next;
    }
};
```

