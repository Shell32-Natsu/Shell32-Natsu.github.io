---
title: LeetCode 82. Remove Duplicates from Sorted List II
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 628.html
id: 628
categories:
  - LeetCode
date: 2016-08-14 16:37:11
---
题目描述:

> Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only *distinct* numbers from the original list.
>
> For example,
> Given `1->2->3->3->4->4->5`, return `1->2->5`.
> Given `1->1->1->2->3`, return `2->3`.

删除一个有序序列中的所有出现重复的元素. 与去除重复元素相比, 问题在于头节点的问题, 在这个问题中头结点可能会发生变化, 因此先创建一个临时头结点指向真正的头结点. 出现初伏元素的时候就把所有相同的元素删除.

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
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* p1, *p2 = head;
        ListNode *re = new ListNode(0);
        re->next = head;
        p1 = re;
        
        while(p2 != nullptr){
            if(p2->next != nullptr && p2->val == p2->next->val){
                int dup_val = p2->val;
                while(p2 != nullptr && p2->val == dup_val){
                    ListNode *toDel = p2;
                    p2 = p2->next;
                    delete toDel;
                }
                p1->next = p2;
            }
            else{
                p1 = p2;
                p2 = p2->next;
            }
        }
        return re->next;
    }
};
```

