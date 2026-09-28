/**
 * 題號：1614
 * 題目：Maximum Nesting Depth of the Parentheses
 * 連結：https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/description/
 * 時間複雜度：O(n)
 * - 逐一掃描字串中的每個字元一次，需要 O(n)
 * - 堆疊的推入與彈出操作皆為 O(1)，不會改變整體複雜度
 *
 * 空間複雜度：O(n)
 * - 使用 stack 儲存尚未配對的左括號
 * - 最壞情況下所有字元都是左括號，需要 O(n) 空間
 *
 * 解題思路：
 * 1. 使用 stack 儲存尚未配對的左括號。
 * 2. 遇到左括號時推入 stack，表示目前巢狀深度增加。
 * 3. 遇到右括號時，先以 stack.length 更新目前的最大深度，再移除對應的左括號。
 * 4. 掃描完成後，回傳記錄到的最大巢狀深度。
 */

// --- LeetCode 提供的程式碼模板 ---
function maxDepth(s: string): number {
  const n = s.length;
  const stack: string[] = [];

  let maxDepth = 0;
  for (let i = 0; i < n; i++) {
    const char = s[i];
    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      maxDepth = Math.max(maxDepth, stack.length);
      stack.pop();
    }
  }

  return maxDepth;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: '(1+(2*3)+((8)/4))+1',
    answer: 3,
  },
  {
    s: '(1)+((2))+(((3)))',
    answer: 3,
  },
  {
    s: '()(())((()()))',
    answer: 3,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = maxDepth(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
