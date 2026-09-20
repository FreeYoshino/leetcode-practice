/**
 * 題號：3498
 * 題目：Reverse Degree of a String
 * 連結：https://leetcode.com/problems/reverse-degree-of-a-string/description/
 * 時間複雜度： O(n)
 * 空間複雜度： O(1)
 * 解題思路：
 * 1. 字母的反向權重為 26 減去該字母距離 'a' 的偏移量，例如 'a' 的權重為 26，'z' 的權重為 1。
 * 2. 由左到右掃描字串，將每個字元的反向權重乘以其位置（從 1 開始）後加入結果。
 * 3. 只需在一次掃描中累加答案，不需要額外建立陣列或其他資料結構。
 */

// --- LeetCode 提供的程式碼模板 ---
function reverseDegree(s: string): number {
  const n = s.length;

  let result = 0;
  for (let i = 0; i < n; i++) {
    const charCode = 26 - (s.charCodeAt(i) - 'a'.charCodeAt(0));
    result += charCode * (i + 1);
  }

  return result;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: 'abc',
    answer: 148,
  },
  {
    s: 'zaza',
    answer: 160,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = reverseDegree(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
