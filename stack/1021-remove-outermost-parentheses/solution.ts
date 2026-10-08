/**
 * 題號：1021
 * 題目：Remove Outermost Parentheses
 * 連結：https://leetcode.com/problems/remove-outermost-parentheses/description/
 * 時間複雜度：O(n)
 * - 逐一掃描字串中的每個字元一次，需要 O(n)
 * - 陣列的推入操作為 O(1)，不會改變整體複雜度
 *
 * 空間複雜度：O(n)
 * - 使用 result 陣列儲存移除最外層括號後的字元
 * - 最壞情況下需要儲存 O(n) 個字元
 *
 * 解題思路：
 * 1. 使用 depth 記錄目前所在的括號巢狀深度。
 * 2. 遇到左括號時，若目前深度大於 0，代表不是原始分解元件的最外層括號，
 *    因此將它加入 result，接著增加深度。
 * 3. 遇到右括號時，先減少深度；若減少後仍大於 0，代表不是最外層括號，
 *    因此將它加入 result。
 * 4. 掃描完成後，將 result 中的字元組合成字串並回傳。
 */

// --- LeetCode 提供的程式碼模板 ---
function removeOuterParentheses(s: string): string {
  let depth = 0;
  const result: string[] = [];
  for (const char of s) {
    if (char === '(') {
      if (depth > 0) {
        result.push(char);
      }

      depth++;
    } else {
      depth--;

      if (depth > 0) {
        result.push(char);
      }
    }
  }
  return result.join('');
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: string;
}

const testCases: TestCase[] = [
  {
    s: '(()())(())',
    answer: '()()()',
  },
  {
    s: '(()())(())(()(()))',
    answer: '()()()()(())',
  },
  {
    s: '()()',
    answer: '',
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = removeOuterParentheses(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
