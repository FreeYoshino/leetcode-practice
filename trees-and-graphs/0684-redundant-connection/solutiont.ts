/**
 * 題號： 684
 * 題目： Redundant Connection
 * 連結： https://leetcode.com/problems/redundant-connection/description/
 * 時間複雜度：O(n * α(n))
 * - 其中 n 是邊的數量，對每一條邊都會執行一次 union。
 * - Union-Find 搭配路徑壓縮與按秩合併後，find / union 的攤銷時間接近 O(1)，更精確地說是 O(α(n))。
 * - 因此整體複雜度為 O(n * α(n))，在實務上幾乎可視為線性時間。
 * 空間複雜度：O(n)
 * - 主要來自 parent 與 rank 兩個陣列，大小都與節點數成正比。
 * 解題思路：
 * - 這題要找出最後一條會讓圖形成環的邊，因此可以依序處理每一條邊。
 * - 使用 Union-Find 維護目前哪些節點已經屬於同一個連通分量。
 * - 每次讀到一條邊 (u, v) 時，先分別找出兩端點的根節點：
 *   - 如果根節點相同，表示 u 和 v 原本已經連在一起，再加入這條邊就會形成環，這條邊就是答案。
 *   - 如果根節點不同，則把兩個集合合併，繼續處理下一條邊。
 * - 由於題目保證只有一條冗餘邊，所以第一次發現 union 失敗時即可直接回傳該邊。
 */

class UnionFind {
  parent: number[];
  rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size + 1 }, (_, index) => index);
    this.rank = Array.from({ length: size + 1 }, () => 0);
  }

  find = (x: number): number => {
    // 路徑壓縮: 將節點的父節點直接指向根節點(最上層)，以加速後續查找操作
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }

    return this.parent[x];
  };

  // 合併兩個集合，並返回是否成功合併
  union = (x: number, y: number): boolean => {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      // 如果兩個節點已經在同一個集合中，則表示存在環，返回 false
      return false;
    }

    // 按秩合併: 將秩較小的樹合併到秩較大的樹上，以保持樹的平衡
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      // 當兩個樹的秩相同時，將其中一個樹的根設為另一個樹的根，並增加其秩
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  };
}

class Solution {
  findRedundantConnection(edges: number[][]): number[] {
    // 使用Union-Find（Disjoint Set Union）來檢測圖中是否存在環
    const n = edges.length;
    const uf = new UnionFind(n);
    let redundantEdge: number[] = [];

    for (const [u, v] of edges) {
      // 由於題目保證圖中只有一條冗餘邊，因此當 union 返回 false 時，表示找到了導致環的邊 可以直接返回該邊
      if (!uf.union(u, v)) {
        redundantEdge = [u, v];
        break;
      }
    }

    return redundantEdge;
  }
}

interface TestCase {
  edges: number[][];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    edges: [
      [1, 2],
      [1, 3],
      [2, 3],
    ],
    answer: [2, 3],
  },
  {
    edges: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 4],
      [1, 5],
    ],
    answer: [1, 4],
  },
];

testCases.forEach(({ edges, answer }, index) => {
  const solution = new Solution();
  const result = solution.findRedundantConnection(edges);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: edges = ${JSON.stringify(edges)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
