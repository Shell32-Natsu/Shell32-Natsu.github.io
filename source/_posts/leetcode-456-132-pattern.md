---
title: LeetCode 456. 132 Pattern
tags:
  - CPP
  - LeetCode
  - 栈
  - 算法
url: 963.html
id: 963
categories:
  - LeetCode
date: 2016-11-17 18:28:39
---
题目描述:

> Given a sequence of n integers a1, a2, ..., an, a 132 pattern is a subsequence a**i**, a**j**, a**k** such that **i** < **j** < **k** and a**i** < a**k** < a**j**. Design an algorithm that takes a list of n numbers as input and checks whether there is a 132 pattern in the list.
>
> **Note:** n will be less than 15,000.
>
> **Example 1:**
>
> ```
> Input: [1, 2, 3, 4]
>
> Output: False
>
> Explanation: There is no 132 pattern in the sequence.
>
> ```
>
> **Example 2:**
>
> ```
> Input: [3, 1, 4, 2]
>
> Output: True
>
> Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
>
> ```
>
> **Example 3:**
>
> ```
> Input: [-1, 3, 2, 0]
>
> Output: True
>
> Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].
> ```

这道题一开始我用了最直接的O(n^2)时间复杂度的解法, 后来仔细想了一下后才想出O(n)复杂度的解法.

主要思路是使用栈, 从后往前遍历nums. 假如我们遍历到了元素$a_k$, 那么在继续往前遍历的过程中, $a_k$有两种状态: 

1. 等待找到一个比$a_k$大的元素$a_j$.
2. 如果找到了$a_j$, 那么$a_k$就要等待找到一个比$a_k$小的元素$a_i$.

问题在于$a_j$与$a_k$之间会有很多个其他元素, 这些元素一定比$a_k$小或相等, 因此当出现$a_j$的时候, $a_{j+1}\dots a_k$都会进入第二种状态, 对于$a_k$之后的元素则仍然处于第一种状态. 可以用一个栈来保存处于第一种状态的元素, 出现$a_j$时, 就弹出所有小于$a_j$的元素, 并把这些元素都压入另一个栈中.

仔细想一想, 每次从第一个栈中弹出的元素都一定是有序的, 越接近栈顶越小, 如果按照出栈的顺序压入第二个栈中, 就是越接近栈顶的元素越大, 当我们遍历到另一个元素$a_i$时, 只要它比第二个栈的栈顶元素小, 我们就可以确定函数返回true. 所以实际上我们并不需要第二个栈, 只要用一个变量来保存第一个栈中最后一个弹出的元素就可以了.

最后, 关于这个算法的复杂度. 首先遍历数组是O(n), 然后每一个数组中的元素都**只有一次**入栈和出栈的机会, 因此总的复杂度是O(n). 因为每个元素只能入栈一次, 所以我们可以一开始就设置栈的最大大小, 手动维护栈顶, 以避免栈大小动态增长过程中的开销.

```cpp
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        if(nums.size() < 3) return false;
        vector<int> waitGreater(nums.size());
        int maxWaitSmaller = INT_MIN, top = -1;
        for(int i = nums.size() - 1; i >= 0; i--){
            if(top < 0 || nums[i] < waitGreater[top]){
                waitGreater[++top] = nums[i];
            }
            else if(nums[i] > waitGreater[top]){
                while(top >= 0 && waitGreater[top] < nums[i]){
                    top--;
                }
                maxWaitSmaller = waitGreater[top + 1];
                
                waitGreater[++top] = nums[i];
            }
            
            if(maxWaitSmaller != INT_MIN && nums[i] < maxWaitSmaller) return true;
        }
        return false;
    }
};
```

