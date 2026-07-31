/**
 * 題號：3016
 * 題目：Minimum Number of Pushes to Type Word II
 * 連結：https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/description/
 * 時間複雜度：O(n + 26 log 26)，在固定字母表下可視為 O(n)
 * - 統計每個字元出現次數：O(n)
 * - 對 26 個字母依出現次數排序：O(26 log 26)，因為字母表大小固定，所以可視為常數時間
 * - 走訪排序後的計數陣列並計算按鍵次數：O(26)，同樣是常數時間
 *
 * 空間複雜度：O(1)
 * - 只使用長度固定為 26 的計數陣列，額外空間與輸入長度無關
 *
 * 解題思路(同3014-minimum-number-of-pushes-to-type-word-i)：
 * 1. 先統計每個英文字母出現的次數，因為相同字母的按鍵次數一定相同，所以只需要關心各字母的頻率。
 * 2. 將頻率由大到小排序，讓出現次數最多的字母分配到按一次就能輸入的位置，次多的字母排在按兩次的位置，依此類推。
 * 3. 題目有 8 個按鍵可用，因此排序後前 8 個字母乘上 1、接下來 8 個字母乘上 2、再下一組乘上 3，以此計算總按鍵數。
 * 4. 只要把每個字母的出現次數乘上它所在分組所需的按鍵次數，再全部加總，就是最少的總按鍵數。
 */

// --- LeetCode 提供的程式碼模板 ---
function minimumPushes(word: string): number {
  const charBase = 'a'.charCodeAt(0);
  const charCount: number[] = new Array(26).fill(0);
  for (const w of word) {
    charCount[w.charCodeAt(0) - charBase]++;
  }
  charCount.sort((a, b) => b - a);

  let totalPushes = 0;
  for (let i = 0; i < 26; i++) {
    if (charCount[i] === 0) {
      break;
    }

    // 共有8個按鍵可用，第 0~7 個按 1 次、第 8~15 個按 2 次...
    const pushes = (Math.floor(i / 8) + 1) * charCount[i];
    totalPushes += pushes;
  }

  return totalPushes;
}

// --- 測試案例 ---
interface TestCase {
  word: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    word: 'abcde',
    answer: 5,
  },
  {
    word: 'xyzxyzxyzxyz',
    answer: 12,
  },
  {
    word: 'aabbccddeeffgghhiiiiii',
    answer: 24,
  },
];

testCases.forEach(({ word, answer }, index) => {
  const result = minimumPushes(word);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: word: ${JSON.stringify(word)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
