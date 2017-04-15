---
title: LeetCode 535. Encode and Decode TinyURL
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 字符串
  - 算法
url: 1156.html
id: 1156
categories:
  - LeetCode
date: 2017-03-04 15:49:05
---
题目描述：

> TinyURL is a URL shortening service where you enter a URL such as `https://leetcode.com/problems/design-tinyurl` and it returns a short URL such as `http://tinyurl.com/4e9iAk`.
>
> Design the `encode` and `decode` methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.
>
> **Note:** Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.

短链接的维护，但不限制内部如何生成短链接。就是Hash表的问题，我直接使用的`unordered_map`容器所提供的Hash函数对原链接进行处理，得到一个数值，然后将该数值转换为62进制字符串（10个数字+大小写字母各26个），该字符串作为短链接的后缀部分。

```cpp
class Solution {
    string tinyUrlPrefix = "http://tinyurl.com/";
    unordered_map<string, string> urls;
public:

    // Encodes a URL to a shortened URL.
    string encode(string longUrl) {
        auto hashFunc = urls.hash_function();
        size_t key = hashFunc(longUrl);
        string shortUrl = tinyUrlPrefix + convertToSixtyTwoBase(key);
        urls[shortUrl] = longUrl;
        return shortUrl;
    }

    // Decodes a shortened URL to its original URL.
    string decode(string shortUrl) {
        return urls[shortUrl];
    }
    
    string convertToSixtyTwoBase (size_t key) {
        string str;
        while (key > 0) {
            int mod = key % 62;
            if (mod < 10) str.push_back(mod + '0');
            else if (mod < 36) str.push_back(mod - 10 + 'a');
            else str.push_back(mod - 36 + 'A');
            key /= 62;
        }
        return str;
    }
};

// Your Solution object will be instantiated and called as such:
// Solution solution;
// solution.decode(solution.encode(url));
```

