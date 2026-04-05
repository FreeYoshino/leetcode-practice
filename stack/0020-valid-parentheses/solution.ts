/**
 * 題號： 20
 * 標題： Valid Parentheses
 * 連結： https://leetcode.com/problems/valid-parentheses/description/
 * 時間複雜度： O(n)
 * - 至需將字串s遍歷一遍 且建立映射(Record) 的時間為O(1) 因此整體時間複雜度為 O(n)
 * 空間複雜度： O(n)
 * - 最差的情況 s字串全為左括號 此時所有字元都會被推入stack中 因此空間複雜度為O(n)
 * 解題思路：
 * 1. 建立型別為Record 的 map物件 將右括號作為key 左括號作為value
 * 2. 建立stack 來儲存遇到的左括號
 * 3. 遍歷s中的每一個字元
 * - 如果字元為左括號 則加入stack等待配對
 * - 如果字元為右括號 則檢查stack最上方的左括號是否與右括號匹配:
 *    - 若此時stack為空 回傳false
 *    - 若stack彈出的左括號不匹配回傳false
 * 4. 遍歷完s 後檢查stack是否還有元素 若為空 代表所有括號接完美匹配 回傳true
 */

function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '[',
  };
  for (const char of s) {
    if (char in map) {
      const top = stack.pop();

      if (top !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}

// test case
interface TestCase {
  s: string;
  answer: boolean;
}

const testCases: TestCase[] = [
  { s: '()', answer: true },
  { s: '()[]{}', answer: true },
  { s: '(]', answer: false },
  { s: '([])', answer: true },
  { s: '([)]', answer: false },
];

testCases.forEach((tc, index) => {
  const result = isValid(tc.s);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = '${tc.s}'`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
