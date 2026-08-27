/**
 * 題號：3720
 * 題目：Lexicographically Smallest Permutation Greater Than Target
 * 連結：https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target/description/
 * 時間複雜度：O(n)
 * - backtrack 最多沿著與 target 相等的路徑處理 n 個位置。
 * - 每個位置最多檢查 26 個小寫英文字母；因為字母種類固定為常數，總時間為 O(n)。
 * - 找到第一個比 target 大的字元後，剩餘字元會依字典序排列，不會再枚舉其他排列。
 *
 * 空間複雜度：O(n)
 * - resultArray 最多存放 n 個字元，遞迴呼叫堆疊深度也最多為 n。
 * - freqS 僅記錄 26 個小寫英文字母的出現次數，屬於常數空間。
 *
 * 解題思路：
 * 1. 使用 freqS 統計 s 中每個小寫英文字母的出現次數，並從 target 的第一個位置開始建立答案。
 * 2. 優先嘗試使用與 target[index] 相同的字元，讓目前的字首盡量維持相同。
 * 3. 如果無法完成與 target 相同的後綴，則嘗試使用比 target[index] 大的最小字元，讓答案在這個位置第一次變大。
 * 4. 一旦前面的字首已經大於 target，剩餘字元直接依字典序由小到大放入，即可得到最小排列。
 * 5. 若所有位置都只能與 target 相同，代表沒有嚴格大於 target 的排列，返回空字串。
 */

// --- LeetCode 提供的程式碼模板 ---
function lexGreaterPermutation(s: string, target: string): string {
  const n = s.length;

  const freqS: number[] = new Array(26).fill(0);
  for (const char of s) {
    freqS[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  const resultArray: string[] = [];
  // index: 當前處理的字元位置
  // isGreater: 是否已經確定前面的字元組合大於 target
  const backtrack = (index: number, isGreater: boolean): boolean => {
    if (index === n) return isGreater;

    if (isGreater) {
      // 已經確定前面的字元組合大於 target ， 剩餘的直接由小到大排列
      for (let i = 0; i < 26; i++) {
        if (freqS[i] > 0) {
          resultArray.push(String.fromCharCode(i + 'a'.charCodeAt(0)));
          freqS[i]--;

          if (backtrack(index + 1, true)) return true;

          // 回溯
          resultArray.pop();
          freqS[i]++;
        }
      }
    }

    // 嘗試使用 target[index] 的字元
    const targetCharIndex = target[index].charCodeAt(0) - 'a'.charCodeAt(0);
    if (freqS[targetCharIndex] > 0) {
      resultArray.push(target[index]);
      freqS[targetCharIndex]--;

      if (backtrack(index + 1, isGreater)) return true;

      // 回溯
      resultArray.pop();
      freqS[targetCharIndex]++;
    }

    // 嘗試使用比 target[index] 大的字元
    for (let i = targetCharIndex + 1; i < 26; i++) {
      if (freqS[i] > 0) {
        resultArray.push(String.fromCharCode(i + 'a'.charCodeAt(0)));
        freqS[i]--;

        if (backtrack(index + 1, true)) return true;

        // 回溯
        resultArray.pop();
        freqS[i]++;
      }
    }

    // 如果沒有找到符合條件的字元組合，返回 false
    return false;
  };

  if (backtrack(0, false)) return resultArray.join('');

  // 如果沒有找到符合條件的字元組合，返回空字串
  return '';
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  target: string;
  answer: string;
}

const testCases: TestCase[] = [
  {
    s: 'abc',
    target: 'bba',
    answer: 'bca',
  },
  {
    s: 'leet',
    target: 'code',
    answer: 'eelt',
  },
  {
    s: 'baba',
    target: 'bbaa',
    answer: '',
  },
];

testCases.forEach(({ s, target, answer }, index) => {
  const result = lexGreaterPermutation(s, target);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: s = ${JSON.stringify(s)}, target = ${JSON.stringify(target)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
