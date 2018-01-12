---
title: LeetCode 460. LFU Cache
date: 2018-01-11 23:07:53
tags:
 - LeetCode
 - CPP
 - 算法
 - 哈希表
 - 链表
categories:
 - LeetCode
---

Design and implement a data structure for [Least Frequently Used (LFU)](https://en.wikipedia.org/wiki/Least_frequently_used) cache. It should support the following operations: `get` and `put`.

`get(key)` - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
`put(key, value)` - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item. For the purpose of this problem, when there is a tie (i.e., two or more keys that have the same frequency), the least **recently** used key would be evicted.

**Follow up:**
Could you do both operations in **O(1)** time complexity?

**Example:**

```
LFUCache cache = new LFUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.get(3);       // returns 3.
cache.put(4, 4);    // evicts key 1.
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```

<!-- more -->

这道题的主要难点在于插入和查询都是O(1)的复杂度，单纯查询O(1)用哈希表就可以做到，但是LFU要更新访问次数，这个步骤难以做到O(1)。最容易想到的方法，使用Heap来维护访问次数的话，evict操作可以是O(1)，更新访问次数的操作只能是O(logn)。

在这道题中使用链表+哈希表是一个很聪明的方法。其中链表是双重的，第一层链表的每一个节点指向一个包含特定访问次数的key-value对的链表，这个第二层链表很像是没有路径压缩的并查集，因为要按照时间顺序排列，所以不能采用路径压缩。针对一个key，从哈希表中找到对应的二级链表节点以及该二级链表节点所在的一级链表节点，从原二级链表中删除，如果原一级链表节点的下一个节点对应的访问次数是原访问次数+1，那么它就是应插入的位置；否则在一级链表中插入一个新的节点对应该访问次数。为了节省空间，对应二级链表为空的一级链表节点要删除。

evict的时候，删除最后一个二级链表节点的第一个元素就可以了。这样`get`和`put`操作就都可以在O(1)的时间复杂度内完成。

```cpp
using NodeListNode = pair<int, list<pair<int, int>>>;

class LFUCache {
    int _c;
    unordered_map<int, list<pair<int, int>>::iterator> _m;
    list<NodeListNode> _q;
    unordered_map<int, list<NodeListNode>::iterator> refCount;
public:
    LFUCache(int capacity) {
        _c = capacity;
    }
    
    int get(int key) {
        if (!_m.count(key))
            return -1;
        
        increaseCount(key);
        auto iter = _m[key];
        return iter->second;
    }
    
    void put(int key, int value) {
        if (_c <= 0)
            return;
        if (_m.count(key)) {
            auto iter = _m[key];
            iter->second = value;
        }
        else {
            if (_m.size() >= _c) {
                evict();
            }
            
            list<pair<int, int>>::iterator nextKeyIter;
            if (_q.empty() || _q.front().first > 1) {
                _q.emplace_front(1, list<pair<int, int>>());
                nextKeyIter = _q.front().second.insert(_q.front().second.end(), make_pair(key, value));
            }
            else {
                nextKeyIter = _q.front().second.insert(_q.front().second.end(), make_pair(key, value));
            }
            _m[key] = nextKeyIter;
        }
        increaseCount(key);
    }
    
    void increaseCount (int key) {
        if (!refCount.count(key)) {
            refCount[key] = _q.begin();
            return;
        }
        
        auto iter = refCount[key];
        
        int currCnt = iter->first;
        int nextCnt = currCnt + 1;
        
        auto nextIter = iter;
        nextIter++;
        if (nextIter == _q.end() || (nextIter)->first != nextCnt) {
            nextIter = _q.insert(nextIter, NodeListNode(nextCnt, list<pair<int, int>>()));
        }
        
        int value = _m[key]->second;
        auto nextKeyIter = nextIter->second.insert(nextIter->second.end(), make_pair(key, value));
        iter->second.erase(_m[key]);
        if (iter->second.empty()) {
            _q.erase(iter);
        }
        
        _m[key] = nextKeyIter;
        refCount[key] = nextIter;
    }
    
    void evict() {
        if (_q.empty())
            return;
        int key = _q.front().second.front().first;
        _q.front().second.pop_front();
        _m.erase(key);
        refCount.erase(key);
    }
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * LFUCache obj = new LFUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
```

