/**
 * 題號：3622
 * 題目：Check Divisibility by Digit Sum and Product
 * 連結：https://leetcode.com/problems/check-divisibility-by-digit-sum-and-product/description/
 * 時間複雜度：O(d)
 * - 令 d 為 n 的位數
 * - toString().split('').map(Number) 需走訪每一位：O(d)
 * - 計算數字總和 sum 的 reduce：O(d)
 * - 計算數字乘積 product 的 reduce：O(d)
 * - 合併後為 O(d)
 *
 * 空間複雜度：O(d)
 * - digits 陣列會儲存 n 的每一位數字，共 d 個元素
 * - 其餘僅使用常數額外變數（sum、product）
 *
 * 解題思路：
 * 1. 先把整數 n 拆成各位數字，得到 digits 陣列。
 * 2. 走訪 digits 計算：
 *    - 各位數總和 sum
 *    - 各位數乘積 product
 * 3. 依題意檢查 n 是否可被 (sum + product) 整除。
 * 4. 若 n % (sum + product) === 0 回傳 true，否則回傳 false。
 */

// --- LeetCode 提供的程式碼模板 ---
function checkDivisibility(n: number): boolean {
  const digits = n.toString().split('').map(Number);
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  const product = digits.reduce((acc, digit) => acc * digit, 1);

  return n % (sum + product) === 0;
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    n: 99,
    answer: true,
  },
  {
    n: 23,
    answer: false,
  },
];

testCases.forEach(({ n, answer }, index) => {
  const result = checkDivisibility(n);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(n)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
