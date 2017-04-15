---
title: LeetCode 29. Divide Two Integers
url: 465.html
id: 465
categories:
  - LeetCode
date: 2016-07-23 18:00:47
tags:
---
题目描述:

> Divide two integers without using multiplication, division and mod operator.
> 
> If it is overflow, return MAX_INT.

不使用乘除和取模运算实现整数除法. 我的实现方法是使用位运算来实现二进制除法, 首先确定结果的符号位后取得被除数与除数的绝对值, 这样就可以只考虑原码不用考虑补码除法. 需要注意的是对于`INT_MIN`这个值(也就是-2147483648)要特殊处理, 因为它的值是这样的: `0x80000000`, 也就是只有最高位是1, `abs`函数无法对这个值取绝对值, 而且可能造成溢出问题.

关于二进制除法可以参考这里: <http://www.tyut.edu.cn/kecheng1/2008/site08/courseware/chapter1/1.2.htm>

> 二进制数除法与十进制数除法很类似。可先从被除数的最高位开始，将被除数（或中间余数）与除数相比较，若被除数（或中间余数）大于除数，则用被除数（或中间余数）减去除数，商为1，并得相减之后的中间余数，否则商为0。再将被除数的下一位移下补充到中间余数的末位，重复以上过程，就可得到所要求的各位商数和最终的余数。

代码:

    class Solution {
    public:
        int divide(int dividend, int divisor) {
            if(divisor == 0) return INT_MAX;
            int sign = (dividend ^ divisor) & 0x80000000 ? -1 : 1;
            int absDividend = abs(dividend), absDivisor = abs(divisor);
            if(dividend == INT_MIN){
                if(divisor == -1) return INT_MAX;
                else absDividend = INT_MIN;
            }
            else{
                if(absDividend < absDivisor) return 0;
            }
            
            return sign * absDivid(absDividend, absDivisor);
        }
        
        int absDivid(unsigned int dividend, unsigned int divisor){
            int mDividend = getBit(dividend, 31), ret = 0;
            for(int i = 31; i >= 0; i--){
                if(mDividend >= divisor){
                    ret |= (1 << i);A
                    mDividend = mDividend - divisor;
                }
                if(i != 0){
                    mDividend = (mDividend << 1) + getBit(dividend, i - 1);
                }
            }
            return ret;
        }
        
        int getBit(unsigned int n, int p){
            return n & (1 << p) ? 1 : 0;
        }
    };

这段代码是默认`int`类型长度是4个字节.