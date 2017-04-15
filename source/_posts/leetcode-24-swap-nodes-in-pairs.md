---
title: LeetCode 24. Swap Nodes in Pairs
url: 440.html
id: 440
categories:
  - LeetCode
date: 2016-07-18 18:18:47
tags:
---
﻿题目描述:

> Given a linked list, swap every two adjacent nodes and return its head.
> 
> For example,
> Given `1->2->3->4`, you should return the list as `2->1->4->3`.
> 
> Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.

交换链表相邻节点。

C++:

    class Solution {
    public:
        ListNode *swapPairs(ListNode *head) {
            if(head == NULL || head->next == NULL) return head;
            ListNode *first = head, *second = head->next, *prev = NULL;
            first->next = second->next;
            second->next = first;
            head = second;
            prev = first;
            first = first->next;
            while(first){
                second = first->next;
                if(second == NULL)break;
                first->next = second->next;
                second->next = first;
                prev->next = second;
                prev = first;
                first = first->next;
            }
            return head;
        }
    };

时间4ms。