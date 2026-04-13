# [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/description/)

Given <code>head</code>, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the<code>next</code>pointer. Internally, <code>pos</code>is used to denote the index of the node thattail's<code>next</code>pointer is connected to.**Note that<code>pos</code>is not passed as a parameter** .

Return<code>true</code> if there is a cycle in the linked list. Otherwise, return <code>false</code>.

**Example 1:** 
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png" style="width: 300px; height: 97px; margin-top: 8px; margin-bottom: 8px;">

```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```

**Example 2:** 
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png" style="width: 141px; height: 74px;">

```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

**Example 3:** 
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png" style="width: 45px; height: 45px;">

```
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

**Constraints:** 

- The number of the nodes in the list is in the range <code>[0, 10^4]</code>.
- <code>-10^5 <= Node.val <= 10^5</code>
- <code>pos</code> is <code>-1</code> or a **valid index**  in the linked-list.

**Follow up:**  Can you solve it using <code>O(1)</code> (i.e. constant) memory?