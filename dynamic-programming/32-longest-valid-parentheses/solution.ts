/**
 * 題號：32
 * 題目：Longest Valid Parentheses
 * 連結：https://leetcode.com/problems/longest-valid-parentheses/description/
 * 時間複雜度：O(n)
 * - n 是字串 s 的長度。
 * - 只需從左到右掃描一次字串，每個位置的狀態都能在 O(1) 時間內完成轉移。
 *
 * 空間複雜度：O(n)
 * - dp 陣列儲存每個位置結尾的最長有效括號子字串長度。
 *
 * 解題思路：
 * 1. 定義 dp[i] 為「以 s[i] 為結尾的最長有效括號子字串長度」。
 * 2. 當 s[i] 為 '(' 時，不可能形成以它為結尾的有效括號字串，因此 dp[i] = 0。
 * 3. 當 s[i] 為 ')' 且前一個字元為 '(' 時，形成一組新的括號：
 *    dp[i] = dp[i - 2] + 2，其中 dp[i - 2] 用來連接前方相鄰的有效括號字串。
 * 4. 當 s[i] 為 ')' 且前一個字元也是 ')' 時，先跳過前一段有效括號，
 *    檢查 s[i - dp[i - 1] - 1] 是否為 '('：
 *    - 若是，則可將這組括號與前方的有效括號串接起來。
 *    - 此時 dp[i] = dp[i - 1] + 2 + dp[i - dp[i - 1] - 2]。
 * 5. 每次更新 dp[i] 後，以 maxLength 紀錄目前找到的最長有效括號子字串。
 */

// --- LeetCode 提供的程式碼模板 ---
function longestValidParentheses(s: string): number {
  const n = s.length;

  // dp[i]: 代表以 s[i] 為結尾的最長有效括號子字串的長度
  // 當 s[i] 為 '(' 時，dp[i] = 0
  // 當 s[i] 為 ')' 時:
  // - 若 s[i - 1] 為 '('，則 dp[i] = dp[i - 2] + 2
  // - 若 s[i - 1] 為 ')'，則檢查該區間的前一個字元 s[i - dp[i - 1] - 1] 是否為 '('，若是，則 dp[i] = dp[i - 1] + 2 + dp[i - dp[i - 1] - 2]
  const dp: number[] = new Array(n).fill(0);

  let maxLength = 0;
  for (let i = 1; i < n; i++) {
    if (s[i] === '(') {
      dp[i] = 0;
    } else {
      if (s[i - 1] === '(') {
        dp[i] = (dp[i - 2] || 0) + 2;
      } else {
        const prevIndex = i - dp[i - 1] - 1;

        if (prevIndex >= 0 && s[prevIndex] === '(') {
          dp[i] = dp[i - 1] + 2 + (dp[prevIndex - 1] || 0);
        }
      }
    }

    maxLength = Math.max(maxLength, dp[i]);
  }

  return maxLength;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: '(()',
    answer: 2,
  },
  {
    s: ')()())',
    answer: 4,
  },
  {
    s: '',
    answer: 0,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = longestValidParentheses(s as any);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
