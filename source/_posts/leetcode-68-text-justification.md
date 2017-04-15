---
title: LeetCode 68. Text Justification
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 586.html
id: 586
categories:
  - LeetCode
date: 2016-08-08 18:46:31
---
题目描述:

>Given an array of words and a length L, format the text such that each line has exactly L characters and is fully (left and right) justified.
>
>You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly L characters.
>
>Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.
>
>For the last line of text, it should be left justified and no extra space is inserted between words.
>
>For example,
>
>words: `["This", "is", "an", "example", "of", "text", "justification."]`
>
>L: `16`.
>
>Return the formatted lines as:
>
>     [
>        "This    is    an",
>        "example  of text",
>        "justification.  "
>     ]
>Note: Each word is guaranteed not to exceed L in length.

细节比较多, 难度倒也不是很大, 但是这种题在面试的时候我觉得更难, 因为考虑许多情况, 人肉调试还是比较困难的.

    class Solution {
    public:
        vector<string> fullJustify(vector<string>& words, int maxWidth) {
            vector<string> ret;
            if(maxWidth == 0) { // 因为每个单词长度都不会超过maxWidth, 所以可以直接返回
                ret.push_back(string(""));
                return ret;
            }
            // start保存每行单词的起始下标, end表示结束下标, 单词的下标范围为[start, end)
            // lenInLine保存每一行的长度
            int start = 0, end = 0, lenInLine = 0;
            while (start < words.size()) {
                // 计算这一行能放多少个单词, 把第一个单词放进去, +1是因为后面还有一个空格
                lenInLine = words[start].length() + 1; 
                end = start + 1; 
                while (end < words.size() && lenInLine < maxWidth) {
                    lenInLine += words[end++].length();
                    lenInLine += 1; // 计算空格
                }
                if(lenInLine - 1 > maxWidth){ // 去掉尾部空格后如果还是大于maxWidth, 那么应该少放一个单词
                    end--;
                }
                if (end == words.size()) { // 根据题目, 最后一行要单独处理, 使用左对齐而不是两端对齐
                    string line = words[start];
                    for (int i = start + 1; i < end; i++) {
                        line += " ";
                        line += words[i];
                    }
                    line.insert(line.end(), maxWidth - line.length(), ' ');
                    ret.push_back(line);
                }
                else {
                    createLine(words, start, end, ret, maxWidth); // 创建行
                }
                start = end;
            }
            return ret;
        }

        void createLine(vector<string> &words, int start, int end, vector<string> &ret, int maxWidth) {
            string line;
            int wordCnt = end - start, spacePerInterval = 0, spaceCnt = maxWidth;
            if (wordCnt == 0) return; // end == start, 没有单词
            for (int i = start; i < end; i++) { // 计算总空格数
                spaceCnt -= words[i].length();
            }
            // 如果spaceCnt不能平均分配, 那么左边的一个或多个间隔就要增加一个空格
            // moreSpaceLen保存左边的多少个间隔需要多的空格
            int moreSpaceLen = spaceCnt % (wordCnt - 1 ? wordCnt - 1 : 1);
            spacePerInterval = spaceCnt / (wordCnt - 1 ? wordCnt - 1 : 1);
            line += words[start];
            if(wordCnt == 1){
                // 因为下面的循环从start + 1开始, 所以如果行内只有一个单词,
                // 就要在其之后填充空格直到长度达到maxWidth
                line.insert(line.end(), maxWidth - line.length(), ' ');
            }
            else{
                for (int i = start + 1; i < end; i++) {
                    if (i <= start + moreSpaceLen) {
                        line.insert(line.end(), spacePerInterval + 1, ' ');
                    }
                    else {
                        line.insert(line.end(), spacePerInterval, ' ');
                    }
                    line += words[i];
                }
            }
            ret.push_back(line);
        }
    };