/**
 * 題號：678
 * 題目：Valid Parenthesis String
 * 連結：https://leetcode.com/problems/valid-parenthesis-string/description/
 * 時間複雜度：O(n)
 * - 逐一掃描字串中的每個字元一次，需要 O(n)
 * - 堆疊的推入、彈出與索引比較操作皆為 O(1)，不會改變整體複雜度
 *
 * 空間複雜度：O(n)
 * - 使用兩個 stack 分別儲存尚未配對的左括號與星號索引
 * - 最壞情況下所有字元都是左括號或星號，需要 O(n) 空間
 *
 * 解題思路：
 * 1. 使用 leftStack 儲存尚未配對的左括號索引，使用 starStack 儲存星號索引。
 * 2. 遇到左括號時推入 leftStack，遇到星號時推入 starStack。
 * 3. 遇到右括號時，優先與最近的左括號配對；若沒有左括號，則將星號視為左括號使用。
 * 4. 掃描完成後，將剩餘的左括號依序與星號配對，並確認左括號的位置早於星號，確保星號能視為右括號。
 * 5. 若仍有無法配對的左括號，回傳 false；否則回傳 true。
 */

// --- LeetCode 提供的程式碼模板 ---
function checkValidString(s: string): boolean {
  const n = s.length;

  const leftStack: number[] = [];
  const starStack: number[] = [];

  for (let i = 0; i < n; i++) {
    const char = s[i];

    if (char === '(') {
      leftStack.push(i);
    } else if (char === '*') {
      starStack.push(i);
    } else {
      if (leftStack.length > 0) {
        leftStack.pop();
      } else if (starStack.length > 0) {
        starStack.pop();
      } else {
        return false;
      }
    }
  }

  while (leftStack.length > 0 && starStack.length > 0) {
    const leftIndex = leftStack.pop()!;
    const starIndex = starStack.pop()!;

    if (leftIndex > starIndex) {
      return false;
    }
  }

  return leftStack.length === 0;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: boolean;
}

const testCases: TestCase[] = [
  { s: '()', answer: true },
  { s: '(*)', answer: true },
  { s: '(*))', answer: true },
  { s: '(', answer: false },
];

testCases.forEach(({ s, answer }, index) => {
  const result = checkValidString(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
