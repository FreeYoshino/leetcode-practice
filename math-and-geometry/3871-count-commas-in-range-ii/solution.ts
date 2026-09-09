/**
 * 題號：3871
 * 題目：Count Commas in Range II
 * 連結：https://leetcode.com/problems/count-commas-in-range-ii/description/
 * 時間複雜度：O(log n)
 * - 迴圈每次將 i 乘以 1000，因此最多執行 log₁₀₀₀(n) 次
 *
 * 空間複雜度：O(1)
 * - 僅使用 count 與 i 等常數個變數，沒有額外配置與輸入大小相關的空間
 *
 * 解題思路：
 * 1. 從 1000 開始，每個數字至少包含一個逗號；範圍 [1000, n] 的數量為 n - 1000 + 1。
 * 2. 當數字達到 1,000,000、1,000,000,000 等 1000 的次方時，這些數字會多包含一個逗號。
 * 3. 因此逐次將 i 乘以 1000，累加範圍 [i, n] 的數量，直到 i 大於 n 為止。
 */

// --- LeetCode 提供的程式碼模板 ---
function countCommas(n: number): number {
  let count = 0;
  for (let i = 1000; i <= n; i *= 1000) {
    count += n - i + 1;
  }

  return count;
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    n: 1002,
    answer: 3,
  },
  {
    n: 998,
    answer: 0,
  },
];

testCases.forEach(({ n, answer }, index) => {
  const result = countCommas(n);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: n = ${JSON.stringify(n)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
