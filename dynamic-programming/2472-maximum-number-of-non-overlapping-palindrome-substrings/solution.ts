/**
 * 題號：2472
 * 題目：Maximum Number of Non-overlapping Palindrome Substrings
 * 連結：https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/description/
 * 時間複雜度：O(n * k)
 * - n 是字串長度，對每個結尾位置最多檢查長度 k 與 k + 1 的子字串。
 * - 每次檢查子字串是否為回文，最壞需要向內比對 O(k) 個字元。
 * - dp 的轉移與更新為 O(1)，因此總時間複雜度為 O(n * k)。
 *
 * 空間複雜度：O(n)
 * - dp[i] 記錄前 i 個字元中，最多可以找到的不重疊回文子字串數量，需要 O(n) 的額外空間。
 * - isPalindrome 使用常數額外空間，因此不影響整體空間複雜度。
 *
 * 解題思路：
 * 1. 將 dp[i] 定義為前 i 個字元中，最多可以找到的不重疊回文子字串數量。
 * 2. 對每個結尾位置 i，先繼承 dp[i - 1]，代表不選擇以 s[i - 1] 結尾的回文子字串。
 * 3. 由於回文子字串長度至少為 k，因此只需要檢查長度 k 與 k + 1 的子字串。
 *    若長度超過 k + 1，便可以取其中一段長度 k 或 k + 1 的回文子字串，
 *    不會比選擇較短的回文子字串得到更少的答案。
 * 4. 若 s[start...i - 1] 是回文，則將它接在前 start 個字元的最佳解後面，
 *    更新 dp[i] = max(dp[i], dp[start] + 1)。
 * 5. 依序計算 dp[1] 到 dp[n]，最後 dp[n] 即為整個字串中最多的不重疊回文子字串數量。
 */

// --- LeetCode 提供的程式碼模板 ---
function maxPalindromes(s: string, k: number): number {
  const n = s.length;

  // 檢查子字串 s[left...right] 是否為回文
  const isPalindrome = (left: number, right: number): boolean => {
    if (right >= n) return false;

    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  // dp[i]: 代表前i個字元中，最多可以找到多少個不重疊的回文子字串
  // dp[i] = max(dp[i-1], dp[j] + 1)
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i - 1]; // 預設不選擇以s[i-1]結尾的回文子字串

    // 檢查以s[i-1]結尾 形成長度k or k+1的回文子字串
    for (let length = k; length <= k + 1; length++) {
      const start = i - length;
      if (start >= 0 && isPalindrome(start, i - 1)) {
        dp[i] = Math.max(dp[i], dp[start] + 1);
      }
    }
  }
  return dp[n];
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: 'abaccdbbd',
    k: 3,
    answer: 2,
  },
  {
    s: 'adbcda',
    k: 2,
    answer: 0,
  },
];

testCases.forEach(({ s, k, answer }, index) => {
  const result = maxPalindromes(s, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
