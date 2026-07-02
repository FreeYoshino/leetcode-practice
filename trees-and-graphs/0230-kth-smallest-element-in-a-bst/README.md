# [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/)

Given the <code>root</code> of a binary search tree, and an integer <code>k</code>, return the <code>k^th</code> smallest value (**1-indexed** ) of all the values of the nodes in the tree.

**Example 1:**
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg" style="width: 212px; height: 301px;">

```
Input: root = [3,1,4,null,2], k = 1
Output: 1
```

**Example 2:**
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg" style="width: 382px; height: 302px;">

```
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

**Constraints:**

- The number of nodes in the tree is <code>n</code>.
- <code>1 <= k <= n <= 10^4</code>
- <code>0 <= Node.val <= 10^4</code>

**Follow up:** If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?
