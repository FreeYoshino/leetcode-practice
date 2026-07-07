# [743. Network Delay Time](https://leetcode.com/problems/network-delay-time/description/)

You are given a network of <code>n</code> nodes, labeled from <code>1</code> to <code>n</code>. You are also given <code>times</code>, a list of travel times as directed edges <code>times[i] = (u<sub>i</sub>, v<sub>i</sub>, w<sub>i</sub>)</code>, where <code>u<sub>i</sub></code> is the source node, <code>v<sub>i</sub></code> is the target node, and <code>w<sub>i</sub></code> is the time it takes for a signal to travel from source to target.

We will send a signal from a given node <code>k</code>. Return the **minimum** time it takes for all the <code>n</code> nodes to receive the signal. If it is impossible for all the <code>n</code> nodes to receive the signal, return <code>-1</code>.

**Example 1:**
<img alt="" src="https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png" style="width: 217px; height: 239px;">

```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

**Example 2:**

```
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

**Example 3:**

```
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
```

**Constraints:**

- <code>1 <= k <= n <= 100</code>
- <code>1 <= times.length <= 6000</code>
- <code>times[i].length == 3</code>
- <code>1 <= u<sub>i</sub>, v<sub>i</sub> <= n</code>
- <code>u<sub>i</sub> != v<sub>i</sub></code>
- <code>0 <= w<sub>i</sub> <= 100</code>
- All the pairs <code>(u<sub>i</sub>, v<sub>i</sub>)</code> are **unique** . (i.e., no multiple edges.)
