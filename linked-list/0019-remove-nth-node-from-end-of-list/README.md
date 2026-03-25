# [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/)

Given the <code>head</code> of a linked list, remove the <code>n^th</code> node from the end of the list and return its head.

**Example 1:** 
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg" style="width: 542px; height: 222px;">

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

**Example 2:** 

```
Input: head = [1], n = 1
Output: []
```

**Example 3:** 

```
Input: head = [1,2], n = 1
Output: [1]
```

**Constraints:** 

- The number of nodes in the list is <code>sz</code>.
- <code>1 <= sz <= 30</code>
- <code>0 <= Node.val <= 100</code>
- <code>1 <= n <= sz</code>

**Follow up:**  Could you do this in one pass?