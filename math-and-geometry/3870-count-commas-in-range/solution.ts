/**
 * 題號：3870
 * 題目：Count Commas in Range
 * 連結：https://leetcode.com/problems/count-commas-in-range/description/
 * 時間複雜度：O(1)
 * - 僅需判斷 n 是否小於 1000，並進行常數次算術運算
 *
 * 空間複雜度：O(1)
 * - 僅使用常數個變數，沒有額外配置與輸入大小相關的空間
 *
 * 解題思路：
 * 1. 小於 1000 的數字不包含逗號，因此直接返回 0。
 * 2. 從 1000 開始，每個數字都包含一個逗號(由於測資 1<=n<=10^5，所以從 1000 開始的每個數字都包含一個逗號)；範圍 [1000, n] 的數量為 n - 1000 + 1。
 * 3. 因此當 n >= 1000 時返回 n - 999。
 */

// --- LeetCode 提供的程式碼模板 ---
function countCommas(n: number): number {
  if (n < 1000) return 0;
  return n - 1000 + 1;
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
