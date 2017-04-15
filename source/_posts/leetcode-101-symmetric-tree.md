---
title: LeetCode 101. Symmetric Tree
tags:
  - CPP
  - LeetCode
  - 栈
  - 算法
  - 递归
url: 686.html
id: 686
categories:
  - LeetCode
date: 2016-08-30 19:29:21
---
题目描述:

> Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).
>
> For example, this binary tree `[1,2,2,3,4,4,3]` is symmetric:
>
> ```
>     1
>    / \
>   2   2
>  / \ / \
> 3  4 4  3
>
> ```
>
> But the following `[1,2,2,null,3,null,3]` is not:
>
> ```
>     1
>    / \
>   2   2
>    \   \
>    3    3
>
> ```
>
> **Note:**
> Bonus points if you could solve it both recursively and iteratively.

最直观的方法就是先把二叉树翻转, 然后再判断两棵二叉树是否相同.

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
class Solution {
public:
    void copyTree(TreeNode* root, TreeNode *copy){
        if(!root){
            return;
        }
        if(root->left)
            copy->left = new TreeNode(root->left->val);
        else
            copy->left = NULL;
        copyTree(root->left, copy->left);
        if(root->right)
            copy->right = new TreeNode(root->right->val);
        else
            copy->right = NULL;
        copyTree(root->right, copy->right);
    }
    void reverseTree(TreeNode *root){
        if(!root)
            return;
        TreeNode *tmp = root->left;
        root->left = root->right;
        root->right = tmp;
        reverseTree(root->left);
        reverseTree(root->right);
    }
    bool sameTree(TreeNode* root1, TreeNode* root2){
        if(root1 == NULL && root2 == NULL)
            return true;
        if(root1 == NULL || root2 == NULL)
            return false;
        if(root1->val != root2->val)
            return false;
        return sameTree(root1->left, root2->left) && sameTree(root1->right, root2->right);
    }
    bool isSymmetric(TreeNode* root) {
        if(!root)
            return true;
        TreeNode *mirrorRoot = new TreeNode(root->val);
        copyTree(root, mirrorRoot);
        reverseTree(mirrorRoot);
        return sameTree(root, mirrorRoot);
    }
};
```

非递归的方法就是使用迭代而不是递归来分别从**不同的方向**遍历左右子树, **注意**, 不能用先序遍历或者后序遍历, 比如这组数据`[1,2,2,null,3,null,3]`使用先序遍历它的左右子树是互为镜像的. 

另外说一句, 直到这里我才去看非递归遍历二叉树的标准方法, 我以前都是用另一个栈来保存节点状态...很有力地证明了我的数据结构课听得很水= =.

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
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if(!root) return true;
        return isMirror(root->left, root->right);
    }
    
    bool isMirror(TreeNode* left, TreeNode *right){
        stack<TreeNode*> leftPath, rightPath;
        while((!leftPath.empty() || left != nullptr) && (!rightPath.empty() || right != nullptr)){
            TreeNode *curLeftNode = nullptr, *curRightNode = nullptr;
            if(left != nullptr){
                leftPath.push(left);
                left = left->left;
            }
            else{
                left = leftPath.top();
                curLeftNode = left;
                leftPath.pop();
                left = left->right;
            }
            if(right != nullptr){
                rightPath.push(right);
                right = right->right;
            }
            else{
                right = rightPath.top();
                curRightNode = right;
                rightPath.pop();
                right = right->left;
            }
            if((curLeftNode && curRightNode && curLeftNode->val != curRightNode->val) || (!(curLeftNode && curRightNode) && !(curLeftNode == nullptr && curRightNode == nullptr))) {
                // 这个布尔表达式的意思是当前的左右节点都不为null并且值不等, 或者其中有且只有
                // 一个null
                return false;
            }
        }
        if(leftPath.empty() && left == nullptr && rightPath.empty() && right == nullptr) return true;
        else return false;
    }
};
```

附上标准的非递归遍历方法:

```cpp
// 先序遍历
void preOrderIter(struct node *root)  
{  
    stack<struct node *> s;  
    while (root != NULL || !s.empty()) {  
        if (root != NULL) {  
            cout << root->data << " "; //访问结点并入栈  
            s.push(root);                
            root = root->left;         //访问左子树  
        } else {  
            root = s.top();            //回溯至父亲结点  
            s.pop();  
            root = root->right;        //访问右子树  
        }  
    }  
    cout << endl;  
}

// 中序遍历
void inOrderIter(struct node *root)  
{  
    stack<struct node *> s;  
    while (root != NULL || !s.empty()) {  
        if (root != NULL) {  
            s.push(root);  
            root = root->left;  
        }  
        else {  
            root = s.top();  
            cout << root->data << " ";  //访问完左子树后才访问根结点  
            s.pop();  
            root = root->right;        //访问右子树  
        }  
    }  
    cout << endl;  
}

// 后序遍历
void postOrderIter(struct node *root)  
{  
    if (!root) return;  
    stack<struct node*> s, output;  
    s.push(root);  
    while (!s.empty()) {  
        struct node *curr = s.top();  
        output.push(curr);  
        s.pop();  
        if (curr->left)  
            s.push(curr->left);  
        if (curr->right)  
            s.push(curr->right);  
    }  
      
    while (!output.empty()) {  
        cout << output.top()->data << " ";  
        output.pop();  
    }  
    cout << endl;  
}
```

