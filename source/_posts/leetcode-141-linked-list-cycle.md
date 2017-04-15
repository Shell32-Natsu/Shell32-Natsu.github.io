---
title: LeetCode 141. Linked List Cycle
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 830.html
id: 830
categories:
  - LeetCode
date: 2016-10-02 19:33:36
---
题目描述:

> Given a linked list, determine if it has a cycle in it.
>
> Follow up:
> Can you solve it without using extra space?

经典题, 使用快慢指针.

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
    bool hasCycle(ListNode *head) {
        if(!head) return false;
        ListNode *p1 = head, *p2 = head->next;
        while(p1 && p2){
            if(p1 == p2) return true;
            p1 = p1->next;
            if(!p2->next){
                return false;
            }
            p2 = p2->next->next;
        }
        return false;
    }
};
```

