/**
 * 題號： 200
 * 標題： Number of Islands
 * 連結： https://leetcode.com/problems/number-of-islands/description/
 * 時間複雜度： O(m*n)
 * - m為grid 的行數 n為grid 的列數
 * - 利用雙重迴圈掃描整個gird 雖然加上了DFS 但每個格子最多被訪問兩次（第一次是掃描時 第二次是DFS時）所以時間複雜度為 O(m*n)
 * 空間複雜度： O(m*n)
 * - m為grid 的行數 n為grid 的列數
 * - 空間複雜度的消耗主要來至於DFS的遞迴call stack 在最壞的情況下 整個grid都為 '1' 形成一個巨大的島嶼 此時DFS的遞迴深度將達到 m*n 因此空間複雜度為 O(m*n)
 * 解題思路：
 * 1. 使用雙重迴圈的方式掃描整個grid 當遇到 '1' 時 就代表找到一個新的島嶼 將計數器加1
 * 2. 接著使用DFS的方式從該 '1' 開始掃描整個島嶼 將島嶼上的 '1' 都改成 '0' 以免重複計數
 * 3. 最後回傳計數器的值 就是島嶼的數量
 */

// DFS 掃描整塊島嶼 將島嶼上的 '1' 都改成 '0' 以免重複計數
function dfs(grid: string[][], i: number, j: number): void {
  if (
    i < 0 ||
    i >= grid.length ||
    j < 0 ||
    j >= grid[0].length ||
    grid[i][j] === '0'
  ) {
    return;
  }

  grid[i][j] = '0';
  dfs(grid, i - 1, j); // 上
  dfs(grid, i + 1, j); // 下
  dfs(grid, i, j - 1); // 左
  dfs(grid, i, j + 1); // 右
}

function numIslands(grid: string[][]): number {
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(grid, i, j);
      }
    }
  }
  return count;
}

// test case
interface TestCase {
  grid: string[][];
  answer: number;
}

const testCases: TestCase[] = [
  {
    grid: [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ],
    answer: 1,
  },
  {
    grid: [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1'],
    ],
    answer: 3,
  },
];

testCases.forEach(({ grid, answer }, index) => {
  const gridCopy = grid.map((row) => [...row]);
  const result = numIslands(gridCopy);

  console.log(`Case ${index + 1}:`);

  console.log(`Input: grid = [`);
  grid.forEach((row) => {
    console.log(` ${JSON.stringify(row)},`);
  });
  console.log(`]`);

  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
