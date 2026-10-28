/**
 * 題號：3882
 * 題目：Minimum XOR Path in a Grid
 * 連結：https://leetcode.com/problems/minimum-xor-path-in-a-grid/description/
 * 時間複雜度：O(m * n * 2^10)
 * - m × n 是網格中的格子數量。
 * - 每個格子都需要枚舉所有可能的 XOR 值。
 * - 由於每個 grid[i][j] 小於 2^10，因此 XOR 結果最多有 2^10 種可能。
 *
 * 空間複雜度：O(n * 2^10)
 * - dp[j] 儲存目前每一欄可達到的所有 XOR 狀態。
 * - 只保留目前列與前一列所需的資訊，不需要建立完整的 m × n DP 陣列。
 *
 * 解題思路：
 * 1. 從左上角開始，只能往右或往下移動，因此每個格子的可達路徑
 *    只會來自上方或左方。
 * 2. 對每個格子維護所有可能的 XOR 值：
 *    - dp[j][v] = 1 表示到達目前處理位置時，可以得到 XOR 值 v。
 *    - XOR 值的範圍最多為 0 到 2^10 - 1。
 * 3. 處理目前格子時，檢查來自上方 dp[j] 與左方 dp[j - 1] 的所有
 *    可達 XOR 值。
 * 4. 將每個可達的 XOR 值與目前格子的數值做 XOR，並記錄到新的狀態中：
 *    newXor = v ^ grid[i][j]。
 * 5. 使用一維陣列 dp 進行滾動更新：
 *    - dp[j] 在更新前代表上方狀態；
 *    - dp[j - 1] 代表左方狀態；
 *    - 更新後的 dp[j] 代表目前格子的所有可能 XOR 值。
 * 6. 到達右下角後，從小到大檢查所有可達的 XOR 值，
 *    第一個找到的值就是能夠取得的最小 XOR 結果。
 */

// --- LeetCode 提供的程式碼模板 ---
function minCost(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const MAX_VAL = 1024;

  // dp[j] 保存到達當前列 第j行 的所有可能 XOR 值
  const dp: Uint8Array[] = Array.from(
    { length: n },
    () => new Uint8Array(MAX_VAL),
  );

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const currentVal = grid[i][j];

      if (i === 0 && j === 0) {
        dp[0][currentVal] = 1;
        continue;
      }

      const newStates = new Uint8Array(MAX_VAL);
      for (let v = 0; v < MAX_VAL; v++) {
        const fromTop = i > 0 && dp[j][v] == 1;
        const fromLeft = j > 0 && dp[j - 1][v] == 1;

        if (fromTop || fromLeft) {
          const newXor = v ^ currentVal;
          newStates[newXor] = 1;
        }
      }

      dp[j] = newStates;
    }
  }

  for (let v = 0; v < MAX_VAL; v++) {
    if (dp[n - 1][v] == 1) {
      return v;
    }
  }
  return 0;
}

// --- 測試案例 ---
interface TestCase {
  grid: number[][];
  answer: number;
}

const testCases: TestCase[] = [
  {
    grid: [
      [1, 2],
      [3, 4],
    ],
    answer: 6,
  },
  {
    grid: [
      [6, 7],
      [5, 8],
    ],
    answer: 9,
  },
  {
    grid: [[2, 7, 5]],
    answer: 0,
  },
];

testCases.forEach(({ grid, answer }, index) => {
  const result = minCost(grid);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: grid = ${JSON.stringify(grid)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
