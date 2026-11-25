/**
 * 題號：2124
 * 題目：Check if All A's Appears Before All B's
 * 連結：https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/description/
 * 時間複雜度：O(n)
 * - 逐一檢查字串中的每個字元一次，因此時間複雜度為 O(n)
 * 空間複雜度：O(1)
 * - 只使用固定數量的變數記錄索引，不隨輸入字串長度增加，因此空間複雜度為 O(1)
 * 解題思路：
 * 1. 使用 firstBIndex 記錄第一個 'b' 的位置，初始值為 -1，表示尚未遇到 'b'
 * 2. 從左至右掃描字串；遇到第一個 'b' 時記錄其索引
 * 3. 若在第一個 'b' 之後又遇到 'a'，記錄該 'a' 的索引至 lastAIndex
 * 4. 掃描完成後，若沒有遇到 'b'，或最後一個違規 'a' 的索引仍小於第一個 'b' 的索引，代表所有 'a' 都在所有 'b' 之前，回傳 true
 */

// --- LeetCode 提供的程式碼模板 ---
function checkString(s: string): boolean {
  const n = s.length;

  let firstBIndex = -1;
  let lastAIndex = -1;

  for (let i = 0; i < n; i++) {
    const char = s[i];
    if (char === 'b' && firstBIndex === -1) {
      firstBIndex = i;
    }
    if (char === 'a' && firstBIndex !== -1) {
      lastAIndex = i;
    }
  }

  return lastAIndex < firstBIndex || firstBIndex === -1;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    s: 'aaabbb',
    answer: true,
  },
  {
    s: 'abab',
    answer: false,
  },
  {
    s: 'bbb',
    answer: true,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = checkString(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
