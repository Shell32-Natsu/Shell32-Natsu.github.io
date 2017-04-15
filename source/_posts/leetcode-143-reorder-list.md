---
title: LeetCode 143. Reorder List
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 840.html
id: 840
categories:
  - LeetCode
date: 2016-10-05 15:18:09
---
题目描述:

> Given a singly linked list *L*: *L*0→*L*1→…→*Ln*-1→*L*n,
> reorder it to: *L*0→*Ln*→*L*1→*Ln*-1→*L*2→*Ln*-2→…
>
> You must do this in-place without altering the nodes' values.
>
> For example,
> Given `{1,2,3,4}`, reorder it to `{1,4,2,3}`.

这道题如果不用辅助空间的话分成三步: 1. 分割链表; 2. 颠倒第二个链表; 3. 合并链表. 其中分割链表通过快慢指针来找到链表的中间节点.

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
    void reorderList(ListNode* head) {
        ListNode *fast = head, *low = head, *preLow = nullptr;;
        if(!head || !head->next) return;
        while(fast && fast->next){
            fast = fast->next->next;
            preLow = low;
            low = low->next;
        }
        preLow->next = nullptr;
        ListNode *h1 = head, *h2 = low;
        h2 = reverseList(h2);
        while(h1){
            if(!h1->next){
                h1->next = h2;
                break;
            }
            else{
                ListNode *h2next = h2->next;
                h2->next = h1->next;
                h1->next = h2;
                h1 = h1->next->next;
                h2 = h2next;
            }
        }
    }
    
    ListNode* reverseList(ListNode* head){
        if(!head) return head;
        ListNode *p1 = nullptr, *p2;
        p2 = head;
        while(p2){
            ListNode *next = p2->next;
            p2->next = p1;
            p1 = p2;
            p2 = next;
        }
        return p1;
    }
};
```

