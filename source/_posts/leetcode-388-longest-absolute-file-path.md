---
title: LeetCode 388. Longest Absolute File Path
tags:
  - CPP
  - LeetCode
  - 栈
  - 算法
url: 667.html
id: 667
categories:
  - LeetCode
date: 2016-08-23 21:16:29
---
题目描述:

> Suppose we abstract our file system by a string in the following manner:
>
> The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:
>
> dir
>     subdir1
>     subdir2
>         file.ext
> The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.
>
> The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:
>
> dir
>     subdir1
>         file1.ext
>         subsubdir1
>     subdir2
>         subsubdir2
>             file2.ext
> The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.
>
> We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).
>
> Given a string representing the file system in the above format, return the length of the longest absolute path to file in the abstracted file system. If there is no file in the system, return 0.
>
> Note:
> The name of a file contains at least a . and an extension.
> The name of a directory or sub-directory will not contain a ..
> Time complexity required: O(n) where n is the size of the input string.
>
> Notice that a/aa/aaa/file1.txt is not the longest file path, if there is another path aaaaaaaaaaaaaaaaaaaaa/sth.png.

虽然题目描述非常的长, 但是实际的难度并不大. 目录结构是一个树形结构, 使用栈可以模拟深度优先搜索, 遍历根目录到每一个叶子节点的路径, 从中找出总长度最长的一条路径. 每个节点通过`\n`分割, 而每个节点前的`\t`的个数就是该节点所的层次.

要注意输入字符串中`\n`和`\t`都只是**一个字符**而不是两个字符.

```cpp
class Solution {
public:
    int lengthLongestPath(string input) {
        vector<int> pathLevel; // 记录path中节点的层次
        vector<string> path; // 记录路径
        int pos = 0, nextPos = 0, maxLen = 0;
        while(true){
            nextPos = input.find("\n", pos);
            string node = input.substr(pos, nextPos - pos); // 获取当前节点的字符串
            
            int level = getLevel(node);

            while(!pathLevel.empty() && pathLevel.back() >= level){ // 路径退回到当前节点的上一层
                pathLevel.pop_back();
                path.pop_back();
            }
            
            path.push_back(node);
            pathLevel.push_back(level);
            
            if(isFile(node)){
                maxLen = max(maxLen, getTotalLen(path) - 1);
            }
            
            if(nextPos == string::npos) break;
            pos = nextPos + 1;
        }
        return maxLen;
    }
    
    bool isFile(string &s){ // 判断是不是file
        int index = s.find('.');
        if(index == string::npos || index == s.length() - 1) return false;
        else return true;
    }
    
    int getTotalLen(vector<string> &v){ // 根据path计算总长度
        int len = 0;
        for(auto s : v){
            len += s.length();
            len++;
        }
        return len;
    }
    
    int getLevel(string &s){ // 计算字符串头部\t的个数
        if(s.length() < 2) return 0;
        int level = 0;
        for(int i = 0; i < s.length(); i++){
            if(s[i] == '\t' ){
                level++;
            }
        }
        s = s.substr(level); // 清除头部的\t
        return level;
    }
};
```

