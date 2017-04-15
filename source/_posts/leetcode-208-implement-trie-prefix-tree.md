---
title: LeetCode 208. Implement Trie (Prefix Tree)
tags:
  - CPP
  - LeetCode
  - 前缀树(Trie)
  - 算法
url: 1051.html
id: 1051
categories:
  - LeetCode
date: 2017-01-02 18:13:06
---
题目描述：

> Implement a trie with `insert`, `search`, and `startsWith` methods.
>
> **Note:**
> You may assume that all inputs are consist of lowercase letters `a-z`.

实现前缀树。因为输入只有小写字母，所以直接使用26叉树，使用vector来实现支持任意分支数也可以。

```cpp
class TrieNode {
public:
    char val;
    vector<TrieNode*> children;
    bool wordEnd = false;
    // Initialize your data structure here.
    TrieNode(char v = 0) : val(v){
        children = vector<TrieNode*>(26, nullptr);
    }
};

class Trie {
public:
    Trie() {
        root = new TrieNode();
    }

    // Inserts a word into the trie.
    void insert(string word) {
        insertToNode(word, root);
    }
    
    void insertToNode(string word, TrieNode* node){
        if(word.empty()){
            node->wordEnd = true;
            return;
        }
        
        int pos;
        for(pos = 0; pos < word.size(); pos++){
            if(node->children[word[pos] - 'a'] != nullptr){
                node = node->children[word[pos] - 'a'];
            }
            else{
                break;
            }
        }
        
        if(pos == word.size()) {
            node->wordEnd = true;
            return;
        }

        for(int i = pos; i < word.size(); i++){
            TrieNode *tmp = new TrieNode(word[i]);
            node->children[word[i] - 'a'] = tmp;
            node = tmp;
        }
        node->wordEnd = true;
    }

    // Returns if the word is in the trie.
    bool search(string word) {
        int pos = 0;
        TrieNode *p = root;
        for(; pos < word.size(); pos++){
            if(p->children[word[pos] - 'a'] != nullptr){
                p = p->children[word[pos] - 'a'];
            }
            else{
                break;
            }
        }
        if(pos == word.size() && p->wordEnd) return true;
        else return false;
    }

    // Returns if there is any word in the trie
    // that starts with the given prefix.
    bool startsWith(string prefix) {
        int pos = 0;
        TrieNode *p = root;
        for(; pos < prefix.size(); pos++){
            if(p->children[prefix[pos] - 'a'] != nullptr){
                p = p->children[prefix[pos] - 'a'];
            }
            else{
                break;
            }
        }
        if(pos == prefix.size()) return true;
        else return false;
    }

private:
    TrieNode* root;
};

// Your Trie object will be instantiated and called as such:
// Trie trie;
// trie.insert("somestring");
// trie.search("key");
```

