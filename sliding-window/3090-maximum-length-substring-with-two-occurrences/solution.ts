/**
 * 題號：3090
 * 題目：Maximum Length Substring With Two Occurrences
 * 連結：https://leetcode.com/problems/maximum-length-substring-with-two-occurrences/description/
 * 時間複雜度：O(n)
 * - 右指針會在字串中向右掃描一次，最多走到 n，為 O(n)
 * - 每次加入或移出一個字母時，都只做常數次的計數更新與比較，為 O(1)
 * - 因為每個位置最多被加入視窗與移出視窗各一次，所以整體仍是 O(n)
 *
 * 空間複雜度：O(1)
 * - 需要記錄每個字母目前在視窗中的出現次數
 * - 題目限制為小寫英文字母，因此不同字母最多只有 26 種，空間固定為 O(26) = O(1)
 *
 * 解題思路：
 * 1. 使用滑動視窗維護一個合法區間，使每個字母在視窗內的出現次數都不超過 2。
 * 2. 右指針持續擴張窗口，將 s[right] 加入 charCount 並更新其頻率。
 * 3. 當某個字母的頻率超過 2 時，左指針開始往右收縮，直到窗口重新合法。
 * 4. 每次窗口修正後，都更新目前最長合法子字串長度，最後回傳最大值。
 */

// --- LeetCode 提供的程式碼模板 ---
function maximumLengthSubstring(s: string): number {
  const n = s.length;

  let maxLength = 0;
  const charCount: Record<string, number> = {};

  let left = 0;
  for (let right = 0; right < n; right++) {
    const char = s[right];
    charCount[char] = (charCount[char] || 0) + 1;

    while (charCount[char] > 2) {
      const leftChar = s[left];
      charCount[leftChar]--;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
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
    s: 'bcbbbcba',
    answer: 4,
  },
  {
    s: 'aaaa',
    answer: 2,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = maximumLengthSubstring(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
