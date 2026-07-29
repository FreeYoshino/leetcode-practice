/**
 * 題號：3518
 * 題目：Smallest Palindromic Rearrangement II
 * 連結：https://leetcode.com/problems/smallest-palindromic-rearrangement-ii/description/
 * 時間複雜度：O(n * |Σ|)，其中 |Σ| = 26 為字元集大小。在常數字母表下可視為 O(n)。
 * - 計數字元與檢查回文合法性：O(n)。
 * - 計算初始多項式組合數：調用 nCr 總累加次數不超過 n/2，約 O(n)。
 * - 貪心逐位構建前半段：長度 n/2 的外迴圈搭配最多 26 次的內迴圈，且內部使用 O(1) 的比例乘除計算，總體為 O(n * 26) = O(n)。
 *
 * 空間複雜度：O(n)
 * - 計數陣列需 O(|Σ|) = O(1) 的常數空間。
 * - 使用了長度約 n/2 的陣列存放前半段字元，以及回傳長度為 n 的字串，整體為 O(n)。
 *
 * 解題思路：
 * 1. 先計算每個字母出現次數，並檢查是否能組成迴文（偶數長度時所有字母計數必須為偶數；奇數長度時最多一個奇數計數）。
 * 2. 將每個字母的計數除以 2，只保留前半段的字母數量，問題即轉為求前半段字元在字母多重集合中的第 k 小字典序排列。
 * 3. 計算所有不同前半段排列數量（多項式排列數，可透過連乘的組合數 nCr 計算多重排列的 multinomial），若總排列數小於 k，回傳空字串。
 * 4. 【貪心判定第 k 小】：
 *    - 自左至右決定前半段每個位置的字元。從 'a' 到 'z' 依序試探仍有剩餘數量的字母 j。
 *    - 利用數學比例關係 `ways = currentWays * charCount[j] / remSlots`，在 O(1) 時間內算出以字母 j 開頭的所有合法子排列數。
 *    - 若 k <= ways，代表第 k 個排列必落在此字母開頭的分支內，確定選擇字母 j，更新剩餘總數；
 *    - 若 k > ways，代表目標在字典序較後面的字母分支內，將 targetK 減去 ways，繼續嘗試下一個字母。
 * 5. 當前半段選完後，將其反轉拼回後半段，若原字串長度為奇數則把中間的單一字元夾在中間，得到最終的回文。
 *
 * 註：此實作使用 BigInt 處理組合計數以避免溢位，並利用逐位置貪心與組合數量的比例關係來快速決定第 k 個排列。
 */

// --- LeetCode 提供的程式碼模板 ---
function smallestPalindrome(s: string, k: number): string {
  const n = s.length;
  const halfLength = Math.floor(n / 2);

  const BASE_CHAR_CODE = 'a'.charCodeAt(0);
  const charCount: number[] = new Array(26).fill(0);
  for (const char of s) {
    charCount[char.charCodeAt(0) - BASE_CHAR_CODE]++;
  }

  let oddCount = 0;
  let middleChar = '';
  for (let i = 0; i < 26; i++) {
    if (charCount[i] % 2 === 1) {
      oddCount++;
      middleChar = String.fromCharCode(BASE_CHAR_CODE + i);
    }

    // 只需要保留一半的字符數量 因為只要生成前半段的回文即可
    charCount[i] = Math.floor(charCount[i] / 2);
  }

  if ((n % 2 === 0 && oddCount > 0) || (n % 2 === 1 && oddCount > 1)) {
    return '';
  }

  function nCr(total: number, r: number): bigint {
    if (r > total) return 0n;
    r = Math.min(r, total - r);
    let result = 1n;
    for (let i = 1; i <= r; i++) {
      result = (result * BigInt(total - i + 1)) / BigInt(i);
    }
    return result;
  }

  // 檢查是否有足夠的排列組合數量來滿足 k
  let totalPermutations = 1n;
  let remainingSlots = halfLength;
  for (const count of charCount) {
    if (count > 0) {
      totalPermutations *= nCr(remainingSlots, count);
      remainingSlots -= count;
    }
  }
  let targetK = BigInt(k);
  if (totalPermutations < targetK) {
    return '';
  }

  let leftHalfChars: string[] = new Array(halfLength);
  let remSlots = halfLength;
  let currentWays = totalPermutations;

  for (let i = 0; i < halfLength; i++) {
    for (let j = 0; j < 26; j++) {
      if (charCount[j] === 0) continue;

      // 利用數學比例 計算拿走字母 j 後的排列組合數量
      const ways = (currentWays * BigInt(charCount[j])) / BigInt(remSlots);

      if (targetK <= ways) {
        // 確定使用字母 j，並更新剩餘的排列組合數量
        charCount[j]--;
        remSlots--;
        currentWays = ways;
        leftHalfChars[i] = String.fromCharCode(BASE_CHAR_CODE + j);
        break;
      } else {
        // 清空使用字母 j 的排列組合數量，並減少目標 k
        targetK -= ways;
      }
    }
  }

  // 組合前半段與後半段
  const leftHalf = leftHalfChars.join('');
  let rightHalf = '';
  for (let i = halfLength - 1; i >= 0; i--) {
    rightHalf += leftHalfChars[i];
  }

  return n % 2 === 0 ? leftHalf + rightHalf : leftHalf + middleChar + rightHalf;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  k: number;
  answer: string;
}

const testCases: TestCase[] = [
  {
    s: 'abba',
    k: 2,
    answer: 'baab',
  },
  {
    s: 'aa',
    k: 2,
    answer: '',
  },
  {
    s: 'bacab',
    k: 1,
    answer: 'abcba',
  },
];

testCases.forEach(({ s, k, answer }, index) => {
  // TODO: 更改呼叫的函式名稱與上方模板一致
  const result = smallestPalindrome(s, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = "${s}", k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
