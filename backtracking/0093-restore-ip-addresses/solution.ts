/**
 * 題號： 93
 * 題目： Restore IP Addresses
 * 連結： https://leetcode.com/problems/restore-ip-addresses/description/
 * 時間複雜度：O(3^4) = O(1)
 * - IP 位址固定只會切成 4 段，每一段最多嘗試 3 種長度
 * - 雖然回溯會展開多個分支，但因為輸入字串長度最多只有 12，整體搜尋空間是固定上限
 * - 每找到一組合法解時，只需要將 4 段組合成字串，成本也是固定的
 * 空間複雜度：O(4) = O(1)
 * - 遞迴深度最多只有 4 層，path 也最多存 4 段 IP 區間
 * - 其餘使用的額外空間為固定常數
 * 解題思路：
 * - 使用回溯逐步切出 IP 位址的 4 個區段，每次嘗試切 1 到 3 個字元
 * - 每個區段必須符合兩個條件：
 *   1. 不能有前導零，除非該段本身就是 0
 *   2. 數值必須落在 0 到 255 之間
 * - 當 path 累積到 4 段時，只有在剛好用完整個字串的情況下才算合法答案
 * - 透過回溯不斷嘗試與撤銷選擇，找出所有可能的合法 IP 組合
 */

class Solution {
  restoreIpAddresses(s: string): string[] {
    const result: string[] = [];
    const path: string[] = [];

    const backtrack = (startIndex: number) => {
      if (path.length === 4 && startIndex === s.length) {
        result.push(path.join('.'));
        return;
      }

      // 3種長度的切割
      for (let len = 1; len <= 3; len++) {
        // 超過字串長度就break
        if (startIndex + len > s.length) break;

        const segment = s.substring(startIndex, startIndex + len);

        // 檢查是否有效
        if (this.isValidSegment(segment)) {
          path.push(segment);
          backtrack(startIndex + len);
          path.pop();
        }
      }
    };

    backtrack(0);
    return result;
  }

  private isValidSegment(segment: string): boolean {
    // 檢查是否為空字串
    if (segment.length === 0) return false;

    // 檢查是否有前導零
    if (segment.length > 1 && segment[0] === '0') return false;

    // 檢查是否在0-255範圍內
    const num = parseInt(segment, 10);
    return num >= 0 && num <= 255;
  }
}

interface TestCase {
  s: string;
  answer: string[];
}

const testCases: TestCase[] = [
  {
    s: '25525511135',
    answer: ['255.255.11.135', '255.255.111.35'],
  },
  {
    s: '0000',
    answer: ['0.0.0.0'],
  },
  {
    s: '101023',
    answer: ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3'],
  },
];

testCases.forEach(({ s, answer }, index) => {
  const solution = new Solution();
  const result = solution.restoreIpAddresses(s);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${s}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
