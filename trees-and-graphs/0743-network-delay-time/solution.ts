/**
 * 題號： 743
 * 題目： Network Delay Time
 * 連結： https://leetcode.com/problems/network-delay-time/description/
 * 時間複雜度：
 * - Dijkstra：O((n + m) log m)
 *   - 其中 n 是節點數、m 是邊數。建圖需要 O(m)，優先佇列的 enqueue / dequeue 需要 O(log m)。
 * - SPFA：最差 O(n * m)
 *   - 在最壞情況下，節點可能因為找到更短路徑而被反覆加入 queue，導致邊被多次鬆弛。
 * 空間複雜度：
 * - Dijkstra：O(n + m)
 * - SPFA：O(n + m)
 *   - 鄰接表、dist 陣列，以及 PQ / queue / inQueue 都是主要額外空間。
 * 解題思路：
 * - 先將 times 轉成鄰接表 graph，方便快速查詢每個節點的鄰居與權重。
 * - Dijkstra 解法：
 *   - 從起點 k 出發，使用最小優先佇列每次取出目前距離最小的節點。
 *   - 對該節點的鄰居進行鬆弛，如果找到更短距離，就更新 dist 並重新加入優先佇列。
 *   - 加上過期狀態檢查，可跳過已經不是最短路徑的舊節點，減少無效計算。
 * - SPFA 解法：
 *   - 同樣從起點 k 出發，但改用 queue 來持續傳播最短距離的更新。
 *   - 當某個節點的距離被更新時，若它不在 queue 中，就把它重新加入 queue。
 *   - 這種寫法外觀很像 BFS，但本質上是在做最短路鬆弛的反覆傳播。
 * - 最後掃描 dist：若仍有節點是 Infinity，代表無法從 k 到達，回傳 -1；否則回傳最大距離。
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue';

class Solution {
  // 分別實現 Dijkstra + Priority Queue 的解法 和 SPFA (Shortest Path Faster Algorithm) 的解法
  Dijkstra(times: number[][], n: number, k: number): number {
    const graph: Map<number, [number, number][]> = this.buildGraph(times); // 建立圖的鄰接表表示

    const dist: number[] = Array.from({ length: n + 1 }, () => Infinity); // 初始化距離陣列
    dist[k] = 0; // 設定起點的距離為 0
    const pq = new MinPriorityQueue<[number, number]>((item) => item[1]); // 建立最小優先佇列(用距離作為優先權)
    pq.enqueue([k, 0]); // 將起點加入優先佇列

    while (!pq.isEmpty()) {
      // 從優先佇列中取出距離最小的節點 u
      const [u, d] = pq.dequeue()!;

      // 剪枝：如果當前距離 d 大於已知的最短距離 dist[u]，則跳過(代表為過期的節點)
      if (d > dist[u]) {
        continue;
      }

      const neighbors = graph.get(u);
      if (!neighbors) {
        continue; // 如果節點 u 沒有鄰居，跳過
      }

      for (const [v, w] of neighbors) {
        // 鬆弛操作
        if (d + w < dist[v]) {
          dist[v] = d + w; // 更新距離
          pq.enqueue([v, dist[v]]); // 將節點 v 加入優先佇列
        }
      }
    }

    let maxDist = 0;
    for (let i = 1; i <= n; i++) {
      if (dist[i] === Infinity) {
        return -1; // 如果有節點無法到達，返回 -1
      }

      maxDist = Math.max(maxDist, dist[i]); // 更新最大距離
    }
    return maxDist; // 返回最大距離
  }

  SPFA(times: number[][], n: number, k: number): number {
    const graph: Map<number, [number, number][]> = this.buildGraph(times); // 建立圖的鄰接表表示
    const dist: number[] = Array.from({ length: n + 1 }, () => Infinity); // dist[i] 表示從起點 k 到節點 i 的最短距離
    dist[k] = 0;
    const queue: number[] = [k];
    const inQueue: boolean[] = Array.from({ length: n + 1 }, () => false); // 加入inQueue陣列 避免重複加入queue
    inQueue[k] = true;
    while (queue.length > 0) {
      // 從 queue 中取出一個節點 u 並將其標記為不在 queue 中
      const u = queue.shift()!;
      inQueue[u] = false;

      const neighbors = graph.get(u);
      if (!neighbors) {
        continue; // 如果節點 u 沒有鄰居，跳過
      }

      for (const [v, w] of neighbors) {
        // 鬆弛操作
        if (dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;

          // 當佇列中沒有節點 v 時，才將其加入佇列，避免重複加入
          if (!inQueue[v]) {
            queue.push(v);
            inQueue[v] = true;
          }
        }
      }
    }

    let maxDist = 0;
    for (let i = 1; i <= n; i++) {
      if (dist[i] === Infinity) {
        return -1; // 如果有節點無法到達，返回 -1
      }

      maxDist = Math.max(maxDist, dist[i]);
    }

    return maxDist;
  }

  private buildGraph(times: number[][]): Map<number, [number, number][]> {
    const graph: Map<number, [number, number][]> = new Map(); // 建立圖的鄰接表表示
    for (const [u, v, w] of times) {
      let neighbors = graph.get(u);

      if (!neighbors) {
        neighbors = [];
        graph.set(u, neighbors);
      }

      neighbors.push([v, w]);
    }

    return graph;
  }
}

interface TestCase {
  times: number[][];
  n: number;
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    times: [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    n: 4,
    k: 2,
    answer: 2,
  },
  {
    times: [[1, 2, 1]],
    n: 2,
    k: 1,
    answer: 1,
  },
  {
    times: [[1, 2, 1]],
    n: 2,
    k: 2,
    answer: -1,
  },
];

testCases.forEach(({ times, n, k, answer }, index) => {
  const solution = new Solution();
  const resultDijkstra = solution.Dijkstra(times, n, k);
  const resultSPFA = solution.SPFA(times, n, k);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: times = ${JSON.stringify(times)}, n = ${n}, k = ${k}`);
  console.log(`Output (Dijkstra): ${resultDijkstra}`);
  console.log(`Output (SPFA): ${resultSPFA}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
