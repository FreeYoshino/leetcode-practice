/**
 * 題號：835
 * 題目：Image Overlap
 * 連結：https://leetcode.com/problems/image-overlap/description/
 * 時間複雜度：O(n^4)
 * - 掃描兩個 n x n 矩陣建立 1 的座標需要 O(n^2)
 * - 枚舉兩個影像中所有 1 的座標配對，最多有 O(n^2) * O(n^2) = O(n^4) 組
 *
 * 空間複雜度：O(n^2)
 * - positions1 與 positions2 最多各儲存 O(n^2) 個座標
 * - dx 與 dy 各有 O(n) 種可能值，因此 countMap 最多儲存 O(n^2) 種位移組合
 *
 * 解題思路：
 * 1. 蒐集 img1 與 img2 中所有值為 1 的像素座標。
 * 2. 依序配對兩個影像中的 1，計算讓 img1 的像素對齊 img2 像素所需的位移量。
 * 3. 使用 countMap 統計每種位移量出現的次數；同一位移下對齊的像素越多，重疊數越大。
 * 4. 回傳所有位移量中出現次數的最大值。
 */

// --- LeetCode 提供的程式碼模板 ---
function largestOverlap(img1: number[][], img2: number[][]): number {
  const n = img1.length;

  const positions1: [number, number][] = [];
  const positions2: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (img1[i][j] === 1) {
        positions1.push([i, j]);
      }
      if (img2[i][j] === 1) {
        positions2.push([i, j]);
      }
    }
  }

  const countMap = new Map<string, number>();
  let maxOverlap = 0;
  for (const [x1, y1] of positions1) {
    for (const [x2, y2] of positions2) {
      const [dx, dy] = [x2 - x1, y2 - y1];
      const key = `${dx},${dy}`;

      const newCount = (countMap.get(key) || 0) + 1;
      countMap.set(key, newCount);
      maxOverlap = Math.max(maxOverlap, newCount);
    }
  }

  return maxOverlap;
}

// --- 測試案例 ---
interface TestCase {
  img1: number[][];
  img2: number[][];
  answer: number;
}

const testCases: TestCase[] = [
  {
    img1: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    img2: [
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    answer: 3,
  },
  {
    img1: [[1]],
    img2: [[1]],
    answer: 1,
  },
  {
    img1: [[0]],
    img2: [[0]],
    answer: 0,
  },
];

testCases.forEach(({ img1, img2, answer }, index) => {
  const result = largestOverlap(img1, img2);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: img1 = ${JSON.stringify(img1)}, img2 = ${JSON.stringify(img2)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
