/**
 * 題號： 133
 * 標題： Clone Graph
 * 連結： https://leetcode.com/problems/clone-graph/description/
 * 時間複雜度： O(V + E)
 * 空間複雜度： O(V)
 * - V 為節點數，E 為邊數
 * - `cloneMap` 與 `queue` 在最壞情況下都會儲存所有節點
 * 解題思路：
 * - 這題是要複製整張圖，所以必須同時保留每個節點本身與它的鄰居關係。
 * - 使用 BFS 從起點開始走訪，並用 `cloneMap` 記錄「原節點值 -> 複製節點」，避免重複建立節點或陷入環狀圖的無限迴圈。
 * - 每次遇到鄰居時，若還沒複製就先建立對應節點並加入佇列；接著把複製後的鄰居接到目前節點的鄰居列表中。
 * - 因為每個節點只會被建立一次，每條邊也只會在走訪時被檢查一次，所以總時間複雜度是 O(V + E)。
 */

import { _Node, arrayToGraph, graphToArray } from '../../utils/graph/_Node.ts';

function cloneGraph(node: _Node | null): _Node | null {
  if (!node) return null;

  // BFS 遍歷圖 找出並複製所有節點
  const cloneMap = new Map<number, _Node>();
  const queue: _Node[] = [];

  // 初始化起點
  cloneMap.set(node.val, new _Node(node.val));
  queue.push(node);

  while (queue.length > 0) {
    const current = queue.shift()!;

    // 建立鄰居關係
    for (const neighbor of current.neighbors) {
      if (!cloneMap.has(neighbor.val)) {
        cloneMap.set(neighbor.val, new _Node(neighbor.val));
        queue.push(neighbor);
      }

      // 將複製的鄰居加入當前節點的鄰居列表
      cloneMap.get(current.val)!.neighbors.push(cloneMap.get(neighbor.val)!);
    }
  }

  return cloneMap.get(node.val)!;
}

interface TestCase {
  adjList: number[][];
  answer: number[][];
}

const testCases: TestCase[] = [
  {
    adjList: [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ],
    answer: [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ],
  },
  {
    adjList: [[]],
    answer: [[]],
  },
  {
    adjList: [],
    answer: [],
  },
];

testCases.forEach(({ adjList, answer }, index) => {
  const graph = arrayToGraph(adjList);
  const clonedGraph = cloneGraph(graph);
  const clonedAdjList = graphToArray(clonedGraph);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: adjList = ${JSON.stringify(adjList)}`);
  console.log(`Output: ${JSON.stringify(clonedAdjList)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
