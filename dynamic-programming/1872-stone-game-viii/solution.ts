/**
 * 題號：1872
 * 題目：Stone Game VIII
 * 連結：https://leetcode.com/problems/stone-game-viii/description/
 * 時間複雜度：O(n)
 * - 建立 prefixSum 需要遍歷 stones 一次，時間為 O(n)
 * - 由右至左計算 n - 1 個 dp 狀態，每個狀態只需 O(1) 次轉移
 * - 整體時間複雜度為 O(n)
 *
 * 空間複雜度：O(n)
 * - 使用長度為 n 的 prefixSum 陣列
 * - 使用長度為 n 的 dp 陣列記錄各狀態的最佳分數差
 * - 整體空間複雜度為 O(n)
 *
 * 解題思路：
 * 1. 先建立 prefixSum，使得從第 0 顆石頭到第 i 顆石頭的總和可以在 O(1) 取得。
 * 2. 遊戲的第一次操作必須拿走至少兩顆石頭，因此答案從第 1 個前綴和開始考慮。
 * 3. 定義 dp[i] 表示「輪到當前玩家時，從第 i 個前綴和開始選擇，玩家相對於對手能取得的最大分數差」。
 * 4. 狀態轉移：
 *    - 選擇 A (拿)：當前玩家剛好拿走 i 顆石頭，獲得 prefixSum[i]。下一回合換對手面對 dp[i+1]，
 *      所以當下決策的淨分數差為：prefixSum[i] - dp[i + 1]。
 *    - 選擇 B (不拿，往後找)：當前玩家決定拿更多顆石頭 (i+1 顆或以上)。這個選擇的最佳結果，
 *      在數學展開上精準等價於 dp[i + 1]。
 * 5. 依據兩種選擇取最大值：dp[i] = max(prefixSum[i] - dp[i + 1], dp[i + 1])。
 * 6. dp[i] 會依賴右側的 dp[i + 1]，所以從 i = n - 2 由右至左填表；最後回傳 dp[1]。
 */

// --- LeetCode 提供的程式碼模板 ---
function stoneGameVIII(stones: number[]): number {
  const n = stones.length;
  const prefixSum: number[] = new Array(n).fill(0);
  prefixSum[0] = stones[0];
  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + stones[i];
  }

  // dp[i]: 代表當前回合 從第 i 個石頭開始，玩家能獲得的最大分數差
  // dp[i] = max(prefixSum[i] - dp[i + 1], dp[i + 1])
  const dp: number[] = new Array(n).fill(0);
  dp[n - 1] = prefixSum[n - 1]; // 最後一個石頭，玩家只能選擇拿走它
  for (let i = n - 2; i >= 1; i--) {
    dp[i] = Math.max(prefixSum[i] - dp[i + 1], dp[i + 1]);
  }

  return dp[1];
}

// --- 測試案例 ---
interface TestCase {
  stones: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    stones: [-1, 2, -3, 4, -5],
    answer: 5,
  },
  {
    stones: [7, -6, 5, 10, 5, -2, -6],
    answer: 13,
  },
  {
    stones: [-10, -12],
    answer: -22,
  },
];

testCases.forEach(({ stones, answer }, index) => {
  const result = stoneGameVIII(stones);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: stones = ${JSON.stringify(stones)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
