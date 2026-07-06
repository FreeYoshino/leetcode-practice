/**
 * 題號： 417
 * 題目： Pacific Atlantic Water Flow
 * 連結： https://leetcode.com/problems/pacific-atlantic-water-flow/description/
 * 時間複雜度：
 * - BFS：O(m * n)
 * - DFS：O(m * n)
 * - 每個格子對每個海洋最多只會被拜訪一次，且每次只檢查固定 4 個方向。
 * 空間複雜度：
 * - BFS：O(m * n)
 *   - 兩個 visited 陣列需要 O(m * n)，兩個 queue 在最壞情況下也可能累積到 O(m * n)。
 * - DFS：O(m * n)
 *   - 兩個 visited 陣列需要 O(m * n)，遞迴呼叫堆疊最壞情況下為 O(m * n)。
 * 解題思路：
 * - 直覺若從每個格子往兩個海洋做搜尋，會重複計算很多次；更好的作法是「逆向思考」，從海洋邊界往內陸反向走。
 * - 水原本只能從高處或同高流向低處；反向搜尋時，必須只能走到「高度大於等於目前格子」的鄰居，代表該鄰居的水可以順流回來。
 * - 分別建立 `pacificReachable` 與 `atlanticReachable`：
 *   - Pacific 的起點是上邊界與左邊界。
 *   - Atlantic 的起點是下邊界與右邊界。
 * - BFS 解法：
 *   - 先把對應海洋的邊界格子全部放入 queue。
 *   - 反覆出隊，檢查四方向，若鄰居未拜訪且高度條件成立就入隊並標記。
 * - DFS 解法：
 *   - 同樣從海洋邊界出發，改用遞迴往四方向展開。
 *   - 只要鄰居未拜訪且高度條件成立，就遞迴下去並標記。
 * - 最後掃描整個矩陣，同時在 `pacificReachable[i][j]` 與 `atlanticReachable[i][j]` 為 true 的座標，就是答案。
 */

class Solution {
  directions: number[][] = [
    [0, 1], // 右
    [0, -1], // 左
    [1, 0], // 下
    [-1, 0], // 上
  ];

  pacificAtlanticBFS(heights: number[][]): number[][] {
    const m = heights.length;
    const n = heights[0].length;

    // 逆向 BFS，從邊界的海洋開始，向內部遍歷，標記可以到達的格子
    const pacificQueue: number[][] = [];
    const atlanticQueue: number[][] = [];

    const pacificReachable: boolean[][] = Array.from({ length: m }, () =>
      new Array(n).fill(false),
    );
    const atlanticReachable: boolean[][] = Array.from({ length: m }, () =>
      new Array(n).fill(false),
    );

    // 初始化pacificQueue和atlanticQueue，將邊界的格子加入隊列
    // 左邊界和右邊界
    for (let i = 0; i < m; i++) {
      if (!pacificReachable[i][0]) {
        pacificQueue.push([i, 0]);
        pacificReachable[i][0] = true;
      }

      if (!atlanticReachable[i][n - 1]) {
        atlanticQueue.push([i, n - 1]);
        atlanticReachable[i][n - 1] = true;
      }
    }
    // 上邊界和下邊界
    for (let j = 0; j < n; j++) {
      if (!pacificReachable[0][j]) {
        pacificQueue.push([0, j]);
        pacificReachable[0][j] = true;
      }

      if (!atlanticReachable[m - 1][j]) {
        atlanticQueue.push([m - 1, j]);
        atlanticReachable[m - 1][j] = true;
      }
    }

    const bfs = (queue: number[][], reachable: boolean[][]) => {
      while (queue.length > 0) {
        const [x, y] = queue.shift()!;

        for (const [dx, dy] of this.directions) {
          const newX = x + dx;
          const newY = y + dy;

          if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
            if (
              !reachable[newX][newY] &&
              heights[newX][newY] >= heights[x][y]
            ) {
              // 找到可以到達的格子，將其加入隊列，並標記為可到達(避免重複訪問)
              queue.push([newX, newY]);
              reachable[newX][newY] = true;
            }
          }
        }
      }
    };

    // 從 Pacific Ocean 和 Atlantic Ocean 的邊界開始 BFS，標記可以到達的格子
    bfs(pacificQueue, pacificReachable);
    bfs(atlanticQueue, atlanticReachable);
    // 比對可以到達 Pacific Ocean 和 Atlantic Ocean 的格子，找出交集
    const result: number[][] = [];
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (pacificReachable[i][j] && atlanticReachable[i][j]) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }

  pacificAtlanticDFS(heights: number[][]): number[][] {
    const m = heights.length;
    const n = heights[0].length;

    // 逆向 DFS，從邊界的海洋開始，向內部遍歷，標記可以到達的格子
    const pacificReachable: boolean[][] = Array.from({ length: m }, () =>
      new Array(n).fill(false),
    );
    const atlanticReachable: boolean[][] = Array.from({ length: m }, () =>
      new Array(n).fill(false),
    );

    const dfs = (x: number, y: number, reachable: boolean[][]) => {
      for (const [dx, dy] of this.directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
          if (!reachable[newX][newY] && heights[newX][newY] >= heights[x][y]) {
            // 找到可以到達的格子，進行 DFS 遍歷，並標記為可到達(避免重複訪問)
            reachable[newX][newY] = true;
            dfs(newX, newY, reachable);
          }
        }
      }
    };

    // 初始化pacificReachable和atlanticReachable，將邊界的格子加入 DFS
    for (let i = 0; i < m; i++) {
      if (!pacificReachable[i][0]) {
        pacificReachable[i][0] = true;
        dfs(i, 0, pacificReachable);
      }

      if (!atlanticReachable[i][n - 1]) {
        atlanticReachable[i][n - 1] = true;
        dfs(i, n - 1, atlanticReachable);
      }
    }
    for (let j = 0; j < n; j++) {
      if (!pacificReachable[0][j]) {
        pacificReachable[0][j] = true;
        dfs(0, j, pacificReachable);
      }

      if (!atlanticReachable[m - 1][j]) {
        atlanticReachable[m - 1][j] = true;
        dfs(m - 1, j, atlanticReachable);
      }
    }

    // 比對可以到達 Pacific Ocean 和 Atlantic Ocean 的格子，找出交集
    const result: number[][] = [];
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (pacificReachable[i][j] && atlanticReachable[i][j]) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }
}
interface TestCase {
  heights: number[][];
  answer: number[][];
}

const testCases: TestCase[] = [
  {
    heights: [
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
      [2, 4, 5, 3, 1],
      [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4],
    ],
    answer: [
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 2],
      [3, 0],
      [3, 1],
      [4, 0],
    ],
  },
  {
    heights: [[1]],
    answer: [[0, 0]],
  },
];

testCases.forEach(({ heights, answer }, index) => {
  const sol = new Solution();
  const resultBFS = sol.pacificAtlanticBFS(heights);
  const resultDFS = sol.pacificAtlanticDFS(heights);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: heights = ${JSON.stringify(heights)}`);
  console.log(`Output(BFS): ${JSON.stringify(resultBFS)}`);
  console.log(`Output(DFS): ${JSON.stringify(resultDFS)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
