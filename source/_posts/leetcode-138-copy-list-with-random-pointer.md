---
title: LeetCode 138. Copy List with Random Pointer
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
url: 819.html
id: 819
categories:
  - LeetCode
date: 2016-09-29 17:20:17
---
题目描述:

> A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.
>
> Return a deep copy of the list.

这是一个单纯的哈希表问题, 不知道为什么归类为hard. 首先遍历一次链表进行拷贝, 同时建立原链表节点到新链表节点的映射关系, 再遍历一次新链表更新random的值即可.

```cpp
/**
 * Definition for singly-linked list with a random pointer.
 * struct RandomListNode {
 *     int label;
 *     RandomListNode *next, *random;
 *     RandomListNode(int x) : label(x), next(NULL), random(NULL) {}
 * };
 */
class Solution {
public:
    RandomListNode *copyRandomList(RandomListNode *head) {
        unordered_map<RandomListNode*, RandomListNode*> m;
        if(!head) return nullptr;
        RandomListNode *p = head, *newHead = new RandomListNode(head->label), *np = newHead;
        while(p){
            if(p->next)
                np->next = new RandomListNode(p->next->label);
            np->random = p->random;
            m[p] = np;
            p = p->next;
            np = np->next;
        }
        
        p = newHead;
        while(p){
            if(p->random){
                p->random = m[p->random];
            }
            p = p->next;
        }
        
        return newHead;
    }
};
```

