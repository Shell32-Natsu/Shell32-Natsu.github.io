---
title: LeetCode 211. Add and Search Word - Data structure design
tags:
  - CPP
  - LeetCode
  - 前缀树(Trie)
  - 算法
url: 1102.html
id: 1102
categories:
  - LeetCode
date: 2017-01-17 18:09:47
---
题目描述：

> Design a data structure that supports the following two operations:
>
> ```
> void addWord(word)
> bool search(word)
>
> ```
>
> search(word) can search a literal word or a regular expression string containing only letters `a-z` or `.`. A `.` means it can represent any one letter.
>
> For example:
>
> ```
> addWord("bad")
> addWord("dad")
> addWord("mad")
> search("pad") -> false
> search("bad") -> true
> search(".ad") -> true
> search("b..") -> true
>
> ```
>
> **Note:**
> You may assume that all words are consist of lowercase letters `a-z`.

直接用前缀树来实现。

```cpp
class TrieNode {
public:
	char val;
	vector<TrieNode*> children;
	TrieNode* parent;
	bool wordEnd = false;
	TrieNode(char v = 0, TrieNode *p = nullptr) : val(v), parent(p) {}
};

class Trie {
public:
	TrieNode* root;
	Trie() {
		root = new TrieNode();
	}

	// Inserts a word into the trie.
	void insert(string word) {
		insertToNode(word, root);
	}

	void insertToNode(string word, TrieNode* node) {
		if (word.empty()) {
			node->wordEnd = true;
			return;
		}
		for (int i = 0; i < node->children.size(); i++) {
			if (word[0] == node->children[i]->val) {
				return insertToNode(word.substr(1), node->children[i]);
			}
		}
		TrieNode *p = new TrieNode(word[0], node);
		node->children.push_back(p);
		for (int i = 1; i < word.size(); i++) {
			TrieNode *tmp = new TrieNode(word[i], p);
			p->children.push_back(tmp);
			p = tmp;
		}
		p->wordEnd = true;
	}

	// Returns if the word is in the trie.
	bool search(string word, TrieNode *node = nullptr) {
		int pos = 0;
		TrieNode *p = (node ? node : root);
		if (word.empty()) {
			if (p->wordEnd)
				return true;
			else
				return false;
		}
		for (; pos < word.size(); pos++) {
			if (word[pos] == '.') {
				if (p->children.empty() && word.size() > 1)
					return false;
				for (int i = 0; i < p->children.size(); i++) {
					if (search(word.substr(pos + 1), p->children[i]))
						return true;
				}
				return false;
			}
			else {
				bool flag = false;
				for (int i = 0; i < p->children.size(); i++) {
					if (word[pos] == p->children[i]->val) {
						p = p->children[i];
						flag = true;
						break;
					}
				}
				if (flag == false) {
					return false;
				}
			}
		}
		if (pos == word.size() && p->wordEnd) return true;
		else return false;
	}

	// Returns if there is any word in the trie
	// that starts with the given prefix.
	bool startsWith(string prefix) {
		int pos = 0;
		TrieNode *p = root;
		for (; pos < prefix.size(); pos++) {
			bool flag = false;
			for (int i = 0; i < p->children.size(); i++) {
				if (prefix[pos] == p->children[i]->val) {
					p = p->children[i];
					flag = true;
					break;
				}
			}
			if (flag == false) {
				return false;
			}
		}
		return true;
	}

};

class WordDictionary {
public:
	Trie trie;

	// Adds a word into the data structure.
	void addWord(string word) {
		trie.insert(word);
	}

	// Returns if the word is in the data structure. A word could
	// contain the dot character '.' to represent any one letter.
	bool search(string word) {
		return trie.search(word);
	}
};
```

