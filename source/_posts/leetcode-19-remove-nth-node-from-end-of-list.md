---
title: LeetCode 19. Remove Nth Node From End of List
url: 426.html
id: 426
categories:
  - LeetCode
date: 2016-07-17 16:49:05
tags:
---
题目描述:

> Given a linked list, remove the n<sup>th</sup> node from the end of list and return its head.
> 
> For example,
> 
>     Given linked list: 1->2->3->4->5, and n = 2.
>     
>     After removing the second node from the end, the linked list becomes 1->2->3->5.
> Note:
> 
> Given n will always be valid.
>
> Try to do this in one pass.

要求删除链表从后往前数第n个节点, 并且只遍历一次. 所以我采用一个vector来保存每个节点的指针, 遍历一次后从vector中找到倒数第n个节点并删除之.

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
        ListNode* removeNthFromEnd(ListNode* head, int n) {
            vector<ListNode*> listPointer;
            ListNode* p = head;
            while(p != nullptr){
                listPointer.push_back(p);
                p = p->next;
            }
            
            int len = listPointer.size(), toDeleteIndex = len - n;
            ListNode* toDelete = listPointer[toDeleteIndex];
            if(toDeleteIndex == 0){
                return head->next;
            }
            else{
                ListNode* prev = listPointer[toDeleteIndex - 1];
                prev->next = toDelete->next;
                return head;
            }
        }
    };