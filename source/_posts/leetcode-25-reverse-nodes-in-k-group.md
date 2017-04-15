---
title: LeetCode 25. Reverse Nodes in k-Group
url: 443.html
id: 443
categories:
  - LeetCode
date: 2016-07-20 17:37:14
tags:
---
题目描述:

> Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.
> 
> If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.
> 
> You may not alter the values in the nodes, only nodes itself may be changed.
> 
> Only constant memory is allowed.
> 
> For example,
> Given this linked list: `1->2->3->4->5`
> 
> For k = 2, you should return: `2->1->4->3->5`
> 
> For k = 3, you should return: `3->2->1->4->5`

以k个节点为一组进行顺序颠倒. 首先实现一个从某个节点开始, 把包括它的接下来的k个节点的顺序颠倒的函数, 再不断迭代这个函数直到链表末尾. 由于如果链表长度不是k的整数倍的话, 最后的`m(m<k)`个元素不进行处理, 所以先计算出链表的总长度`len`, 在每次迭代时计算已经处理过的节点数`reversedLen`, 当`reversedLen + k > len`时结束循环.

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
        ListNode* reverse(ListNode* prev, int k){
            if(!prev->next) return nullptr;
            ListNode *tail = prev->next, *pPrev = tail, *pCur = pPrev->next;
            for(int i = 1; pCur && i < k; i++){
                ListNode *pNext = pCur->next;
                pCur->next = pPrev;
                pPrev = pCur;
                pCur = pNext;
            }
            prev->next = pPrev;
            tail->next = pCur;
            return tail;
        }
        
        int countListLength(ListNode *list){
            int len = 0;
            ListNode *p = list;
            while(p){
                len++;
                p = p->next;
            }
            return len;
        }

        ListNode* reverseKGroup(ListNode* head, int k) {
            if(head == nullptr || k <= 1)
                return head;
            ListNode *trueHead = new ListNode(0), *p = trueHead;
            trueHead->next = head;
            int listLen = countListLength(head);
            int reversedLen = 0;
            
            while(true){
                if(reversedLen + k > listLen) break;
                p = reverse(p, k);
                reversedLen += k;
            }
            return trueHead->next;
        }
    };