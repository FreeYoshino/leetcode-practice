/**
 * 題號： 64
 * 題目： Minimum Path Sum
 * 連結： https://leetcode.com/problems/minimum-path-sum/description/
 * 時間複雜度：O(m * n)
 * - 每個格子只會被計算一次，整體只需要走訪整個 grid 一遍
 * - 每次轉移只做常數次比較與加法，因此總時間為 O(m * n)
 * 空間複雜度：O(m * n)
 * - 使用一個與 grid 同大小的 dp 二維陣列來記錄到每個位置的最小路徑和
 * - 因此額外空間與輸入矩陣大小成正比，為 O(m * n)
 * 解題思路：
 * - 由於只能往右或往下移動，所以到達 (i, j) 的最小路徑和，只可能來自上方或左方
 * - 先把 dp[0][0] 設為起點值，再依序初始化第一列與第一行，因為這兩條邊只有單一路徑可以到達
 * - 之後對其他位置套用狀態轉移 dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
 * - 最後 dp[m - 1][n - 1] 就是從左上角走到右下角的最小路徑和
 */

class Solution {
  minPathSum(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    // dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j] 到達 (i, j) 的最小路徑和
    const dp: number[][] = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => 0),
    );
    dp[0][0] = grid[0][0];

    // 初始化第一列
    for (let i = 1; i < m; i++) {
      dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    // 初始化第一行
    for (let j = 1; j < n; j++) {
      dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    // 計算其他位置的最小路徑和
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }

    return dp[m - 1][n - 1];
  }
}

interface TestCase {
  grid: number[][];
  answer: number;
}

const testCases: TestCase[] = [
  {
    grid: [
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ],
    answer: 7,
  },
  {
    grid: [
      [1, 2, 3],
      [4, 5, 6],
    ],
    answer: 12,
  },
];

testCases.forEach(({ grid, answer }, index) => {
  const solution = new Solution();
  const gridCopy = grid.map((row) => [...row]);
  const result = solution.minPathSum(gridCopy);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: grid = ${JSON.stringify(grid)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
