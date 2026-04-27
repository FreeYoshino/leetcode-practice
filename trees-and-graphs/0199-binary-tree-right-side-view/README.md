# [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/description/)

Given the <code>root</code> of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.

**Example 1:**

<div class="example-block">
Input: root = [1,2,3,null,5,null,4]

Output: [1,3,4]

Explanation:

<img alt="" src="https://assets.leetcode.com/uploads/2024/11/24/tmpd5jn43fs-1.png" style="width: 400px; height: 207px;">

**Example 2:**

<div class="example-block">
Input: root = [1,2,3,4,null,null,null,5]

Output: [1,3,4,5]

Explanation:

<img alt="" src="https://assets.leetcode.com/uploads/2024/11/24/tmpkpe40xeh-1.png" style="width: 400px; height: 214px;">

**Example 3:**

<div class="example-block">
Input: root = [1,null,3]

Output: [1,3]

**Example 4:**

<div class="example-block">
Input: root = []

Output: []

**Constraints:**

- The number of nodes in the tree is in the range <code>[0, 100]</code>.
- <code>-100 <= Node.val <= 100</code>
