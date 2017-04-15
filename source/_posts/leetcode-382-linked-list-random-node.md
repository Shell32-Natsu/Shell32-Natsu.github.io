---
title: LeetCode 382. Linked List Random Node
tags:
  - CPP
  - LeetCode
  - 算法
  - 链表
url: 600.html
id: 600
categories:
  - LeetCode
date: 2016-08-10 16:56:45
---
题目描述:

> Given a singly linked list, return a random node's value from the linked list. Each node must have the **same probability** of being chosen.
>
> **Follow up:**
> What if the linked list is extremely large and its length is unknown to you? Could you solve this efficiently without using extra space?
>
> **Example:**
>
> ```
> // Init a singly linked list [1,2,3].
> ListNode head = new ListNode(1);
> head.next = new ListNode(2);
> head.next.next = new ListNode(3);
> Solution solution = new Solution(head);
>
> // getRandom() should return either 1, 2, or 3 randomly. Each element >should have equal probability of returning.
> solution.getRandom();
> ```

要求设计一个类, 根据一个未知长度的单链表进行构造, 每次调用`getRandom`成员函数时返回一个随机节点. 

O(n)空间复杂度, O(1)时间复杂度的方法就是用一个顺序容器保存所有节点的指针, 然后每次调用`getRandom`都根据下标来访问.

```cpp
class Solution {
    vector<ListNode*> nodes;
public:
    /** @param head The linked list's head. Note that the head is guanranteed to be not null, so it contains at least one node. */
    Solution(ListNode* head) {
        srand(time(NULL));
        ListNode *p = head;
        while(p){
            nodes.push_back(p);
            p = p->next;
        }
    }
    
    /** Returns a random node's value. */
    int getRandom() {
        int r = rand() % nodes.size();
        return nodes[r]->val;
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(head);
 * int param_1 = obj.getRandom();
 */
```

对于题目中的Follow up部分, 要使用O(1)空间复杂度, O(n)时间复杂度. 在类中只保存链表头结点和当前访问节点, 每次生成的随机数是下一个节点与当前节点的距离.

```cpp
class Solution {
    ListNode *head, *mp;
    int listLen;
public:
    /** @param head The linked list's head. Note that the head is guanranteed to be not null, so it contains at least one node. */
    Solution(ListNode* h) {
        srand(time(NULL));
        this->head = h;
        this->mp = this->head;
        listLen = 0;
        ListNode *p = h;
        while(p){
            listLen++;
            p = p->next;
        }
    }
    
    /** Returns a random node's value. */
    int getRandom() {
        int r = rand() % listLen;
        for(int i = 0; i < r; i++){
            mp = mp->next;
            if(mp == nullptr) mp = head;
        }
        return mp->val;
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(head);
 * int param_1 = obj.getRandom();
 */
```

