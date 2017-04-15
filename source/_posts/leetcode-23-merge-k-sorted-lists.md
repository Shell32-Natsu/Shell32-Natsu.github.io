---
title: LeetCode 23. Merge k Sorted Lists
url: 437.html
id: 437
categories:
  - LeetCode
date: 2016-07-18 18:13:26
tags:
---
题目描述:

> Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

合并k个有序链表. 首先创建一个小顶堆(比较的是每个链表节点的值), 其中的元素是k个链表的头结点, 每次取出堆顶的节点, 加入到合并后的链表中, 然后将这个节点的后一个节点放入堆中, 如果是链表尾则不放入. 重复这个步骤直到堆为空.

由于建n个元素的堆的时间复杂度为O(n)(证明见: <http://blog.csdn.net/anonymalias/article/details/8807895>). 假设共有n个节点, 总的时间复杂度约为`O(k)+O(nlogk)`(我并不太会算复杂度, 这个也只是估计的...).

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
        ListNode* mergeKLists(vector<ListNode*>& lists) {
            auto comp = [=](ListNode *a, ListNode *b){
                return a->val <= b->val;
            };
            ListNode *head = new ListNode(0), *p = head;
            if(lists.empty()) return head->next;
            set<ListNode*, decltype(comp)> s(comp);
            for(int i = 0; i < lists.size(); i++){
                if(lists[i] != nullptr){
                    s.insert(lists[i]);
                }
            }
            while(!s.empty()){
                ListNode *node = *(s.begin());
                s.erase(s.begin());
                if(node->next != nullptr) s.insert(node->next);
                p->next = node;
                p = p->next;
            }
            return head->next;
        }
    };