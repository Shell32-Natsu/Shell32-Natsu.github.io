---
title: LeetCode 2. Add Tow Numbers
url: 333.html
id: 333
categories:
  - LeetCode
date: 2016-07-08 16:55:36
tags:
---
题目:

> You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

> Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)

> Output: 7 -> 0 -> 8

简单的加法模拟, 代码如下:

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
        ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
            //如果有一个链表为空,则直接返回另一个
            if(l1 == nullptr)
                return l2;
            if(l2 == nullptr)
                return l1;
                
            ListNode *p1 = l1, *p2 = l2;
            while(p1->next != nullptr || p2->next != nullptr){
                //填充较短的数, 高位添加0, 这一步可以用计算后再处理的办法替代
                if(p1->next == nullptr)
                    p1->next = new ListNode(0);
                if(p2->next == nullptr)
                    p2->next = new ListNode(0);
                p1 = p1->next, p2 = p2->next;
            }
            
            ListNode *head = new ListNode(0), *p = head;
            int jw = 0;//jw保存上一位计算后的进位
            for(p1 = l1, p2 = l2; p1 != nullptr && p2 != nullptr; p1 = p1->next, p2 = p2->next){
                //模拟每一位的加法
                int t = p1->val + p2->val + jw;
                jw = (t > 9 ? 1 : 0);
                
                t = t % 10;
                p->next = new ListNode(t);
                p = p->next;
            }
            if(jw == 1){
                //最后有进位的处理
                p->next = new ListNode(1);
            }
            
            return head->next;
        }
    };