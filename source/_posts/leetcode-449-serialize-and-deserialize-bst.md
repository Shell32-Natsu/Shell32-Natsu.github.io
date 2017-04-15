---
title: LeetCode 449. Serialize and Deserialize BST
tags:
  - BST
  - CPP
  - LeetCode
  - 二叉树
  - 位运算
  - 算法
  - 递归
url: 1069.html
id: 1069
categories:
  - LeetCode
date: 2017-01-10 17:56:26
---
题目描述：

> Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
>
> Design an algorithm to serialize and deserialize a **binary search tree**. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary search tree can be serialized to a string and this string can be deserialized to the original tree structure.
>
> **The encoded string should be as compact as possible.**
>
> **Note:** Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.

序列化一个二叉搜索树，有两个问题：

1. 如何序列化一个二叉搜索树的节点
2. 如何序列化节点里的值

因为二叉搜索树本身的有序性，所以按照先序遍历的顺序来保存节点就足够恢复BST的结构了。而对于节点里的值，最简单的方法是变为字符串，可是节点值的长度各不相同，这给区分不同的节点带来了麻烦，所以我用四个字节（char）来保存一个int，实际上就是计算机中的小端法存储。

对于节点的序列化与反序列化使用递归来实现。

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
public:
    int decodeInt(string &s, int begin){
        int v = 0;
        for(int i = 0; i < 4; i++){
            int t = s[i + begin];
            v |= ((t & 0xff) << (i << 3));
        }
        return v;
    }
    
    string encodeInt(int v){
        string s;
        for(int i = 0; i < 4; i++){
            s.push_back(v & 0xff);
            v >>= 8;
        }
        return s;
    }

    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        return encodeDFS(root);
    }
    
    string encodeDFS(TreeNode *node){
        if(!node) return string();
        return encodeInt(node->val) + encodeDFS(node->left) + encodeDFS(node->right);
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        //cout<<data<<endl;
        return deserializeHelper(data, 0, data.length());
    }
    
    TreeNode* deserializeHelper(string &data, int left, int right){
        if(left == right) return nullptr;
        int v = decodeInt(data, left);
        //cout<<v<<endl;
        TreeNode *node = new TreeNode(v);
        int mid = right;
        for(int i = left + 4; i < right; i += 4){
            int t = decodeInt(data, i);
            if(t > v) {
                mid = i;
                break;
            }
        }
        node->left = deserializeHelper(data, left + 4, mid);
        node->right = deserializeHelper(data, mid, right);
        return node;
    }
};

// Your Codec object will be instantiated and called as such:
// Codec codec;
// codec.deserialize(codec.serialize(root));
```

