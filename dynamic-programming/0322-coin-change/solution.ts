/**
 * 題號： 322
 * 標題： Coin Change
 * 連結： https://leetcode.com/problems/coin-change/description/
 * 時間複雜度： O(n * m)
 * - n為 amount 的大小
 * - m為 coins 的長度
 * - 外部迴圈執行 n 次 內部迴圈執行 m 次 且每次迴圈內的運算為 O(1)
 * 空間複雜度： O(n)
 * - dp 陣列大小為 amount + 1 因此空間複雜度為 O(n)
 * 解題思路：
 * 1. 維護一個 dp 陣列 dp[i] 代表 amount 為 i 時的最少硬幣數量
 * 2. 初始化 dp[0] = 0 其他 dp[i] = Infinity
 * 3. 狀態轉移方程式： dp[i] = min(dp[i], dp[i - coin] + 1) for coin in coins
 * 4. 最後回傳 dp[amount] 如果 dp[amount] 為 Infinity 則回傳 -1
 */

function coinChange(coins: number[], amount: number): number {
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// test cases
interface TestCase {
  coins: number[];
  amount: number;
  answer: number;
}

const testCases: TestCase[] = [
  { coins: [1, 2, 5], amount: 11, answer: 3 },
  { coins: [2], amount: 3, answer: -1 },
  { coins: [1], amount: 0, answer: 0 },
];

testCases.forEach(({ coins, amount, answer }, index) => {
  const result = coinChange(coins, amount);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: coins = ${JSON.stringify(coins)}, amount = ${amount}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
