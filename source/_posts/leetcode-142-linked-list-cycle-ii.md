---
title: LeetCode 142. Linked List Cycle II
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 832.html
id: 832
categories:
  - LeetCode
date: 2016-10-02 19:52:35
---
题目描述:

> Given a linked list, return the node where the cycle begins. If there is no cycle, return `null`.
>
> **Note:** Do not modify the linked list.
>
> **Follow up**:
> Can you solve it without using extra space?

同样是使用双指针, 不过要比上一题更进一步. 假设链表有环, 环的长度为m, 去掉环的长度为n(这些节点都一定在环之前),  相遇时快慢指针走过的长度为k和2k. 那么慢指针在环上走过的距离为`k-n`, 快指针为`2k-n`, 因为它们指向同一个节点, 所以它们的差`k`一定是m的整数倍. 因此慢指针只要再走n个节点就会回到进入环的那个节点(`k-n+n=k`). 

虽然我们并不知道m和n的值, 但n是环之前的节点数量, 只要再让一个指针从头结点开始与慢指针同步向前, 当他们相遇时就正好走过了n个节点, 而他们指向的节点就是进入环的节点.

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
    ListNode *detectCycle(ListNode *head) {
        if(!head || !head->next) return nullptr;
        ListNode *p1 = head->next, *p2 = head->next->next;
        while(p1 && p2 && p2->next){
            if(p1 == p2){
                while(true){
                    if(p1 == head) return p1;
                    p1 = p1->next;
                    head = head->next;
                }
            }
            
            p1 = p1->next;
            p2 = p2->next->next;
        }
        return nullptr;
    }
};
```

