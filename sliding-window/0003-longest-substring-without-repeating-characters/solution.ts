/**
 * 題號： 3
 * 標題： Longest Substring Without Repeating Characters
 * 連結： https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 * 時間複雜度： O(n)
 * - 雖然使用了巢狀迴圈 但每個字元最多各被 right 、 left 指標走訪一次(加入、移除set) 總操作數約為2n 因此時間複雜度為O(n)
 * 空間複雜度： O(1)
 * - 最差的情況 set內會裝滿字元集的種類數量 視為常數
 * 解題思路：
 */

function lengthOfLongestSubstring(s: string): number {
  const charSet = new Set<string>();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    while (charSet.has(currentChar)) {
      charSet.delete(s[left]);
      left++;
    }

    charSet.add(currentChar);
    maxLength = Math.max(maxLength, charSet.size);
  }

  return maxLength;
}

// test case
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  { s: 'abcabcbb', answer: 3 },
  { s: 'bbbbb', answer: 1 },
  { s: 'pwwkew', answer: 3 },
];

testCases.forEach((tc, index) => {
  const resullt = lengthOfLongestSubstring(tc.s);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = '${tc.s}'`);
  console.log(`Output: ${resullt}`);
  console.log(`Answer: ${tc.answer}`);
});
