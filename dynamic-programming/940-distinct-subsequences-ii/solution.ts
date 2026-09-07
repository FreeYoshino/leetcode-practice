/**
 * 題號：940
 * 題目：Distinct Subsequences II
 * 連結：https://leetcode.com/problems/distinct-subsequences-ii/description/
 * 時間複雜度：O(26 * n) = O(n)
 * - n 是字串 s 的長度。
 * - 每個字元都需要更新一次 end，並遍歷 26 個英文字母重新計算不同子序列總數。
 *
 * 空間複雜度：O(26) = O(1)
 * - end 陣列只儲存 26 個小寫英文字母各自作為最後字元的不同子序列數量。
 *
 * 解題思路：
 * 1. 定義 end[c] 為目前已處理的字串中，以字元 c 作為最後一個字元的不同子序列數量。
 * 2. 依序處理 s 的每個字元。對於目前字元 c，將它接到所有既有的不同子序列後面，
 *    會產生 total + 1 個新的子序列，其中 1 代表只選取目前字元本身。
 *    因此 end[c] = total + 1；覆蓋舊值可移除以 c 結尾的重複子序列。
 * 3. 更新 end[c] 後，將所有 end 的值加總，得到目前前綴的不同非空子序列總數 total。
 * 4. 最後返回 total，即 s 的所有不同非空子序列數量，並在每次計算時對 MOD 取餘數。
 */

// --- LeetCode 提供的程式碼模板 ---
function distinctSubseqII(s: string): number {
  const MOD = 1e9 + 7;
  const n = s.length;

  const end: number[] = new Array(26).fill(0);

  let total = 0;
  for (let i = 0; i < n; i++) {
    const charIndex = s.charCodeAt(i) - 'a'.charCodeAt(0);
    end[charIndex] = (total + 1) % MOD;

    let temp = 0;
    for (let j = 0; j < end.length; j++) {
      temp = (temp + end[j]) % MOD;
    }

    total = temp;
  }

  return total;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: 'abc',
    answer: 7,
  },
  {
    s: 'aba',
    answer: 6,
  },
  {
    s: 'aaa',
    answer: 3,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = distinctSubseqII(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
