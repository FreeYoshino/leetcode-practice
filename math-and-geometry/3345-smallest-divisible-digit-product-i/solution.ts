/**
 * 題號：3345
 * 題目：Smallest Divisible Digit Product I
 * 連結：https://leetcode.com/problems/smallest-divisible-digit-product-i/description/
 * 時間複雜度：O(k * d)
 * - k 為從 n 開始往後檢查到答案為止的數量
 * - d 為目前檢查數字的位數，計算一次位數乘積需要走訪所有位數，為 O(d)
 * - 因此最壞情況下，總時間複雜度為 O(k * d)
 *
 * 空間複雜度：O(1)
 * - 只使用常數個變數來記錄目前乘積與迴圈狀態
 * - 不需要額外的陣列、字典或遞迴呼叫堆疊
 *
 * 解題思路：
 * 1. 從 n 開始往上逐一檢查每個數字。
 * 2. 對每個數字計算它的所有位數乘積，如果乘積能被 t 整除，就代表找到答案。
 * 3. 由於題目要求最小的符合條件數字，第一次找到的數字直接回傳即可。
 */

// --- LeetCode 提供的程式碼模板 ---
function smallestNumber(n: number, t: number): number {
  const getDigitsProduct = (num: number): number => {
    let product = 1;
    while (num > 0) {
      product *= num % 10;
      if (product === 0) return 0; // If any digit is 0, the product will be 0

      num = Math.floor(num / 10);
    }

    return product;
  };

  for (let i = n; true; i++) {
    const product = getDigitsProduct(i);

    if (product % t === 0) {
      return i;
    }
  }
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  t: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    n: 10,
    t: 2,
    answer: 10,
  },
  {
    n: 15,
    t: 3,
    answer: 16,
  },
];

testCases.forEach(({ n, t, answer }, index) => {
  const result = smallestNumber(n, t);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: n = ${n}, t = ${t}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
