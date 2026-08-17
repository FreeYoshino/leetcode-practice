/**
 * 題號：1563
 * 題目：Stone Game V
 * 連結：https://leetcode.com/problems/stone-game-v/description/
 * 時間複雜度：O(n^3)
 * - 外層以區間長度 len 從 2 到 n 進行 DP，約有 O(n) 種長度
 * - 中層枚舉每個區間起點 i，總共有 O(n^2) 個區間狀態 dp[i][j]
 * - 內層對每個區間枚舉分割點 k，最壞需 O(n) 次
 * - 由於區間和透過前綴和可在 O(1) 取得，因此總時間為 O(n^3)
 *
 * 空間複雜度：O(n^2)
 * - 使用 n x n 的 dp 二維陣列記錄每個區間的最佳得分
 * - 另有長度 n + 1 的 prefixSum，為 O(n)
 * - 整體由 dp 主導，因此空間複雜度為 O(n^2)
 *
 * 解題思路：
 * 1. 先建立 prefixSum，讓任意區間和 sum(l, r) 可以在 O(1) 計算。
 * 2. 定義 dp[i][j] 表示「在區間 [i, j] 內進行遊戲時，Alice 可取得的最大分數」。
 * 3. 對每個區間 [i, j]，枚舉分割點 k，把石頭分成左段 [i, k] 與右段 [k+1, j]，計算 leftSum 與 rightSum。
 * 4. 依題意做轉移：
 *    - 若 leftSum < rightSum，Bob 會丟掉右段，Alice 只能拿左段分數：leftSum + dp[i][k]
 *    - 若 leftSum > rightSum，Bob 會丟掉左段，Alice 只能拿右段分數：rightSum + dp[k+1][j]
 *    - 若兩段相等，Alice 可自行選較佳的一邊：max(leftSum + dp[i][k], rightSum + dp[k+1][j])
 * 5. 以區間長度由小到大填表，確保轉移所需的子問題都已先算好，最後答案為 dp[0][n - 1]。
 */

// --- LeetCode 提供的程式碼模板 ---
function stoneGameV(stoneValue: number[]): number {
  const n = stoneValue.length;

  // 計算前綴和，方便後續計算區間總和
  // prefixSum[i] : 代表 stoneValue[0] 到 stoneValue[i-1] 的總和
  const prefixSum: number[] = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
  }

  /**
   * dp[i][j]: 代表在區間 [i, j] 中，Alice 可以獲得的最大分數
   * dp[i][j] = max(
   *  sum(i, k) + dp[i][k]                                        if sum(i, k) < sum(k + 1, j)
   *  sum(k + 1, j) + dp[k + 1][j]                                if sum(i, k) > sum(k + 1, j)
   *  max(sum(i, k)+ dp[i][k], sum(k + 1, j) + dp[k + 1][j])      if sum(i, k) == sum(k + 1, j)
   * )
   */
  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  // 從長度為 2 的區間開始，逐漸增加區間長度
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i < n; i++) {
      const j = i + len - 1;
      if (j >= n) break;

      // 尋找最佳的分割點 k
      for (let k = i; k < j; k++) {
        const leftSum = prefixSum[k + 1] - prefixSum[i];
        const rightSum = prefixSum[j + 1] - prefixSum[k + 1];

        if (leftSum < rightSum) {
          dp[i][j] = Math.max(dp[i][j], leftSum + dp[i][k]);
        } else if (leftSum > rightSum) {
          dp[i][j] = Math.max(dp[i][j], rightSum + dp[k + 1][j]);
        } else if (leftSum === rightSum) {
          dp[i][j] = Math.max(
            dp[i][j],
            leftSum + dp[i][k],
            rightSum + dp[k + 1][j],
          );
        }
      }
    }
  }

  return dp[0][n - 1];
}

// --- 測試案例 ---
interface TestCase {
  stoneValue: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    stoneValue: [6, 2, 3, 4, 5, 5],
    answer: 18,
  },
  {
    stoneValue: [7, 7, 7, 7, 7, 7, 7],
    answer: 28,
  },
  {
    stoneValue: [4],
    answer: 0,
  },
];

testCases.forEach(({ stoneValue, answer }, index) => {
  const result = stoneGameV(stoneValue);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: stoneValue = ${JSON.stringify(stoneValue)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
