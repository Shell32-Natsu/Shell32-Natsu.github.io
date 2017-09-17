---
title: LeetCode 591. Tag Validator
date: 2017-08-07 18:06:22
tags:
 - LeetCode
 - CPP
 - 算法
 - 栈
 - 字符串
categories:
 - LeetCode
---

Given a string representing a code snippet, you need to implement a tag validator to parse the code and return whether it is valid. A code snippet is valid if all the following rules hold:

1. The code must be wrapped in a **valid closed tag**. Otherwise, the code is invalid.
2. A **closed tag** (not necessarily valid) has exactly the following format : `<TAG_NAME>TAG_CONTENT</TAG_NAME>`. Among them, `<TAG_NAME>` is the start tag, and `</TAG_NAME>` is the end tag. The TAG_NAME in start and end tags should be the same. A closed tag is **valid** if and only if the TAG_NAME and TAG_CONTENT are valid.
3. A **valid** `TAG_NAME` only contain **upper-case letters**, and has length in range [1,9]. Otherwise, the `TAG_NAME` is **invalid**.
4. A **valid** `TAG_CONTENT` may contain other **valid closed tags**, **cdata** and any characters (see note1) **EXCEPT** unmatched `<`, unmatched start and end tag, and unmatched or closed tags with invalid TAG_NAME. Otherwise, the `TAG_CONTENT` is **invalid**.
5. A start tag is unmatched if no end tag exists with the same TAG_NAME, and vice versa. However, you also need to consider the issue of unbalanced when tags are nested.
6. A `<` is unmatched if you cannot find a subsequent `>`. And when you find a `<` or `</`, all the subsequent characters until the next `>` should be parsed as TAG_NAME (not necessarily valid).
7. The cdata has the following format : `<![CDATA[CDATA_CONTENT]]>`. The range of `CDATA_CONTENT` is defined as the characters between `<![CDATA[` and the **first subsequent** `]]>`.
8. `CDATA_CONTENT` may contain **any characters**. The function of cdata is to forbid the validator to parse `CDATA_CONTENT`, so even it has some characters that can be parsed as tag (no matter valid or invalid), you should treat it as **regular characters**.

**Valid Code Examples:**

```
Input: "<DIV>This is the first line <![CDATA[<div>]]></DIV>"

Output: True

Explanation: 

The code is wrapped in a closed tag : <DIV> and </DIV>. 

The TAG_NAME is valid, the TAG_CONTENT consists of some characters and cdata. 

Although CDATA_CONTENT has unmatched start tag with invalid TAG_NAME, it should be considered as plain text, not parsed as tag.

So TAG_CONTENT is valid, and then the code is valid. Thus return true.


Input: "<DIV>>>  ![cdata[]] <![CDATA[<div>]>]]>]]>>]</DIV>"

Output: True

Explanation:

We first separate the code into : start_tag|tag_content|end_tag.

start_tag -> "<DIV>"

end_tag -> "</DIV>"

tag_content could also be separated into : text1|cdata|text2.

text1 -> ">>  ![cdata[]] "

cdata -> "<![CDATA[<div>]>]]>", where the CDATA_CONTENT is "<div>]>"

text2 -> "]]>>]"


The reason why start_tag is NOT "<DIV>>>" is because of the rule 6.
The reason why cdata is NOT "<![CDATA[<div>]>]]>]]>" is because of the rule 7.

```

**Invalid Code Examples:**

```
Input: "<A>  <B> </A>   </B>"
Output: False
Explanation: Unbalanced. If "<A>" is closed, then "<B>" must be unmatched, and vice versa.

Input: "<DIV>  div tag is not closed  <DIV>"
Output: False

Input: "<DIV>  unmatched <  </DIV>"
Output: False

Input: "<DIV> closed tags with invalid tag name  <b>123</b> </DIV>"
Output: False

Input: "<DIV> unmatched tags with invalid tag name  </1234567890> and <CDATA[[]]>  </DIV>"
Output: False

Input: "<DIV>  unmatched start tag <B>  and unmatched end tag </C>  </DIV>"
Output: False

```

**Note:**

1. For simplicity, you could assume the input code (including the **any characters** mentioned above) only contain `letters`, `digits`, `'<'`,`'>'`,`'/'`,`'!'`,`'['`,`']'` and `' '`.

<!-- more -->

-----------------

这道题目最大的难点就是题目过于冗长，容易让人找不着北。其实基本的要求只有两个：

1. 处理close的tag
2. 处理cdata

分为这两部分来实现就可以了，其中处理tag的部分使用栈。实现时要注意下标的正确性。

我想说的另一点跟算法没什么关系，是代码写法的问题。这个题目由于只要返回字符串是否合法，因此只要发现了非法的情况就可以立即返回，但是这给调试带来了不小的麻烦，因为非法的字符串可能有10个以上的原因，我们并不知道是在哪里返回的。除了打各种log之外，我的解决方法是使用一个包装函数包装真正的实现函数，在实现函数中使用返回值来表示返回的位置（实际上应该先用宏定义或者枚举来定义好不同错误原因的返回码），这样就可以快速地定位到错误出现在哪里。

```cpp
class Solution {
    bool debugFlag = false;
    string cdataLeft = "<![CDATA[";
    string cdataRight = "]]>";
public:
    bool isValid(string code) {
        int ret = isValidImpl(code);
        if (ret != 0) {
            if (debugFlag) printf("Return code: %d\n", ret);
            return false;
        }
        else return true;
    }
    int isValidImpl(string &code) {
        int p = 0;
        if (code[p] != '<') return -1;
        stack<string> tags;
        while (p < code.size()) {
            if (code[p] == '<') {
                if (p + 1 >= code.size()) return -2;
                else if (code[p + 1] != '!') {
                    string tag = getTag(code, p);
                    if (debugFlag) printf("%s\n", tag.c_str());
                    if (tag.size() < 2) return -3;
                    bool bIsLeftTag = isLeftTag(tag);
                    if (!validTagName(tag, bIsLeftTag ? 1 : 2, tag.size() - 1)) return -4;
                    if (bIsLeftTag) {
                        tags.push(tag);
                    }
                    else {
                        if (tags.empty()) return -5;
                        if (matchTags(tags.top(), tag)) {
                            tags.pop();
                        }
                        else return -6; // unbalanced
                    }
                }
                else {
                    if (p + cdataLeft.size() + cdataRight.size() > code.size()) return -7;
                    if (code.substr(p, cdataLeft.size()) != cdataLeft) return -8;
                    if (debugFlag) printf("Found CDATA at %d.\n", p);
                    p += cdataLeft.size();
                    while (p < code.size() - 3 && code.substr(p, cdataRight.size()) != cdataRight) p++;
                    if (code.substr(p, cdataRight.size()) != cdataRight) return -9;
                    if (debugFlag) printf("CDATA end at %d.\n", p);
                    p += cdataRight.size() - 1;
                }
            }
            
            p++;
            if (p != code.size() && tags.empty()) return -10;
        }
        if (!tags.empty()) return -11;
        return 0;
    }
    
    bool matchTags(const string &left, const string &right) {
        if (right.size() != left.size() + 1) return false;
        for (int i = 0; i < left.size() - 1 && i < right.size() - 1; i++) {
            if (left[i + 1] != right[i + 2]) return false;
        }
        return true;
    }
    
    bool isLeftTag(const string& tag) {
        return tag[1] != '/';
    }
    
    bool validTagName(const string &s, int begin, int end) {
        int len = end - begin;
        if (len < 1 || len > 9) return false;
        for (int i = begin; i < end; i++) {
            if (!isupper(s[i])) return false;
        }
        return true;
    }
    
    string getTag(const string& code, int &p) {
        int end;
        for (end = p; end < code.size() && code[end] != '>'; end++) {
            if (end > p && code[end] == '<') return string(""); // 如果又出现了<。说明invalid
        }
        string tagName;
        if (end == code.size()) {
            p = end;
            return tagName;
        }
        tagName.assign(code.begin() + p, code.begin() + end + 1);
        p = end;
        return tagName;
    }   
};
```

