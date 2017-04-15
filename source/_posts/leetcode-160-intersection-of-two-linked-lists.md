---
title: LeetCode 160. Intersection of Two Linked Lists
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 876.html
id: 876
categories:
  - LeetCode
date: 2016-10-12 16:29:31
---
题目描述:

> Write a program to find the node at which the intersection of two singly linked lists begins.
>
> For example, the following two linked lists:
>
> ```
> A:          a1 → a2
>                    ↘
>                      c1 → c2 → c3
>                    ↗            
> B:     b1 → b2 → b3
>
> ```
>
> begin to intersect at node c1.
>
> **Notes:**
>
> - If the two linked lists have no intersection at all, return `null`.
> - The linked lists must retain their original structure after the function returns.
> - You may assume there are no cycles anywhere in the entire linked structure.
> - Your code should preferably run in O(n) time and use only O(1) memory.

这是一道我遇到过的面试题. 解题方法就是先遍历得到两个链表的长度, 然后再跳过较长的链表的前面几个节点, 直到两个链表剩下的部分长度相等, 再同步移动指针来找到相交的节点.

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
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        int lenA = 0, lenB = 0;
        ListNode *pa = headA, *pb = headB;
        while(pa){
            lenA++;
            pa = pa->next;
        }
        while(pb){
            lenB++;
            pb = pb->next;
        }
        pa = headA, pb = headB;
        if(lenA > lenB){
            for(int i = 0; i < lenA - lenB; i++) pa = pa->next;
        }
        else if(lenA < lenB){
            for(int i = 0; i < lenB - lenA; i++) pb = pb->next;
        }
        while(pa && pb){
            if(pa == pb && pa != nullptr) return pa;
            pa = pa->next;
            pb = pb->next;
        }
        return nullptr;
    }
};
```

