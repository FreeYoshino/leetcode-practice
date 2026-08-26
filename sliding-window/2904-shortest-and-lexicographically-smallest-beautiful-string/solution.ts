/**
 * 題號：2904
 * 題目：Shortest and Lexicographically Smallest Beautiful String
 * 連結：https://leetcode.com/problems/shortest-and-lexicographically-smallest-beautiful-string/description/
 * 時間複雜度：O(n^2)
 * - 滑動視窗的 left、right 各自最多移動 n 次，視窗維護本身是 O(n)。
 * - 但在每次 count >= k 時會建立子字串 s.slice(left, right + 1)，該操作成本與子字串長度成正比。
 * - 最壞情況下會進行 O(n) 次切片且每次長度可達 O(n)，因此總時間為 O(n^2)。
 *
 * 空間複雜度：O(n)
 * - 主要來自暫存候選子字串與最終答案 result，最長可達 n。
 * - 其餘變數（left、right、count）皆為常數空間。
 *
 * 解題思路：
 * 1. 使用滑動視窗 [left, right] 掃過字串，並用 count 記錄視窗內 '1' 的數量。
 * 2. 每次 right 右移後，若遇到 '1' 就更新 count。
 * 3. 當 count >= k 代表目前視窗已經是「beautiful substring」（至少含 k 個 '1'）。
 * 4. 進入 while 迴圈持續縮小左邊界：
 *    - 每次先取出目前子字串，嘗試更新答案。
 *    - 更新規則為：先比長度，較短者優先；若長度相同，取字典序較小者。
 *    - 接著 left 右移；若移出的是 '1'，同步將 count 減 1。
 */

// --- LeetCode 提供的程式碼模板 ---
function shortestBeautifulSubstring(s: string, k: number): string {
  const n = s.length;

  let result = '';
  let left = 0;
  let count = 0;
  for (let right = 0; right < n; right++) {
    const char = s[right];

    if (char === '1') {
      count++;
    }

    while (count >= k) {
      const subString = s.slice(left, right + 1);
      if (
        result === '' ||
        subString.length < result.length ||
        (subString.length === result.length && subString < result)
      ) {
        result = subString;
      }

      // 移動左指針，縮小窗口
      if (s[left] === '1') {
        count--;
      }
      left++;
    }
  }
  return result;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  k: number;
  answer: string;
}

const testCases: TestCase[] = [
  {
    s: '100011001',
    k: 3,
    answer: '11001',
  },
  {
    s: '1011',
    k: 2,
    answer: '11',
  },
  {
    s: '000',
    k: 1,
    answer: '',
  },
];

testCases.forEach(({ s, k, answer }, index) => {
  const result = shortestBeautifulSubstring(s, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
