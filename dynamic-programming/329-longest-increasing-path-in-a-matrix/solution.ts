/**
 * 題號：329
 * 題目：Longest Increasing Path in a Matrix
 * 連結：https://leetcode.com/problems/longest-increasing-path-in-a-matrix/description/
 * 時間複雜度：O(m × n)
 * - m、n 分別為矩陣的行數與列數
 * - 每個位置只會被 DFS 計算一次，並利用 dp 做記憶化
 * - 每次從一個位置向四個方向探索，若滿足遞增條件則會進一步計算
 * - 因為每個格子只會進入一次計算，整體時間複雜度可視為 O(m × n)
 * 空間複雜度：O(m × n)
 * - 需要使用 dp 陣列記錄每個位置的最長遞增路徑長度
 * - 另外 DFS 遞歸深度最多可能達到 m × n，因此額外的遞歸空間為 O(m × n)
 * 解題思路：
 * - 這題使用帶快取的dfs來解，核心是從每個位置出發，找出能向下走的最長遞增路徑
 * - 對於每個格子 (i, j)，我們會從它的上下左右四個方向去探索比 matrix[i][j] 更大的相鄰格子
 * - 若下一個格子值更大，就繼續往下走，並取所有可能路徑中的最大長度
 * - dp[i][j] 代表從 (i, j) 出發的最長遞增路徑長度，避免重複計算相同子問題
 * - 最終答案是所有格子中，從該格子出發所能得到的最長路徑長度的最大值
 */

// --- LeetCode 提供的程式碼模板 ---
function longestIncreasingPath(matrix: number[][]): number {
  const m = matrix.length;
  const n = matrix[0].length;

  const directions = [
    [0, 1], // 右
    [1, 0], // 下
    [0, -1], // 左
    [-1, 0], // 上
  ];

  // dp[i][j] 代表從 (i, j) 出發的最長遞增路徑長度
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

  // dfs 函式用來計算從 (i, j) 出發的最長遞增路徑長度
  const dfs = (i: number, j: number): number => {
    if (dp[i][j] !== 0) {
      return dp[i][j];
    }

    let maxLength = 1;
    for (const [dx, dy] of directions) {
      const x = i + dx;
      const y = j + dy;

      if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
        const length = 1 + dfs(x, y);
        maxLength = Math.max(maxLength, length);
      }
    }

    dp[i][j] = maxLength;
    return maxLength;
  };

  // 對每個位置 (i, j) 執行 dfs，找出最長的遞增路徑
  let maxPathLength = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j);
      maxPathLength = Math.max(maxPathLength, dp[i][j]);
    }
  }

  return maxPathLength;
}

// --- 測試案例 ---
interface TestCase {
  matrix: number[][];
  answer: number;
}

const testCases: TestCase[] = [
  {
    matrix: [
      [9, 9, 4],
      [6, 6, 8],
      [2, 1, 1],
    ],
    answer: 4,
  },
  {
    matrix: [
      [3, 4, 5],
      [3, 2, 6],
      [2, 2, 1],
    ],
    answer: 4,
  },
  {
    matrix: [[1]],
    answer: 1,
  },
];

testCases.forEach(({ matrix, answer }, index) => {
  // TODO: 更改呼叫的函式名稱與上方模板一致
  const result = longestIncreasingPath(matrix);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: matrix = ${JSON.stringify(matrix)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
