/**
 * 題號：3302
 * 題目：Find the Lexicographically Smallest Valid Sequence
 * 連結：https://leetcode.com/problems/find-the-lexicographically-smallest-valid-sequence/description/
 * 時間複雜度：O(m + n)
 * - 先用一個長度為 m + 1 的 dp 陣列由後往前計算可匹配的後綴長度，耗時 O(m)
 * - 再從左到右建構答案，最多掃描一次 word1 與 word2，耗時 O(m + n)
 *
 * 空間複雜度：O(m)
 * - 使用長度為 m + 1 的 dp 陣列來記錄後綴可匹配長度
 *
 * 解題思路：
 * 1. 設定 dp[i] 為從 word1 的索引 i 開始，往後能夠匹配到 word2 的最大後綴長度。
 * 2. 若 word1[i] 與 word2 的對應位置相同，則 dp[i] = dp[i + 1] + 1；否則維持 dp[i + 1]。
 * 3. 建構答案時，從左到右依序選擇索引，若當前字元能直接匹配 word2 的下一個目標字元，就直接選擇它。
 * 4. 若當前字元不能直接匹配，且還沒有使用過「更換字元」的機會，則檢查剩下的字元是否仍然足以完成 word2 的匹配；若可行，就選擇這個位置並將 canChange 設為 false。
 * 5. 這樣可以在保證最多只改一次字元的前提下，盡量選到最小的索引序列；若最後無法匹配完整的 word2，則回傳空陣列。
 */

// --- LeetCode 提供的程式碼模板 ---
function validSequence(word1: string, word2: string): number[] {
  const m = word1.length;
  const n = word2.length;

  /**
   * dp[i]: 表示在word1索引 i 的位置後，能夠組成word2的最大後綴長度
   * dp[i] = dp[i + 1] + 1, if word1[i] == word2[n - dp[i + 1] - 1](代表word1[i]可以匹配到word2的下一個字元)
   * Otherwise, dp[i] = dp[i + 1]
   *
   */
  const dp: number[] = new Array(m + 1).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    if (dp[i + 1] < n && word1[i] === word2[n - dp[i + 1] - 1]) {
      dp[i] = dp[i + 1] + 1;
    } else {
      dp[i] = dp[i + 1];
    }
  }

  const result: number[] = [];
  let j = 0; // word2的索引
  let canChange = true; // 是否可以更換字元
  for (let i = 0; i < m && j < n; i++) {
    if (word1[i] === word2[j]) {
      // 第一種情況: 原生的字元可以匹配到word2的下一個字元
      result.push(i);
      j++;
    } else if (canChange && dp[i + 1] >= n - j - 1) {
      // 第二種情況: 可以更換字元，且剩餘的字元可以匹配到word2的剩餘字元
      result.push(i);
      j++;
      canChange = false;
    }
  }

  return result.length === n ? result : [];
}

// --- 測試案例 ---
interface TestCase {
  word1: string;
  word2: string;
  answer: number[];
}

const testCases: TestCase[] = [
  {
    word1: 'vbcca',
    word2: 'abc',
    answer: [0, 1, 2],
  },
  {
    word1: 'bacdc',
    word2: 'abc',
    answer: [1, 2, 4],
  },
  {
    word1: 'aaaaaa',
    word2: 'aaabc',
    answer: [],
  },
  {
    word1: 'abc',
    word2: 'ab',
    answer: [0, 1],
  },
];

testCases.forEach(({ word1, word2, answer }, index) => {
  const result = validSequence(word1, word2);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: word1 = "${word1}", word2 = "${word2}"`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
