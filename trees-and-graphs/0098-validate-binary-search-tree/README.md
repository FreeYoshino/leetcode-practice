# [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/description/)

Given the <code>root</code> of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST**  is defined as follows:

- The left <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1n_" data-state="closed" class="">subtree</button> of a node contains only nodes with keys **strictly less than**  the node's key.
- The right subtree of a node contains only nodes with keys **strictly greater than**  the node's key.
- Both the left and right subtrees must also be binary search trees.

**Example 1:** 
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg" style="width: 302px; height: 182px;">

```
Input: root = [2,1,3]
Output: true
```

**Example 2:** 
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg" style="width: 422px; height: 292px;">

```
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

**Constraints:** 

- The number of nodes in the tree is in the range <code>[1, 10^4]</code>.
- <code>-2^31 <= Node.val <= 2^31 - 1</code>