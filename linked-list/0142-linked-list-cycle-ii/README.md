# [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/description/)

Given the <code>head</code> of a linked list, return the node where the cycle begins. If there is no cycle, return <code>null</code>.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the <code>next</code> pointer. Internally, <code>pos</code> is used to denote the index of the node that tail's <code>next</code> pointer is connected to (**0-indexed** ). It is <code>-1</code> if there is no cycle. **Note that**  <code>pos</code> **is not passed as a parameter** .

**Do not modify**  the linked list.

**Example 1:** 
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png" style="height: 145px; width: 450px;">

```
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.
```

**Example 2:** 
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png" style="height: 105px; width: 201px;">

```
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.
```

**Example 3:** 
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png" style="height: 65px; width: 65px;">

```
Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.
```

**Constraints:** 

- The number of the nodes in the list is in the range <code>[0, 10^4]</code>.
- <code>-10^5 <= Node.val <= 10^5</code>
- <code>pos</code> is <code>-1</code> or a **valid index**  in the linked-list.

**Follow up:**  Can you solve it using <code>O(1)</code> (i.e. constant) memory?