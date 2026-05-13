/**
 * 題號： 1143
 * 標題： Longest Common Subsequence
 * 連結： https://leetcode.com/problems/longest-common-subsequence/description/
 * 時間複雜度： O(m * n)
 * - m 是 text1 的長度 n 是 text2 的長度
 * 空間複雜度： O(m * n)
 * 解題思路：
 * 1. 維護一個二維陣列 dp 其中 dp[i][j] 代表 text1 的前 i 個字元和 text2 的前 j 個字元的 LCS(longest common subsequence) 的長度
 * 2. 如果 text1[i - 1] === text2[j - 1] 代表這兩個字元相同 那麼 dp[i][j] = dp[i - 1][j - 1] + 1
 * 3. 如果 text1[i - 1] !== text2[j - 1] 代表這兩個字元不同 那麼 dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
 * 4. 最後 dp[text1.length][text2.length] 就是 text1 和 text2 的 LCS 的長度
 */

function longestCommonSubsequence(text1: string, text2: string): number {
  if (text1.length === 0 || text2.length === 0) {
    return 0;
  }

  const dp: number[][] = Array.from({ length: text1.length + 1 }, () =>
    new Array(text2.length + 1).fill(0),
  );

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
}

// test cases
interface TestCase {
  text1: string;
  text2: string;
  answer: number;
}

const testCases: TestCase[] = [
  { text1: 'abcde', text2: 'ace', answer: 3 },
  { text1: 'abc', text2: 'abc', answer: 3 },
  { text1: 'abc', text2: 'def', answer: 0 },
];

testCases.forEach(({ text1, text2, answer }, index) => {
  const result = longestCommonSubsequence(text1, text2);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: text1 = ${JSON.stringify(text1)}, text2 = ${JSON.stringify(text2)}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
