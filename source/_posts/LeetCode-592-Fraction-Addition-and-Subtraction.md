---
title: LeetCode 592. Fraction Addition and Subtraction
date: 2017-08-07 18:17:25
tags:
 - LeetCode
 - CPP
 - 算法
 - 字符串
categories:
 - LeetCode
---

Given a string representing an expression of fraction addition and subtraction, you need to return the calculation result in string format. The final result should be [irreducible fraction](https://en.wikipedia.org/wiki/Irreducible_fraction). If your final result is an integer, say `2`, you need to change it to the format of fraction that has denominator `1`. So in this case, `2` should be converted to `2/1`.

**Example 1:**

```
Input:"-1/2+1/2"
Output: "0/1"

```

**Example 2:**

```
Input:"-1/2+1/2+1/3"
Output: "1/3"

```

**Example 3:**

```
Input:"1/3-1/2"
Output: "-1/6"

```

**Example 4:**

```
Input:"5/3+1/3"
Output: "2/1"

```

**Note:**

1. The input string only contains `'0'` to `'9'`, `'/'`, `'+'` and `'-'`. So does the output.
2. Each fraction (input and output) has format `±numerator/denominator`. If the first input fraction or the output is positive, then `'+'`will be omitted.
3. The input only contains valid **irreducible fractions**, where the **numerator** and **denominator** of each fraction will always be in the range [1,10]. If the denominator is 1, it means this fraction is actually an integer in a fraction format defined above.
4. The number of given fractions will be in the range [1,10].
5. The numerator and denominator of the **final result** are guaranteed to be valid and in the range of 32-bit int.

<!-- more -->

-----------

模拟分数的计算，我总是觉得好像做过类似的题。

其实就是单纯的模拟手算就可以了，一个分数有三个属性：

1. 分子
2. 分母
3. 符号

依次地读取和计算就可以了，最后再求一个最大公约数（辗转相除法）。

为了实现的简洁优雅一些，并且提高代码复用性，我定义了一个`Fraction`类并重载了`+`运算符来进行分数的计算。

```cpp
class Fraction {
public:
    int numerator;
    int denominator;
    int sign;
    
    Fraction(int a, int b) : numerator(a), denominator(b), sign(1) {}
    Fraction(int a, int b, int s) : numerator(a), denominator(b), sign(s) {}
    Fraction() : numerator(0), denominator(1), sign(1) {} // 初始化为0(0/1)
    Fraction operator + (const Fraction& b) {
        int ta, tb; // ta分子，tb分母
        tb = denominator * b.denominator;
        
        if (this->sign == -1) ta = -numerator;
        else ta = numerator;
        
        ta *= b.denominator;
        
        if (b.sign == -1) ta += (-b.numerator * denominator);
        else ta += (b.numerator * denominator);
        
        return Fraction(abs(ta), tb, ta >= 0 ? 1 : -1);
    }
    
    void print() {
        printf("%s%d/%d\n", sign == 1 ? "" : "-", numerator, denominator);
    }
    
    string getString() {
        if (numerator == 0) denominator = 1;
        else {
            int gcd = getGcd(numerator, denominator);
            numerator /= gcd;
            denominator /= gcd;
        }
        string ans = (sign == 1 ? "" : "-");
        ans += (to_string(numerator) + "/" + to_string(denominator));
        return ans;
    }
    
    int getGcd(int a, int b) {
        if (a < b) swap(a, b);
        if (a % b == 0) return b;
        else return getGcd(b, a % b);
    }
};

class Solution {
public:
    string fractionAddition(string expression) {
        if (expression[0] != '-') {
            expression.insert(expression.begin(), '+');
        }
        Fraction ans;
        int p = 0;
        while (p < expression.size()) {
            Fraction next;
            p = readFraction(expression, p, next);
            ans  = ans + next;
        }
        return ans.getString();
    }
    
    int readFraction(const string& expression, int p, Fraction &frac) {
        if (expression[p++] == '-') {
            frac.sign = -1;
        }
        else {
            frac.sign = 1;
        }
        
        int nextP = p;
        while (nextP < expression.size() && isdigit(expression[nextP])) nextP++;
        frac.numerator = stoi(string(expression.begin() + p, expression.begin() + nextP));
        
        p = nextP + 1;
        nextP = p;
        while (nextP < expression.size() && isdigit(expression[nextP])) nextP++;
        frac.denominator = stoi(string(expression.begin() + p, expression.begin() + nextP));
        return nextP;
    }
};
```

