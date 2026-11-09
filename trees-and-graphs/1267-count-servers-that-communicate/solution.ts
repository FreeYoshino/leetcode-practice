/**
 * 題號：1267
 * 題目：Count Servers that Communicate
 * 連結：https://leetcode.com/problems/count-servers-that-communicate/description/
 * 時間複雜度：O(mn)
 *
 * 空間複雜度：O(1)
 * - 只使用固定數量的變數記錄計數、索引與結果
 *
 * 解題思路：
 * 1. 逐列統計伺服器數量，並記錄該列唯一伺服器所在的欄位。
 * 2. 若該列有兩台以上伺服器，這些伺服器都能透過同列互相通訊，直接計入結果。
 * 3. 若該列只有一台伺服器，再檢查同一欄是否有其他伺服器；若有，代表它能透過同欄通訊。
 * 4. 將所有能與其他伺服器在同列或同欄通訊的伺服器數量加總後回傳。
 */

// --- LeetCode 提供的程式碼模板 ---
function countServers(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  let result = 0;

  for (let i = 0; i < m; i++) {
    let count = 0;
    let lastIndex = -1;
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        count++;
        lastIndex = j;
      }
    }

    if (count > 1 && lastIndex !== -1) result += count;
    else if (count === 1) {
      for (let row = 0; row < m; row++) {
        if (row !== i && grid[row][lastIndex] === 1) {
          result++;
          break;
        }
      }
    }
  }

  return result;
}

// --- 測試案例 ---
interface TestCase {
  grid: number[][];
  answer: number;
}

const testCases: TestCase[] = [
  {
    grid: [
      [1, 0],
      [0, 1],
    ],
    answer: 0,
  },
  {
    grid: [
      [1, 0],
      [1, 1],
    ],
    answer: 3,
  },
  {
    grid: [
      [1, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ],
    answer: 4,
  },
];

testCases.forEach(({ grid, answer }, index) => {
  const result = countServers(grid);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: grid = ${JSON.stringify(grid)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
