/**
 * 題號：3863
 * 題目：Minimum Operations to Sort a String
 * 連結：https://leetcode.com/problems/minimum-operations-to-sort-a-string/description/
 * 時間複雜度：O(n)
 * - 一次掃描字串，同時找出最小與最大字元並判斷字串是否已排序
 * - 若需要額外判斷最小或最大字元的位置，最多再掃描一次字串
 *
 * 空間複雜度：O(1)
 * - 只使用固定數量的變數記錄最小字元、最大字元與排序狀態
 *
 * 解題思路：
 * 1. 掃描字串，找出最小與最大字元，並判斷字串是否已經按照字典序排序。
 * 2. 若字串已排序，不需要任何操作，回傳 0。
 * 3. 若字串長度為 2 且尚未排序，無法透過操作完成排序，回傳 -1。
 * 4. 若最小字元位於開頭，或最大字元位於結尾，一次操作即可排序，回傳 1。
 * 5. 若最小或最大字元位於中間，兩次操作即可將字串排序，回傳 2。
 * 6. 剩下的情況代表最小字元在結尾且最大字元在開頭，需要三次操作，
 *    回傳 3。
 */

// --- LeetCode 提供的程式碼模板 ---
function minOperations(s: string): number {
  const n = s.length;

  let maxChar = 'a';
  let minChar = 'z';
  let isSorted = true;
  for (let i = 0; i < n; i++) {
    if (s[i] > maxChar) {
      maxChar = s[i];
    }
    if (s[i] < minChar) {
      minChar = s[i];
    }
    if (i > 0 && s[i] < s[i - 1]) {
      isSorted = false;
    }
  }

  if (isSorted) return 0;
  if (n === 2) return -1;

  // 當最小或最大字元在字串的開頭或結尾時，只需要一次操作即可排序
  if (s[0] === minChar || s[n - 1] === maxChar) return 1;

  // 當最小或最大字元在字串的中間時，需要兩次操作才能排序
  for (let i = 1; i < n - 1; i++) {
    if (s[i] === minChar || s[i] === maxChar) {
      return 2;
    }
  }

  // 當最小字元出現在字串結尾，最大字元出現在字串開頭時，需要三次操作才能排序
  return 3;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: 'dog',
    answer: 1,
  },
  {
    s: 'card',
    answer: 2,
  },
  {
    s: 'gf',
    answer: -1,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = minOperations(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
