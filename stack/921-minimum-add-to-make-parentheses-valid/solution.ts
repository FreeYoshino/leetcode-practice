/**
 * 題號：921
 * 題目：Minimum Add to Make Parentheses Valid
 * 連結：https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/description/
 * 時間複雜度：O(n)
 * - 逐一掃描字串中的每個字元一次，需要 O(n)
 * - 堆疊的推入與彈出操作皆為 O(1)，不會改變整體複雜度
 *
 * 空間複雜度：O(n)
 * - 使用 stack 儲存尚未配對的左括號
 * - 最壞情況下所有字元都是左括號，需要 O(n) 空間
 *
 * 解題思路：
 * 1. 使用 stack 儲存尚未配對的左括號，並使用 neededOpen 計算需要補上的左括號數量。
 * 2. 遇到左括號時推入 stack，等待後續的右括號配對。
 * 3. 遇到右括號時，若 stack 中有尚未配對的左括號，則移除一個左括號；否則代表缺少左括號，將 neededOpen 加一。
 * 4. 掃描完成後，stack 中剩餘的左括號都需要補上右括號，因此回傳 neededOpen + stack.length。
 */

// --- LeetCode 提供的程式碼模板 ---
function minAddToMakeValid(s: string): number {
  const stack: string[] = [];

  let neededOpen = 0;
  for (const char of s) {
    if (char === '(') {
      stack.push(char);
    } else {
      if (stack.length > 0) {
        stack.pop();
      } else {
        neededOpen++;
      }
    }
  }

  return neededOpen + stack.length;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: '())',
    answer: 1,
  },
  {
    s: '(((',
    answer: 3,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = minAddToMakeValid(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
