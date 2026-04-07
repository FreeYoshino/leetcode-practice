/**
 * 題號： 424
 * 標題： Longest Repeating Character Replacement
 * 連結： https://leetcode.com/problems/longest-repeating-character-replacement/description/
 * 時間複雜度： O(n)
 * - right指標遍歷整個字串一次 left指標最多也只會跟著移動n次 Record 的查找與更新接為O(1) 因此總時間複雜度為O(n)
 * 空間複雜度： O(1)
 * - 使用了freqMap 來記錄字母頻率 但題目限定只有大寫字母 因此最多只會存26個字母的頻率 空間複雜度為O(1)
 * 解題思路： 
 * 1. 使用sliding  window 的技巧 並用freqMap 紀錄視窗內個字母的出現次數
 * 2. 核心: 當 window長度 - 視窗內出現最多次的字母次數(maxFreq) > k 時 代表可以替換的字數額度用完了 window失效
 * 3. 視窗擴張: right 指標 不斷地向右推進添加新的字母 並跟新 maxFreq
 * 4. 視窗平移: window失效時 只需用if 將left 指標向右平移一格
 *    - 這樣能確保視窗維持 歷史最大尺寸 繼續滑動 直到遇到能再次突破紀錄的組合
 * 5. 過程中持續 紀錄並更新 windwo 最大長度 result
 */

function characterReplacement(s: string, k: number): number {
  let result = 0;
  const freqMap: Record<string, number> = {};
  let maxFreq = 0;

  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    freqMap[rightChar] = (freqMap[rightChar] || 0) + 1;

    maxFreq = Math.max(maxFreq, freqMap[rightChar]);

    // 當維持的window 超出替換額度(k) 代表他失效了 將left項右移來縮小窗口
    if (right - left + 1 > k + maxFreq) {
      const leftChar = s[left];
      freqMap[leftChar]--;
      left++;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

// test case
interface TestCase {
  s: string;
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  { s: 'ABAB', k: 2, answer: 4 },
  { s: 'AABABBA', k: 1, answer: 4 },
];

testCases.forEach((tc, index) => {
  const result = characterReplacement(tc.s, tc.k);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = '${tc.k}', k = ${tc.k}`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
