/**
 * 題號：1140
 * 題目：Stone Game II
 * 連結：https://leetcode.com/problems/stone-game-ii/description/
 * 時間複雜度：O(n^3)
 * - 先建立 suffixSum 陣列來快速取得從任意位置開始的石頭總和，耗時 O(n)
 * - dp[i][m] 需要枚舉目前玩家可能拿走的 x，範圍是 1 到 2m；每個狀態最壞會做 O(n) 次轉移
 * - 狀態數量為 O(n^2)，因此總時間複雜度為 O(n^3)
 *
 * 空間複雜度：O(n^2)
 * - 使用二維 dp 陣列來記錄每個位置 i 與參數 m 的最佳結果
 * - suffixSum 陣列用來儲存後綴和，額外空間為 O(n)
 *
 * 解題思路：
 * 1. 先用 suffixSum[i] 表示從第 i 堆到最後一堆的石頭總數，這樣可以在 O(1) 時間內查詢剩餘石頭總量。
 * 2. 定義 dp[i][m] 為「輪到當前玩家時，從第 i 堆開始，且目前的 m 為 m，當前玩家最多可以拿到的石頭數」。
 * 3. 若剩餘石堆數量小於等於 2m，表示當前玩家可以一次拿完全部剩餘石頭，直接令 dp[i][m] = suffixSum[i]。
 * 4. 否則，枚舉本回合要拿走的 x 堆，x 的範圍為 1 到 2m；拿走 x 堆後，下一位玩家會從 i + x 開始，且新的 m 會變成 Math.max(m, x)。
 * 5. 因為雙方都會做出最佳選擇，所以當前玩家能拿到的最大值就是 suffixSum[i] 減去下一位玩家在新狀態下能拿到的最大值，取所有 x 的最佳結果即可。
 */

// --- LeetCode 提供的程式碼模板 ---
function stoneGameII(piles: number[]): number {
  const n = piles.length;
  const suffixSum: number[] = new Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    suffixSum[i] = suffixSum[i + 1] + piles[i];
  }

  // dp[i][m]: 代表從第 i 堆石頭開始，當前玩家可以拿最多 2 * m 堆石頭時，能夠獲得的最大石頭數量
  // dp[i][m] = max(suffixSum[i] - dp[i + x][max(m, x)]) for x in [1, 2 * m]
  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let m = 1; m <= n; m++) {
      // 如果剩餘的石堆數量小於等於 2 * m，則當前玩家可以拿走所有剩餘的石頭
      if (i + 2 * m >= n) {
        dp[i][m] = suffixSum[i];
        continue;
      }
      for (let x = 1; x <= 2 * m; x++) {
        dp[i][m] = Math.max(dp[i][m], suffixSum[i] - dp[i + x][Math.max(m, x)]);
      }
    }
  }

  return dp[0][1];
}

// --- 測試案例 ---
interface TestCase {
  piles: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    piles: [2, 7, 9, 4, 4],
    answer: 10,
  },
  {
    piles: [1, 2, 3, 4, 5, 100],
    answer: 104,
  },
];

testCases.forEach(({ piles, answer }, index) => {
  const result = stoneGameII(piles);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: piles = ${JSON.stringify(piles)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
