/**
 * 題號：3963
 * 題目：Create Grid With Exactly One Path
 * 連結：https://leetcode.com/problems/create-grid-with-exactly-one-path/description/
 * 時間複雜度：O(mn)
 * - 建立第一列長度為 n 的字串需要 O(n)
 * - 建立其餘 m - 1 列，每列都需要建立長度為 n 的字串，
 *   總共需要 O(mn)
 *
 * 空間複雜度：O(n)
 * - 使用了一個長度為 n 的字串來表示障礙物行，佔用 O(n) 空間
 *
 * 解題思路：
 * 1. 將第一列全部設為可通行的 `.`，讓路徑可以從左上角沿著第一列向右移動。
 * 2. 將其餘每一列先設為前 n - 1 個位置不可通行的 `#`，
 *    只保留最右側位置為可通行的 `.`。
 * 3. 如此一來，路徑只能先走完第一列，再沿著最右側欄位向下，
 *    不會有其他可選擇的分支，因此恰好只有一條路徑。
 */

// --- LeetCode 提供的程式碼模板 ---
function createGrid(m: number, n: number): string[] {
  const grid: string[] = new Array(m);
  grid[0] = '.'.repeat(n);

  const obstacleRow: string = '#'.repeat(n - 1) + '.';
  for (let i = 1; i < m; i++) {
    grid[i] = obstacleRow;
  }

  return grid;
}

// --- 測試案例 ---
interface TestCase {
  m: number;
  n: number;
  answer: string[];
}

const testCases: TestCase[] = [
  {
    m: 2,
    n: 3,
    answer: ['..#', '#..'],
  },
  {
    m: 3,
    n: 3,
    answer: ['..#', '#..', '##.'],
  },
  {
    m: 1,
    n: 4,
    answer: ['....'],
  },
];

testCases.forEach(({ m, n, answer }, index) => {
  const result = createGrid(m, n);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: m = ${m}, n = ${n}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('Note: 此題有多組正確解答，實際輸出可能與 Expected 不同。');
  console.log('-----------------------------');
});
