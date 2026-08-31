/**
 * 題號：877
 * 題目：Stone Game
 * 連結：https://leetcode.com/problems/stone-game/description/
 * 時間複雜度：O(n^2)
 * - 外層迴圈遍歷所有區間長度 len，共 O(n) 次。
 * - 內層迴圈遍歷所有起始位置 i，每次 O(n)。
 * - 每次迭代進行 O(1) 操作，故總時間複雜度為 O(n^2)。
 *
 * 空間複雜度：O(n^2)
 * - 二維 DP 陣列大小為 n × n。
 *
 * 解題思路：
 * 1. 使用區間動態規劃，dp[i][j] 表示在 [i, j] 範圍內該回合玩家能獲得的最大分數差
 *    （該玩家分數減去對手分數）。
 * 2. 初始化：當只有一個石頭時，玩家拿走該堆，分數差為 piles[i]。
 * 3. 逐個增加區間長度，對於每個區間 [i, j]，玩家可以選擇：
 *    - 拿第 i 堆：得到 piles[i] 分，對手從 [i+1, j] 中獲得最多 dp[i+1][j] 分，
 *      分差為 piles[i] - dp[i+1][j]。
 *    - 拿第 j 堆：得到 piles[j] 分，對手從 [i, j-1] 中獲得最多 dp[i][j-1] 分，
 *      分差為 piles[j] - dp[i][j-1]。
 *    - 玩家選擇分差最大的選項。
 * 4. 若 dp[0][n-1] > 0，表示先手玩家能贏，返回 true；否則返回 false。
 */

// --- LeetCode 提供的程式碼模板 ---
function stoneGame(piles: number[]): boolean {
  const n = piles.length;

  // dp[i][j] : 代表在 [i, j] 的範圍內 該回合的玩家能夠獲得的最大分數差
  // dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  // 初始化 dp[i][i]，當只有一個石頭時，玩家只能拿走該石頭
  for (let i = 0; i < n; i++) dp[i][i] = piles[i];

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
    }
  }

  return dp[0][n - 1] > 0;
}

// --- 測試案例 ---
interface TestCase {
  piles: number[];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    piles: [5, 3, 4, 5],
    answer: true,
  },
  {
    piles: [3, 7, 2, 3],
    answer: true,
  },
];

testCases.forEach(({ piles, answer }, index) => {
  const result = stoneGame(piles);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: piles = ${JSON.stringify(piles)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
