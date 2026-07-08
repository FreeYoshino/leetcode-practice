/**
 * 題號： 22
 * 題目： Generate Parentheses
 * 連結： https://leetcode.com/problems/generate-parentheses/description/
 * 時間複雜度：O(Cn * n)
 * - 合法括號組合的數量是第 n 個 Catalan number（記為 Cn）。
 * - 每組答案長度是 2n，建立字串與輸出成本和 n 成正比。
 * - 因此整體可寫成 O(Cn * n)；若用漸進近似，Cn 約為 O(4^n / sqrt(n))。
 * 空間複雜度：O(Cn * n)（含輸出） / O(n)（不含輸出）
 * - 遞迴深度最多到 2n，扣掉常數後可視為 O(n)。
 * - 若把結果陣列算入，需儲存 Cn 個長度 2n 的字串，所以是 O(Cn * n)。
 * 解題思路：
 * - 使用回溯建立括號字串，狀態包含目前字串 current、已使用左括號數 open、右括號數 close。
 * - 任一時刻都維持合法性：
 *   1. open < n 時，才能再放 '('。
 *   2. close < open 時，才能放 ')'，避免出現無效前綴。
 * - 當 current 長度達到 2n，代表形成一組完整合法解，加入結果。
 * - 這裡採用字串拼接（current + '(' / ')'）做「傳值」遞迴：
 *   每次呼叫都拿到新的字串副本，不會修改上一層狀態，
 *   所以不需要像陣列 push/pop 那樣手動撤銷（回朔）狀態。
 */

class Solution {
  generateParenthesis(n: number): string[] {
    const result: string[] = [];

    const backtrack = (current: string, open: number, close: number) => {
      if (current.length === n * 2) {
        result.push(current);
        return;
      }

      // 兩種情況：
      // 1. 如果還有剩餘的左括號可以使用，則添加一個左括號
      if (open < n) {
        backtrack(current + '(', open + 1, close);
      }

      // 2. 如果已經有左括號，且還有剩餘的右括號可以使用，則添加一個右括號
      if (close < open) {
        backtrack(current + ')', open, close + 1);
      }
    };

    // 從空字串開始，並且初始的左括號和右括號數量都為 0
    backtrack('', 0, 0);
    return result;
  }
}

interface TestCase {
  n: number;
  answer: string[];
}

const testCases: TestCase[] = [
  {
    n: 3,
    answer: ['((()))', '(()())', '(())()', '()(())', '()()()'],
  },
  {
    n: 1,
    answer: ['()'],
  },
];

testCases.forEach(({ n, answer }, index) => {
  const sol = new Solution();
  const result = sol.generateParenthesis(n);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${n}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
