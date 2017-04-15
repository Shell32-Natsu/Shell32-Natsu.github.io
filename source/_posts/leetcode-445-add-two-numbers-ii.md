---
title: LeetCode 445. Add Two Numbers II
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 1067.html
id: 1067
categories:
  - LeetCode
date: 2017-01-10 17:44:03
---
题目描述：

> You are given two **non-empty** linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
>
> You may assume the two numbers do not contain any leading zero, except the number 0 itself.
>
> **Follow up:**
> What if you cannot modify the input lists? In other words, reversing the lists is not allowed.
>
> **Example:**
>
> ```
> Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
> Output: 7 -> 8 -> 0 -> 7
> ```

翻转链表后相加再翻转回来。至于Follow up，关键的问题在于加法要求最低位对齐，而单向链表又不能回溯，所以最直接的办法就是用两个数组或者栈保存每个节点的前一个节点……虽然我觉得这实在是有点多此一举，不过没有想到什么更好的办法。

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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        l1 = reverseList(l1);
        l2 = reverseList(l2);
        ListNode ret(0);
        ListNode *p = &ret, *p1 = l1, *p2 = l2;
        int carry = 0;
        while(p1 || p2 || carry > 0){
            int s;
            if(p1 && p2){
                s = p1->val + p2->val + carry;
                p1 = p1->next;
                p2 = p2->next;
            }
            else if(p1){
                s = p1->val + carry;
                p1 = p1->next;
            }
            else if(p2){
                s = p2->val + carry;
                p2 = p2->next;
            }
            else{
                s = carry;
            }
            p->next = new ListNode(s % 10);
            carry = s / 10;
            p = p->next;
        }
        ret.next = reverseList(ret.next);
        return ret.next;
    }
    
    ListNode* reverseList(ListNode *l){
        ListNode *p1, *p2;
        p1 = l; p2 = l->next;
        while(p2){
            ListNode *tmp = p2->next;
            p2->next = p1;
            p1 = p2;
            p2 = tmp;
        }
        l->next = nullptr;
        return p1;
    }
};
```

