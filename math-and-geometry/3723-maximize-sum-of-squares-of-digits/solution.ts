/**
 * 題號：3723
 * 題目：Maximize Sum of Squares of Digits
 * 連結：https://leetcode.com/problems/maximize-sum-of-squares-of-digits/description/
 * 時間複雜度： O(num)
 * 空間複雜度： O(num)
 * 解題思路：
 * 1. 為了讓所有數字的平方和最大，應將總和盡可能集中在較大的數字上；
 *    因此優先填入數字 9，再處理剩餘的總和。
 * 2. 若 num 個位數最多能容納的總和 num * 9 小於 sum，代表無法組成符合
 *    條件的數字，直接回傳空字串。
 * 3. 將 sum 除以 9，商代表需要填入的 9 的數量，餘數若大於 0 則再填入
 *    一個餘數，其餘位數全部填入 0。
 * 4. 由於數字由高位到低位排列，先放置 9 與餘數即可在最大化平方和的同時
 *    建立字典序最大的結果。
 */

// --- LeetCode 提供的程式碼模板 ---
function maxSumOfSquares(num: number, sum: number): string {
  // 邊界條件
  if (num * 9 < sum) return '';

  const count9 = Math.floor(sum / 9);
  const remainder = sum % 9;

  // 計算需要填入的數字位數
  const nonZeroDigits = count9 + (remainder > 0 ? 1 : 0);
  const zeroDigits = num - nonZeroDigits;

  // 組合結果(由高位到低位)
  let result = '9'.repeat(count9);
  if (remainder > 0) {
    result += remainder.toString();
  }
  result += '0'.repeat(zeroDigits);

  return result;
}

// --- 測試案例 ---
interface TestCase {
  num: number;
  sum: number;
  answer: string;
}

const testCases: TestCase[] = [
  {
    num: 2,
    sum: 3,
    answer: '30',
  },
  {
    num: 2,
    sum: 17,
    answer: '98',
  },
  {
    num: 1,
    sum: 10,
    answer: '',
  },
];

testCases.forEach(({ num, sum, answer }, index) => {
  const result = maxSumOfSquares(num, sum);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: num = ${JSON.stringify(num)}, sum = ${JSON.stringify(sum)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
