---
title: LeetCode 61. Rotate List
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 568.html
id: 568
categories:
  - LeetCode
date: 2016-08-05 16:50:35
---
题目描述:

>Given a list, rotate the list to the right by k places, where k is non-negative.
>
>For example:
>
>Given 1->2->3->4->5->NULL and k = 2,
>
>return 4->5->1->2->3->NULL.

最简单的方法是把所有节点指针保存在一个数组中, 设总长度为`len`, 然后找到第`len - k`个节点为新链表的头结点, 它之前的节点是新链表的尾节点. 把原链表的尾节点指向头结点即可. 要注意`k`可能会大于`len`, 所以可以先把`k`对`len`取余.

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
        ListNode* rotateRight(ListNode* head, int k) {
            if(!head)
                return head;
            vector<ListNode*> l;
            ListNode* p = head, *reHead;
            while(p){
                l.push_back(p);
                p = p->next;
            }
            
            k = k % l.size();
            if(k == 0)
                return head;
            auto iter = l.end() - k;
            (*(iter - 1))->next = NULL;
            (*(l.end() - 1))->next = *(l.begin());
            return *iter;
        }
    };

不使用额外空间的方法需要多遍历几次链表:

    class Solution {
    public:
        ListNode* rotateRight(ListNode* head, int k) {
            if(!head)
                return head;
            int len = 0;
            ListNode *p = head, *newHead = nullptr, *tail = nullptr, *newTail = nullptr;
            while(p){
                len++;
                if(!p->next)
                    tail = p;
                p = p->next;
            }
            k = k % len;
            if(!k) return head;
            newHead = head;
            for(int i = 0; i < len - k; i++){
                newTail = newHead;
                newHead = newHead->next;
            }
            newTail->next = nullptr;
            tail->next = head;
            return newHead;
        }
    };