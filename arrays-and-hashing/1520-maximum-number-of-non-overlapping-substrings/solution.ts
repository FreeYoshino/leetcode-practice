/**
 * 題號：1520
 * 題目：Maximum Number of Non-Overlapping Substrings
 * 連結：https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/description/
 * 時間複雜度：O(n)
 * - 掃描字串建立每個字母的最左側與最右側位置需要 O(n)
 * - 擴展每個字母的合法區間最多檢查 26 個區間，每個區間最多掃描 O(n)，
 *   因此為 O(26n) = O(n)
 * - 將 26 個區間排序需要 O(26 log 26) = O(1)
 *
 * 空間複雜度：O(1)
 * - 使用固定大小的 segments 陣列儲存 26 個英文字母的區間
 * - 不計算回傳結果所需的空間
 *
 * 解題思路：
 * 1. 先記錄每個字母在字串中第一次與最後一次出現的位置，形成初始區間。
 * 2. 依序擴展每個初始區間；若區間內出現的字母有部分位置落在區間外，
 *    就將區間擴展到該字母的完整出現範圍，直到所有字母都完整包含在區間內。
 * 3. 將所有合法區間依右端點升序排列；右端點相同時，左端點較大的區間優先。
 * 4. 依排序結果貪心選擇與前一個區間不重疊的區間，即可得到最多的不重疊子字串。
 */

// 紀錄字母出現在字串中的最左邊與最右邊的位置
class segment {
  public left: number;
  public right: number;

  constructor() {
    this.left = -1;
    this.right = -1;
  }
}

// --- LeetCode 提供的程式碼模板 ---
function maxNumOfSubstrings(s: string): string[] {
  const n = s.length;

  const segments: segment[] = Array.from({ length: 26 }, () => new segment());
  for (let i = 0; i < n; i++) {
    const charIndex = s.charCodeAt(i) - 'a'.charCodeAt(0);

    if (segments[charIndex].left === -1) {
      segments[charIndex].left = i;
      segments[charIndex].right = i;
    } else {
      segments[charIndex].right = i;
    }
  }

  // 擴展合法區間(確保每個字母的區間都包含在合法區間內)
  for (let i = 0; i < 26; i++) {
    if (segments[i].left === -1) continue;

    let j = segments[i].left;
    while (j <= segments[i].right) {
      const charIndex = s.charCodeAt(j) - 'a'.charCodeAt(0);

      // 如果當前字母的區間不包含在合法區間內，則擴展合法區間
      if (
        segments[charIndex].left < segments[i].left ||
        segments[charIndex].right > segments[i].right
      ) {
        segments[i].left = Math.min(segments[i].left, segments[charIndex].left);
        segments[i].right = Math.max(
          segments[i].right,
          segments[charIndex].right,
        );

        // 重設j 檢查擴展後的區間
        j = segments[i].left;
      }

      j++;
    }
  }

  // 將每個合法區間排序(右端點升序 ， 左端點降序)
  segments.sort((a, b) => {
    if (a.right === b.right) {
      return b.left - a.left;
    }
    return a.right - b.right;
  });

  const result: string[] = [];
  let end = -1;
  for (const segment of segments) {
    const { left, right } = segment;
    if (left === -1) continue;

    if (left > end || end === -1) {
      result.push(s.slice(left, right + 1));
      end = right;
    }
  }
  return result;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: string[];
}

const testCases: TestCase[] = [
  {
    s: 'adefaddaccc',
    answer: ['e', 'f', 'ccc'],
  },
  {
    s: 'abbaccd',
    answer: ['d', 'bb', 'cc'],
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = maxNumOfSubstrings(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
