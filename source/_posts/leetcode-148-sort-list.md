---
title: LeetCode 148. Sort List
tags:
  - CPP
  - LeetCode
  - 算法
  - 递归
  - 链表
url: 853.html
id: 853
categories:
  - LeetCode
date: 2016-10-07 15:45:36
---
题目描述:

> Sort a linked list in *O*(*n* log *n*) time using constant space complexity.

不使用额外空间对单向链表进行排序, 要求时间复杂度为O(nlogn). 可以使用归并排序, 使用快慢指针把链表分为两部分, 分别进行递归地归并排序后再合并为一个链表.

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
    ListNode* sortList(ListNode* head) {
        if(!head || !head->next) return head;
        if(head->next->next == nullptr){
            if(head->val > head->next->val){
                head->next->next = head;
                ListNode *t = head->next;
                head->next = nullptr;
                return t;
            }
            else return head;
        }
        ListNode *fast = head, *slow = head;
        while(fast && fast->next){
            fast = fast->next->next;
            slow = slow->next;
        }
        ListNode *right = slow->next;
        slow->next = nullptr;
        head = sortList(head);
        right = sortList(right);
        return merge(head, right);
    }
    
    ListNode* merge(ListNode *left, ListNode *right){
        ListNode *head = new ListNode(0), *p1 = left, *p2 = right, *p = head;
        while(p1 && p2){
            if(p1->val < p2->val){
                p->next = p1;
                p1 = p1->next;
            }
            else{
                p->next = p2;
                p2 = p2->next;
            }
            p = p->next;
        }
        if(p && !p1){
            p->next = p2;
        }
        else if(p && !p2){
            p->next = p1;
        }
        return head->next;
    }
};S
```

