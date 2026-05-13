/**
 * 題號： 72
 * 標題： Edit Distance
 * 連結： https://leetcode.com/problems/edit-distance/description/
 * 時間複雜度： O(m * n)
 * - m 為 word1 的長度 n 為 word2 的長度
 * 空間複雜度： O(m * n)
 * 解題思路：
 * 1. 維護一個二維陣列 dp 其中 dp[i][j] 代表 word1 的前 i 個字母轉換成 word2 的前 j 個字母所需的最少步驟數
 * 2. 初始化dp陣列 當 word1 為空字串時 需要插入 j 個字母 當 word2 為空字串時 需要刪除 i 個字母
 * 3. 遍歷 word1 和 word2
 *    - 當兩個字母相同時 dp[i][j] = dp[i - 1][j - 1]
 *    - 否則 dp[i][j] = min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1)
 * 4. 最終答案為 dp[word1.length][word2.length]
 */

function minDistance(word1: string, word2: string): number {
  const dp: number[][] = Array.from({ length: word1.length + 1 }, () =>
    Array(word2.length + 1).fill(0),
  );

  // 初始化 dp 陣列
  for (let i = 0; i <= word1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= word2.length; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // 刪除
          dp[i][j - 1] + 1, // 插入
          dp[i - 1][j - 1] + 1, // 替換
        );
      }
    }
  }

  return dp[word1.length][word2.length];
}

// test cases
interface TestCase {
  word1: string;
  word2: string;
  answer: number;
}

const testCases: TestCase[] = [
  { word1: 'horse', word2: 'ros', answer: 3 },
  { word1: 'intention', word2: 'execution', answer: 5 },
];

testCases.forEach(({ word1, word2, answer }, index) => {
  const result = minDistance(word1, word2);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: word1 = ${JSON.stringify(word1)}, word2 = ${JSON.stringify(word2)}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
