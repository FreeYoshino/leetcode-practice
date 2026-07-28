/**
 * 題號：3517
 * 題目：Smallest Palindromic Rearrangement I
 * 連結：https://leetcode.com/problems/smallest-palindromic-rearrangement-i/description/
 * 時間複雜度：O(n)
 * - n 為字串 s 的長度
 * - 先走訪一次字串統計每個字元出現次數，時間為 O(n)
 * - 之後只會固定走訪 26 個英文字母來組合答案，時間為 O(1)
 * - 因此整體時間複雜度為 O(n)
 * 空間複雜度：O(n)
 * - 需要一個長度固定為 26 的陣列來統計字元次數，額外空間為 O(1)
 * - 另外會使用 leftHalf、rightHalf 來組出答案字串，最終輸出長度最多為 n
 * - 因此若把輸出字串也算入，整體空間複雜度為 O(n)
 * 解題思路：
 * - 先統計每個字母出現的次數，因為題目只處理小寫英文字母，所以可以直接用長度 26 的陣列記錄
 * - 如果有超過 1 個字母的出現次數是奇數，就無法重排成回文，直接回傳空字串
 * - 若存在奇數次字母，這個字母只能放在回文的正中央
 * - 其餘字母都各取一半放到左半邊，另一半放到右半邊，這樣才能維持回文結構
 * - 因為字母是依照 a 到 z 的順序處理，所以左半邊天然就是字典序最小的排列
 * - 最後把左半邊、中央字母、以及左半邊反轉後的結果串接起來，就是答案
 */

// --- LeetCode 提供的程式碼模板 ---
function smallestPalindrome(s: string): string {
  const charCount: number[] = new Array(26).fill(0);
  for (const char of s) {
    charCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  let oddChar: string = '';
  let leftHalf: string[] = [];
  for (const charCode in charCount) {
    const char = String.fromCharCode(parseInt(charCode) + 'a'.charCodeAt(0));

    if (charCount[charCode] % 2 !== 0) {
      if (oddChar != '') {
        return '';
      }

      oddChar = char;
    }

    leftHalf.push(char.repeat(Math.floor(charCount[charCode] / 2)));
  }

  // 將左半部分排序 確保最小字典序
  const leftHalfStr = leftHalf.join('');
  const rightHalfStr = leftHalfStr.split('').reverse().join('');

  return leftHalfStr + oddChar + rightHalfStr;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: string;
}

const testCases: TestCase[] = [
  {
    s: 'z',
    answer: 'z',
  },
  {
    s: 'babab',
    answer: 'abbba',
  },
  {
    s: 'daccad',
    answer: 'acddca',
  },
];

testCases.forEach(({ s, answer }, index) => {
  // TODO: 更改呼叫的函式名稱與上方模板一致
  const result = smallestPalindrome(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
