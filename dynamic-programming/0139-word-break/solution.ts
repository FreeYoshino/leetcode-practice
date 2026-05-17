/**
 * 題號： 139
 * 標題： Word Break
 * 連結： https://leetcode.com/problems/word-break/description/
 * 時間複雜度： O(n^2)
 * - n 是字串 s 的長度
 * - 對於每個位置 i 需要檢查前面的位置 j 最壞情況下需要檢查 i 個位置，因此總共 O(n^2)
 * 空間複雜度： O(n)
 * 解題思路：
 * 1. 維護一個 dp陣列 dp[i] 代表 s[0..i-1] 是否能夠被 wordDict 中的單字組成
 * 2. 初始化 dp[0] = true 代表空字串可以被組成
 * 3. 對於每個位置 i 從 1 到 s.length，檢查前面的位置 j 從 0 到 i-1 如果 dp[j] 是 true 且 s[j..i-1] 在 wordDict 中，則 dp[i] 也設為 true
 * 4. 最後返回 dp[s.length] 代表整個字串 s 是否能夠被組成
 */

function wordBreak(s: string, wordDict: string[]): boolean {
  const dp: boolean[] = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}

// test cases
interface TestCase {
  s: string;
  wordDict: string[];
  answer: boolean;
}

const testCases: TestCase[] = [
  { s: 'leetcode', wordDict: ['leet', 'code'], answer: true },
  { s: 'applepenapple', wordDict: ['apple', 'pen'], answer: true },
  {
    s: 'catsandog',
    wordDict: ['cats', 'dog', 'sand', 'and', 'cat'],
    answer: false,
  },
];

testCases.forEach(({ s, wordDict, answer }, index) => {
  const result = wordBreak(s, wordDict);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: s = ${JSON.stringify(s)}, wordDict = ${JSON.stringify(wordDict)}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
