---
title: LeetCode 147. Insertion Sort List
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 850.html
id: 850
categories:
  - LeetCode
date: 2016-10-07 15:38:05
---
题目描述:

> Sort a linked list using insertion sort.

使用插入排序对一个链表进行排序. 对于原来链表中的每一个节点搜索在新链表中应该插入的位置.

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
    ListNode* insertionSortList(ListNode* head) {
        return insertion(head);
    }
    
    ListNode* insertion(ListNode* head){
        if(!head) return nullptr;
        ListNode *h = new ListNode(head->val), *p = head->next;
        while(p){
            ListNode *tp = h, *prev = nullptr;
            while(tp && tp->val < p->val) {
                prev = tp;
                tp = tp->next;
            }
            if(prev){
                ListNode *newNode = new ListNode(p->val);
                newNode->next = prev->next;
                prev->next = newNode;
            }
            else{
                ListNode *newHead = new ListNode(p->val);
                newHead->next = h;
                h = newHead;
            }
            
            p = p->next;
        }
        return h;
    }
};
```



