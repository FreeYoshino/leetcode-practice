/**
 * 題號：1406
 * 題目：Stone Game III
 * 連結：https://leetcode.com/problems/stone-game-iii/description/
 * 時間複雜度：O(n)
 * - 對每個位置 i 最多嘗試 3 種拿法，總轉移次數為 O(3n) = O(n)
 *
 * 空間複雜度：O(n)
 * - 使用長度為 n+1 的一維 dp 陣列儲存從位置 i 開始的最大分數差值
 *
 * 解題思路：
 * 1. 定義 dp[i] 為從第 i 個石頭開始，先手玩家相對於對手能取得的最大分數差值（先手分 - 後手分）。
 * 2. 當沒有石頭可拿時，dp[n] = 0。
 * 3. 對於位置 i，先手可以拿 1～3 顆石頭（若有），記錄 sum 為這些石頭的總分，則拿 k 顆後的差值為 sum - dp[i + k]，取三者最大值：
 *    dp[i] = max_{k=1..3}( sum(i..i+k-1) - dp[i+k] )
 *    直觀上，先手拿走 sum，接著對手在剩下的狀態裡成為「先手」，其能取得的最佳差值為 dp[i+k]，所以當前差值要扣掉 dp[i+k]。
 * 4. 由後往前計算 dp（i 從 n-1 到 0），最後檢查 dp[0]：若 > 0 Alice 勝，< 0 Bob 勝，= 0 平手。
 */

// --- LeetCode 提供的程式碼模板 ---
function stoneGameIII(stoneValue: number[]): string {
  const n = stoneValue.length;

  /* 
    dp[i]: 代表從第i個石頭開始到結尾， 當前回合先手玩家與對手的分數差距最大值
    dp[i] = max(
      stoneValue[i]                                         - dp[i + 1],
      stoneValue[i] + stoneValue[i + 1]                     - dp[i + 2],
      stoneValue[i] + stoneValue[i + 1] + stoneValue[i + 2] - dp[i + 3]
    )
  
  */
  const dp: number[] = new Array(n + 1).fill(-Infinity);
  dp[n] = 0; // 當沒有石頭可以拿時，分數差距為0

  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let k = 1; k <= 3; k++) {
      if (i + k - 1 >= n) break;

      sum += stoneValue[i + k - 1];
      dp[i] = Math.max(dp[i], sum - dp[i + k]);
    }
  }

  const scoreDiff = dp[0];
  if (scoreDiff > 0) return 'Alice';
  if (scoreDiff < 0) return 'Bob';
  return 'Tie';
}

// --- 測試案例 ---
interface TestCase {
  stoneValue: number[];
  answer: string;
}

const testCases: TestCase[] = [
  {
    stoneValue: [1, 2, 3, 7],
    answer: 'Bob',
  },
  {
    stoneValue: [1, 2, 3, -9],
    answer: 'Alice',
  },
  {
    stoneValue: [1, 2, 3, 6],
    answer: 'Tie',
  },
];

testCases.forEach(({ stoneValue, answer }, index) => {
  const result = stoneGameIII(stoneValue);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: stoneValue = ${JSON.stringify(stoneValue)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
