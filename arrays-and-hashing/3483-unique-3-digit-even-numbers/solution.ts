/**
 * 題號：3483
 * 題目：Unique 3-Digit Even Numbers
 * 連結：https://leetcode.com/problems/unique-3-digit-even-numbers/description/
 * 時間複雜度：O(n)
 * - 建立每個 digit 的出現次數需要 O(n)
 * - 枚舉偶數個位數與所有 digit 種類的次數為固定上限，視為 O(1)
 *
 * 空間複雜度：O(1)
 * - 使用固定大小為 10 的 digitCount 陣列
 *
 * 解題思路：
 * 1. 使用 digitCount 統計每個 digit 的出現次數，方便處理數字不可重複使用的限制。
 * 2. 枚舉所有可能的偶數個位數，暫時扣除一個該 digit，確保組成的數字為偶數。
 * 3. 統計剩餘 digit 中可作為百位數的非 0 digit 種類 A，以及可作為十位數的 digit 種類 B。
 * 4. 對每個百位數，先計算使用不同 digit 的情況 A * (B - 1)，再加上同一 digit 尚有至少兩個可用數量的情況 C。
 * 5. 將所有偶數個位數的結果加總，得到不同的三位偶數數量。
 */

// --- LeetCode 提供的程式碼模板 ---
function totalNumbers(digits: number[]): number {
  const n = digits.length;

  const digitCount = new Array(10).fill(0);
  for (let i = 0; i < n; i++) digitCount[digits[i]]++;

  let total = 0;
  for (let i = 0; i < 10; i += 2) {
    if (digitCount[i] === 0) continue;

    digitCount[i]--;
    let A = 0; // 所有可用的非0 digit種類
    let B = 0; // 所有可用的 digit種類
    let C = 0; // 可用數量 >=2 的非0 digit種類
    for (let digit = 0; digit < 10; digit++) {
      const count = digitCount[digit];
      if (count === 0) continue;

      if (digit > 0) {
        A += 1;
        if (count >= 2) C += 1;
      }
      B += 1;
    }

    digitCount[i]++;

    total += A * (B - 1) + C;
  }

  return total;
}

// --- 測試案例 ---
interface TestCase {
  digits: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    digits: [1, 2, 3, 4],
    answer: 12,
  },
  {
    digits: [0, 2, 2],
    answer: 2,
  },
  {
    digits: [6, 6, 6],
    answer: 1,
  },
  {
    digits: [1, 3, 5],
    answer: 0,
  },
];

testCases.forEach(({ digits, answer }, index) => {
  const result = totalNumbers(digits);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: digits = ${JSON.stringify(digits)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
