/**
 * 題號：1111
 * 題目：Maximum Nesting Depth of Two Valid Parentheses Strings
 * 連結：https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/description/
 * 時間複雜度：O(n)
 * - 逐一掃描 seq 中的每個字元一次，需要 O(n)
 * - 每次判斷與加入分組結果皆為 O(1)，不會改變整體複雜度
 *
 * 空間複雜度：O(n)
 * - 使用 result 儲存每個括號所屬的分組
 * - 最壞情況下需要為 seq 中的每個字元儲存結果，需要 O(n) 空間
 *
 * 解題思路：
 * 1. 使用 depth 記錄目前的括號巢狀深度。
 * 2. 遇到左括號時，先增加 depth，再依照深度的奇偶性分配至 A 或 B。
 * 3. 遇到右括號時，使用目前深度的奇偶性分配至相同的組別，再將 depth 減一。
 * 4. 以巢狀深度的奇偶性分組，確保同一組中的括號深度不會連續增加，藉此降低兩組各自的最大巢狀深度。
 * 5. 回傳記錄所有括號分組結果的 result。
 */

// --- LeetCode 提供的程式碼模板 ---
function maxDepthAfterSplit(seq: string): number[] {
  const result: number[] = [];

  let depth = 0;
  for (const char of seq) {
    if (char === '(') {
      // 進入新的括號層級，深度加一，分配到 A 或 B 使用奇偶數深度來決定分配給哪個組別
      depth++;
      result.push(depth % 2);
    }
    if (char === ')') {
      result.push(depth % 2);
      depth--;
    }
  }

  return result;
}

// --- 測試案例 ---
interface TestCase {
  seq: string;
  answer: number[];
}

const testCases: TestCase[] = [
  {
    seq: '(()())',
    answer: [0, 1, 1, 1, 1, 0],
  },
  {
    seq: '()(())()',
    answer: [0, 0, 0, 1, 1, 0, 1, 1],
  },
];

testCases.forEach(({ seq, answer }, index) => {
  const result = maxDepthAfterSplit(seq);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: seq = ${JSON.stringify(seq)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
