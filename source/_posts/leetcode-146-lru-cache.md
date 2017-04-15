---
title: LeetCode 146. LRU Cache
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
  - 链表
url: 848.html
id: 848
categories:
  - LeetCode
date: 2016-10-06 17:40:04
---
题目描述:

> Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: `get` and `set`.
>
> `get(key)` - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
> `set(key, value)` - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

实现一个LRU数据结构, 就是说在元素容量到达上限时要删除最长时间没有访问的元素. 要注意`set`和`get`都属于访问了元素.

主要问题在于如何保存所有访问元素的顺序并且能够高效地进行查找和删除. 我一开始想的方法是使用两个map, 分别保存`上一次使用时间=>key`和`key=>上一次使用时间`两个映射. 其中第一个map需要有序而第二个不需要, 所以第二个可以采用unordered_map. 第一个map用于保存每一个key的上一次访问时间并且按照访问时间从远到近排序. 但是这个办法虽然可以AC但是效率不高, 而且并不实用. 因为访问时间的表示范围毕竟是有限的, 实际中的访问次数是完全有可能超过它的取值范围的.

```cpp
class LRUCache{
    unordered_map<int, int> data;
    map<int, int> lastTimeAndKey;
    unordered_map<int, int> keyAndLastTime;
    int capacity, useTime;
public:
    LRUCache(int capacity) {
        this->capacity = capacity;
        useTime = 0;
    }
    
    int get(int key) {
        if(data.count(key)) {
            int lastUseTime = keyAndLastTime[key];
            keyAndLastTime[key] = useTime;
            lastTimeAndKey.erase(lastUseTime);
            lastTimeAndKey[useTime] = key;
            useTime++;
            return data[key];
        }
        else return -1;
    }
    
    void set(int key, int value) {
        if(data.count(key)){
            int lastUseTime = keyAndLastTime[key];
            keyAndLastTime[key] = useTime;
            lastTimeAndKey.erase(lastUseTime);
            lastTimeAndKey[useTime] = key;
        } 
        else if(data.size() < capacity){
            lastTimeAndKey[useTime] = key;
            keyAndLastTime[key] = useTime;
        }
        else{
            int eraseKey = lastTimeAndKey.begin()->second;
            keyAndLastTime.erase(eraseKey);
            lastTimeAndKey.erase(lastTimeAndKey.begin());
            data.erase(eraseKey);
            lastTimeAndKey[useTime] = key;
            keyAndLastTime[key] = useTime;
        }
        useTime++;
        data[key] = value;
    }
};
```

所以后来我采用一个双向链表作为队列, 然后使用一个unordered_map来维护`key=>链表节点指针(迭代器)`的映射, 而链表中保存相应的key值. 当要更新队列时, 就通过key来找到节点, 删除节点并在最后增加节点, 更新key对应的迭代器. 当要删除队列中的第一个元素时, 可以通过头结点保存的key值同时删除data中的数据和`key=>链表节点指针(迭代器)`中的数据. 这样的话每次`set`和`get`的处理时间都是常数的.

```cpp
class LRUCache{
    unordered_map<int, int> data;
    list<int> q;
    unordered_map<int, list<int>::iterator> keyToPointer;
    int capacity;
public:
    LRUCache(int capacity) {
        this->capacity = capacity;
    }
    
    int get(int key) {
        if(data.count(key)) {
            list<int>::iterator iter = keyToPointer[key];
            q.erase(iter);
            q.push_back(key);
            keyToPointer[key] = --q.end();
            return data[key];
        }
        else return -1;
    }
    
    void set(int key, int value) {
        if(data.count(key)){
            list<int>::iterator iter = keyToPointer[key];
            q.erase(iter);
            q.push_back(key);
            keyToPointer[key] = --q.end();
        } 
        else if(data.size() < capacity){
            q.push_back(key);
            keyToPointer[key] = --q.end();
        }
        else{
            int keyToErase = q.front();
            data.erase(keyToErase);
            keyToPointer.erase(keyToErase);
            q.pop_front();
            q.push_back(key);
            keyToPointer[key] = --q.end();
        }
        data[key] = value;
    }
};
```

