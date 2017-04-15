---
title: LeetCode 92. Reverse Linked List II
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 658.html
id: 658
categories:
  - LeetCode
date: 2016-08-21 17:17:57
---
题目描述:

> Reverse a linked list from position *m* to *n*. Do it in-place and in one-pass.
>
> For example:
> Given `1->2->3->4->5->NULL`, *m* = 2 and *n* = 4,
>
> return `1->4->3->2->5->NULL`.
>
> **Note:**
> Given *m*, *n* satisfy the following condition:
> 1 ≤ *m* ≤ *n* ≤ length of list.

在只遍历一次并且不使用额外存储空间的情况下反转单向链表中第m个节点到第n个节点中的节点. 这道题目要求只遍历一次并且不使用额外空间, 那么就要用两个指针来记录当前节点与前一节点, 对于m与n之间的节点, 将当前节点指向前一节点. 第m-1个节点和第n+1个节点在最后处理.

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
    ListNode* reverseBetween(ListNode* head, int m, int n) {
        ListNode *start, *end, *p = head, *prev = nullptr, *startPrev = nullptr;
        int i = 0;
        while(p != nullptr){ // 查找翻转开始的节点
            i++;
            if(i == m){
                start = p;
                startPrev = prev;
                break;
            }
            prev = p;
            p = p->next;
        }
        
        p = start;
        ListNode *pp = p->next;
        
        while(i != n){ // 翻转节点
            ListNode *tmp = pp->next;
            pp->next = p;
            p = pp;
            pp = tmp;
            i++;
        }
        
        start->next = pp; // 翻转后的头结点
        if(startPrev){ // 判断是不是从第一个节点开始翻转
            startPrev->next = p;
            return head;
        }
        else
            return p;
    }
};
```

