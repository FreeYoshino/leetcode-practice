# [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/description/)

You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.

Merge the two lists into one **sorted**  list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Example 1:** 
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg" style="width: 662px; height: 302px;">

```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:** 

```
Input: list1 = [], list2 = []
Output: []
```

**Example 3:** 

```
Input: list1 = [], list2 = [0]
Output: [0]
```

**Constraints:** 

- The number of nodes in both lists is in the range <code>[0, 50]</code>.
- <code>-100 <= Node.val <= 100</code>
- Both <code>list1</code> and <code>list2</code> are sorted in **non-decreasing**  order.