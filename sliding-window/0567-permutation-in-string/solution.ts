/**
 * 題號： 567
 * 標題： Permutation in String
 * 連結： https://leetcode.com/problems/permutation-in-string/description/
 * 時間複雜度： O(n)
 * - n 為s2的長度
 * - 第一個迴圈跑了s1的長度 第二個迴圈跑了(s2長度 - s1長度)
 * - counts.every() 掃描陣列 但因為長度是固定為26 因此為O(1)
 * - 因此最終時間複雜度為O(n)
 * 空間複雜度： O(1)
 * - counts陣列的大小固定為26 不受輸入字串的影響 因此空間複雜度為O(1)
 * 解題思路： 使用sliding window 的技巧 在s2中維護一個window長度等於s1.length 的window 並利用出現頻率相等代表相減為0的特性來判斷 該window是否符合要求
 * 1. 開頭得先進行邊界防護 預防s1.length > s2.length的情況
 * 2. 宣告一個固定長度為26 的陣列 來記錄s1 、 window 的頻率差異
 * 3. 初始遍歷長度為s1.length的字元 將s1出現的字元頻率+1 s2出現的字原則頻率-1
 * 4. 開始滑動固定大小的window
 *    - 每次滑動前先檢查counts陣列的所有元素是否都為0 若是 回傳true
 *    - windwo 向右滑動將新進入的字元頻率-1
 *    - left 指標處被移出的字元頻率+1 並向前移動(left++)
 * 5. 迴圈結束後 檢查最後一個window是否符合條件
 */

function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const counts = Array.from({ length: 26 }, () => 0);
  const base = 'a'.charCodeAt(0);

  for (let i = 0; i < s1.length; i++) {
    counts[s1.charCodeAt(i) - base]++;
    counts[s2.charCodeAt(i) - base]--;
  }

  // 永遠保持窗口大小與s1長度相等
  let left = 0;
  for (let right = s1.length; right < s2.length; right++) {
    if (counts.every((count) => count === 0)) return true;

    counts[s2.charCodeAt(right) - base]--;
    counts[s2.charCodeAt(left++) - base]++;
  }
  if (counts.every((count) => count === 0)) return true;
  return false;
}

// test case
interface TestCase {
  s1: string;
  s2: string;
  answer: boolean;
}

const testCases: TestCase[] = [
  { s1: 'ab', s2: 'eidbaooo', answer: true },
  { s1: 'ab', s2: 'eidboaoo', answer: false },
];

testCases.forEach((tc, index) => {
  const result = checkInclusion(tc.s1, tc.s2);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: s1 = '${tc.s1}', s2 = '${tc.s2}'`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
