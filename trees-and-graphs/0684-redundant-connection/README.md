# [684. Redundant Connection](https://leetcode.com/problems/redundant-connection/description/)

In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with <code>n</code> nodes labeled from <code>1</code> to <code>n</code>, with one additional edge added. The added edge has two **different** vertices chosen from <code>1</code> to <code>n</code>, and was not an edge that already existed. The graph is represented as an array <code>edges</code> of length <code>n</code> where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the graph.

Return an edge that can be removed so that the resulting graph is a tree of <code>n</code> nodes. If there are multiple answers, return the answer that occurs last in the input.

**Example 1:**
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/02/reduntant1-1-graph.jpg" style="width: 222px; height: 222px;">

```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

**Example 2:**
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/02/reduntant1-2-graph.jpg" style="width: 382px; height: 222px;">

```
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
```

**Constraints:**

- <code>n == edges.length</code>
- <code>3 <= n <= 1000</code>
- <code>edges[i].length == 2</code>
- <code>1 <= a<sub>i</sub> < b<sub>i</sub> <= edges.length</code>
- <code>a<sub>i</sub> != b<sub>i</sub></code>
- There are no repeated edges.
- The given graph is connected.
