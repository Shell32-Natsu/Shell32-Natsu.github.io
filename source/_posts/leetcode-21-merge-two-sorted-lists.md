---
title: LeetCode 21. Merge Two Sorted Lists
url: 430.html
id: 430
categories:
  - LeetCode
date: 2016-07-17 17:58:43
tags:
---
﻿问题描述:

> Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

简单的链表操作。

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
        ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
            if(l1 == NULL && l2 == NULL)return NULL;
            if(l1 == NULL)return l2;
            if(l2 == NULL)return l1;
            ListNode *head = new ListNode(0), *l1Node = l1, *l2Node = l2, *p = head;
            while(l1Node || l2Node){
                if(!l1Node){
                    p->next = l2Node;
                    break;
                }
                else if(!l2Node){
                    p->next = l1Node;
                    break;
                }
                else{
                    if(l1Node->val < l2Node->val){
                        p->next = l1Node;
                        l1Node = l1Node->next;
                    }
                    else{
                        p->next = l2Node;
                        l2Node = l2Node->next;
                    }
                }
                p = p->next;
            }
            return head->next;
        }
    };