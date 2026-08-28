/**
 * 題號：3734
 * 題目：Lexicographically Smallest Palindromic Permutation Greater Than Target
 * 連結：https://leetcode.com/problems/lexicographically-smallest-palindromic-permutation-greater-than-target/description/
 * 時間複雜度：O(n)
 * - 統計字元頻率與判斷奇數次數的迴圈，因為字母種類固定為 26，耗時為 O(n)。
 * - backtrack 最多沿著與 target 前半部相等的路徑處理 n / 2 個位置。
 * - 找到第一個比 target 大的字元後，剩餘位置會依字典序填入最小字元，不會再枚舉其他排列。
 * - 建立完整回文時需要組合前後半部，耗時最多為 O(n)，因此總時間為 O(n)。
 *
 * 空間複雜度：O(n)
 * - half 最多存放 n / 2 個字元，遞迴呼叫堆疊深度也最多為 n / 2。
 * - 建立完整回文時會額外產生長度為 n 的字串，整體額外空間為 O(n)。
 * - freqS 僅記錄 26 個小寫英文字母的出現次數，屬於常數空間。
 *
 * 解題思路：
 * 1. 使用 freqS 統計 s 中每個字元的出現次數，確認最多只能有一種字元出現奇數次，並取出回文的中間字元。
 * 2. 將每個字元的出現次數除以二，只在回溯中建立回文的前半部分；後半部分由前半部反轉取得。
 * 3. 優先嘗試使用與 target[index] 相同的字元，讓目前的前綴盡量維持相同。
 * 4. 若無法完成相同前綴，則嘗試使用比 target[index] 大的最小字元；一旦前半部變大，剩餘字元依字典序填入即可得到最小回文。
 * 5. 完成前半部後組合完整回文並檢查是否大於 target；若不存在符合條件的回文，返回空字串。
 */

// --- LeetCode 提供的程式碼模板 ---
function lexPalindromicPermutation(s: string, target: string): string {
  const n = s.length;
  const freqS: number[] = new Array(26).fill(0);
  for (const char of s) {
    freqS[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  // 判斷是否可以形成回文
  let oddCount = 0;
  let middleChar = '';
  for (let i = 0; i < 26; i++) {
    const count = freqS[i];
    if (count % 2 !== 0) {
      oddCount++;
      middleChar = String.fromCharCode(i + 'a'.charCodeAt(0));
    }

    freqS[i] = Math.floor(count / 2);
  }
  if (oddCount > 1) return '';

  // 生成回文的前半部分
  const m = Math.floor(n / 2);
  const half: string[] = [];
  let result = '';
  const backtrack = (index: number, isGreater: boolean): boolean => {
    if (index === m) {
      // 當長度達到回文的一半時，檢查是否大於 target
      const frontHalf = half.join('');
      const backHalf = [...half].reverse().join('');
      const fullPalindrome =
        frontHalf + (middleChar ? middleChar : '') + backHalf;

      if (fullPalindrome > target) {
        result = fullPalindrome;
        return true;
      }
      return false;
    }

    if (isGreater) {
      // 當前面的部分已經大於 target，則可以選擇最小的字元填滿剩餘部分
      for (let i = 0; i < 26; i++) {
        if (freqS[i] > 0) {
          const char = String.fromCharCode(i + 'a'.charCodeAt(0));
          half.push(char);
          freqS[i]--;
          if (backtrack(index + 1, true)) return true;

          // 回溯
          half.pop();
          freqS[i]++;
        }
      }
    }

    // 嘗試使用與 target 相同的字元
    const targetChar = target[index];
    const targetCharIndex = targetChar.charCodeAt(0) - 'a'.charCodeAt(0);
    if (freqS[targetCharIndex] > 0) {
      half.push(targetChar);
      freqS[targetCharIndex]--;
      if (backtrack(index + 1, isGreater)) return true;

      // 回溯
      half.pop();
      freqS[targetCharIndex]++;
    }

    // 嘗試使用比 target 字元大的字元
    for (let i = targetCharIndex + 1; i < 26; i++) {
      if (freqS[i] > 0) {
        const char = String.fromCharCode(i + 'a'.charCodeAt(0));
        half.push(char);
        freqS[i]--;
        if (backtrack(index + 1, true)) return true;

        // 回溯
        half.pop();
        freqS[i]++;
      }
    }

    return false;
  };

  backtrack(0, false);
  return result;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  target: string;
  answer: string;
}

const testCases: TestCase[] = [
  {
    s: 'baba',
    target: 'abba',
    answer: 'baab',
  },
  {
    s: 'baba',
    target: 'bbaa',
    answer: '',
  },
  {
    s: 'abc',
    target: 'abb',
    answer: '',
  },
  {
    s: 'aac',
    target: 'abb',
    answer: 'aca',
  },
];

testCases.forEach(({ s, target, answer }, index) => {
  const result = lexPalindromicPermutation(s, target);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: s = ${JSON.stringify({ s })}, target = ${JSON.stringify({ target })}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
