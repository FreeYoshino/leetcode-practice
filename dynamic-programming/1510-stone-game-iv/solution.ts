/**
 * 題號：1510
 * 題目：Stone Game IV
 * 連結：https://leetcode.com/problems/stone-game-iv/description/
 * 時間複雜度：O(n√n)
 * - 外層對每個石頭數量 i 做一次 DP，共有 O(n) 個狀態
 * - 每個狀態內會枚舉所有可能的平方數 j^2，最多只需要到 √i，因此內層轉移次數為 O(√n)
 *
 * 空間複雜度：O(n)
 * - 使用一個長度為 n + 1 的 dp 陣列來記錄每個石頭數量的勝負結果
 *
 * 解題思路：
 * 1. 定義 dp[i] 表示「當前玩家在還剩 i 顆石頭時，是否能贏得這場遊戲」。
 * 2. 對每個 i 從 1 到 n 枚舉所有可能拿走的平方數 j^2。
 * 3. 若拿走 j^2 顆石頭後，剩餘石頭數量 i - j^2 的狀態對手是輸的（dp[i - j^2] === false），則當前玩家可以選擇這個移動，從而保證自己獲勝。
 * 4. 只要找到任一個可行的平方數，就能讓 dp[i] = true；若所有可能的取法都無法讓對手陷入輸的局面，則 dp[i] = false。
 */

// --- LeetCode 提供的程式碼模板 ---
function winnerSquareGame(n: number): boolean {
  // dp[i]: 代表在有 i 顆石頭的情況下，當前回合玩家是否能贏得比賽
  // dp[i] = dp[i - j * j] === false，表示當前回合玩家可以選擇拿走 j*j 顆石頭，讓對手處於輸的狀態
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = false; // 當沒有石頭時，當前回合玩家輸
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      if (dp[i - j * j] === false) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    n: 1,
    answer: true,
  },
  {
    n: 2,
    answer: false,
  },
  {
    n: 4,
    answer: true,
  },
];

testCases.forEach(({ n, answer }, index) => {
  const result = winnerSquareGame(n);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: n = ${n}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
