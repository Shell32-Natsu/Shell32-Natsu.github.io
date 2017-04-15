---
title: LeetCode 86. Partition List
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 640.html
id: 640
categories:
  - LeetCode
date: 2016-08-17 16:56:29
---
题目描述:

> Given a linked list and a value *x*, partition it such that all nodes less than *x* come before nodes greater than or equal to *x*.
>
> You should preserve the original relative order of the nodes in each of the two partitions.
>
> For example,
> Given `1->4->3->2->5->2` and *x* = 3,
> return `1->2->2->4->3->5`.

使用两个临时的链表分别保存小于x和大于等于x的值, 最后再把它们连接到一起.

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
    ListNode* partition(ListNode* head, int x) {
        ListNode *less = new ListNode(0), *greater = new ListNode(0), *p1 = less, *p2 = greater, *p = head;
        while(p){
            if(p->val < x){
                p1->next = new ListNode(p->val);
                p1 = p1->next;
            }
            else{
                p2->next = new ListNode(p->val);
                p2 = p2->next;
            }
            p = p->next;
        }
        p1->next = greater->next;
        return less->next;
    }
};
```

