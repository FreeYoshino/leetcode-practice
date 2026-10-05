/**
 * 題號：856
 * 題目：Score of Parentheses
 * 連結：https://leetcode.com/problems/score-of-parentheses/description/
 * 時間複雜度：O(n)
 * - 只需要逐一掃描字串中的每個括號一次
 *
 * 空間複雜度：O(1)
 * - 只使用 result 與 depth 等固定數量的變數
 *
 * 解題思路：
 * 1. 使用 depth 記錄目前括號所在的巢狀深度，遇到 '(' 時增加，遇到 ')' 時減少。
 * 2. 當前一個字元是 '(' 且目前字元是 ')' 時，代表找到一組最內層的 '()'。
 * 3. 根據這組 '()' 所在的深度，將 2^(depth - 1) 加到總分 result。
 * 4. 掃描完成後回傳 result；相鄰括號的分數會自然累加，巢狀括號則會依深度加倍。
 */

// --- LeetCode 提供的程式碼模板 ---
function scoreOfParentheses(s: string): number {
  const n = s.length;

  let result = 0;
  let depth = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === '(') {
      depth++;
    } else {
      if (s[i - 1] === '(') {
        // 找到一個最內層的 '()' 計算對應的分數
        result += Math.pow(2, depth - 1);
      }

      depth--;
    }
  }

  return result;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: '()',
    answer: 1,
  },
  {
    s: '(())',
    answer: 2,
  },
  {
    s: '()()',
    answer: 2,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = scoreOfParentheses(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
