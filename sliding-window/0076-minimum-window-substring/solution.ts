/**
 * 題號： 76
 * 標題： Minimum Window Substring
 * 連結：https://leetcode.com/problems/minimum-window-substring/description/
 * 時間複雜度： O(m + n)
 * - m 是字串 s 的長度
 * - n 是字串 t 的長度
 * 空間複雜度： O(n)
 * - 建立了一個hash table 來儲存字串t的字元頻率
 * 解題思路：
 * 1. 使用滑動窗口的技巧來尋找包含字串 t 的最小子串
 * 2. 先建立一個 hash table 來儲存字串 t 中每個字元的頻率
 * 3. 使用兩個指標 left 和 right 來定義滑動窗口的邊界，初始時都指向字串 s 的開始位置
 * 4. 右指標向右移動，直到窗口包含了字串 t 中的所有字元
 * 5. 當窗口包含了字串 t 中的所有字元時 嘗試向右縮小窗口的大小 直到窗口不再包含字串 t 中的所有字元
 * 6. 在縮小窗口的過程中 更新最小窗口的長度和起始位置
 * 7. 回傳最小窗口的字串 如果沒有找到則回傳空字串
 */

function minWindow(s: string, t: string): string {
  if (s.length == 0 || t.length == 0 || s.length < t.length) return '';

  const charCount: Record<string, number> = {};
  for (const char of t) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  let minLength = Infinity;
  let minStart = 0;
  let count = t.length;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    if (charCount[rightChar] !== undefined) {
      charCount[rightChar]--;
      if (charCount[rightChar] >= 0) {
        count--;
      }
    }

    // 當count = 0 時 代表當前的window已經包含了所有t的字元 嘗試向右縮小window的大小
    while (count === 0) {
      const currentWindowLength = right - left + 1;
      if (currentWindowLength < minLength) {
        minLength = currentWindowLength;
        minStart = left;
      }

      const leftChar = s[left];
      if (charCount[leftChar] !== undefined) {
        charCount[leftChar]++;
        if (charCount[leftChar] > 0) {
          count++;
        }
      }
      left++;
    }
  }
  return minLength === Infinity ? '' : s.slice(minStart, minStart + minLength);
}

// test case
interface TestCase {
  s: string;
  t: string;
  answer: string;
}

const testCases: TestCase[] = [
  { s: 'ADOBECODEBANC', t: 'ABC', answer: 'BANC' },
  { s: 'a', t: 'a', answer: 'a' },
  { s: 'a', t: 'aa', answer: '' },
];

testCases.forEach(({ s, t, answer }, index) => {
  const result = minWindow(s, t);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}, t = ${JSON.stringify(t)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
