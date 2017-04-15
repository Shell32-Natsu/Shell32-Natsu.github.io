---
title: LeetCode 71. Simplify Path
tags:
  - CPP
  - LeetCode
  - 栈
  - 算法
url: 595.html
id: 595
categories:
  - LeetCode
date: 2016-08-09 17:23:24
---
题目描述:

>Given an absolute path for a file (Unix-style), simplify it.
>For example,
>**path** = `"/home/"`, => `"/home"`
>**path** = `"/a/./b/../../c/"`, => `"/c"`
>**Corner Cases:**
>+ Did you consider the case where **path** = `"/../"`?
>  In this case, you should return `"/"`.
>+ Another corner case is the path might contain multiple slashes `'/'` together, such as `"/home//foo/"`.
>  In this case, you should ignore redundant slashes and return `"/home/foo"`.

题目要求简化一个路径, 要做到两点:
1. 去掉无效的`/`, 比如连续的`/`和结尾的`/`
2. 把`.`和`..`这种相对路径转换为绝对路径

先使用栈保存`/`分割的每个节点, 在处理过程中分为三种情况:

1. 节点为`.`: 不做任何处理
2. 节点为`..`: 若栈不为空则弹出栈顶元素
3. 否则将节点入栈

最后把栈变为字符串输出.

    class Solution {
    public:
        string simplifyPath(string path) {
            vector<string> pathStack = splitPath(path);
            return getFinPath(pathStack);
        }
    
        string getFinPath(vector<string> &finStack){
            string re = "";
            for(int i = 0 ; i < finStack.size(); i++){
                re += "/";
                re += finStack[i];
            }
            if(re == "")
                re = "/";
            return re;
        }
    
        vector<string> splitPath(string path){
            vector<string> re;
            for(int i = 0; i < path.size(); i++){
                if(path[i] != '/'){
                    int end = getEnd(path, i);
                    string node = string(path.begin() + i, path.begin() + end);
                    if(node == string(".")){
                        // do nothing
                    }
                    else if(node == string("..")){
                        if(!re.empty()) re.pop_back();
                    }
                    else{
                        re.push_back(node);
                    }
                    i = end;
                }
            }
            return re;
        }
    
        int getEnd(string path, int start){
            int i = start;
            for(; i < path.size() && path[i] != '/'; i++);
            return i;
        }
    };