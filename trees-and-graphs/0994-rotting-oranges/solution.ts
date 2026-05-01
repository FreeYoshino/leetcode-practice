/**
 * 題號： 994
 * 標題： Rotting Oranges
 * 連結： https://leetcode.com/problems/rotting-oranges/description/
 * 時間複雜度： O(m*n)
 * - m為grid的列數 n為grid的行數
 * - 第一步驟掃描整個grid 花費O(m*n)的時間
 * - 第二步驟使用BFS模擬腐爛過程 最壞情況下每個橘子都會被腐爛一次 因此花費O(m*n)的時間
 * 空間複雜度： O(m*n)
 * - 空間複雜度的主要消耗來自於queue 在最壞的情況下所有的橘子都會被加入queue 因此空間複雜度為O(m*n)
 * 解題思路：
 * 1. 首先掃描整個grid陣列 將所有腐爛橘子加入queue 並且計算新鮮橘子的數量
 * 2. 使用BFS模擬腐爛過程 每次從queue中取出一個腐爛橘子 並將其相鄰的新鮮橘子腐爛 同時將新腐爛的橘子加入queue
 * 3. 每次完成一輪BFS 將minutes++ 當queue為空或沒有新鮮橘子時結束
 * 4. 最後如果還有新鮮橘子則返回-1 否則返回minutes
 */

function orangesRotting(grid: number[][]): number {
  let minutes = 0;
  const queue: number[][] = [];
  let freshCount = 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ];

  // 掃描整個grid 將腐爛的橘子加入queue 並計算新鮮橘子的數量
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i][j];
      if (cell === 2) {
        queue.push([i, j]);
      } else if (cell === 1) {
        freshCount++;
      }
    }
  }

  // 使用BFS模擬腐爛過程
  while (queue.length > 0 && freshCount > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift()!;

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newX < rows &&
          newY >= 0 &&
          newY < cols &&
          grid[newX][newY] === 1
        ) {
          grid[newX][newY] = 2;
          queue.push([newX, newY]);
          freshCount--;
        }
      }
    }

    minutes++;
  }

  return freshCount > 0 ? -1 : minutes;
}

// test case
interface TestCase {
  grid: number[][];
  answer: number;
}

const testCases: TestCase[] = [
  {
    grid: [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ],
    answer: 4,
  },
  {
    grid: [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ],
    answer: -1,
  },
  {
    grid: [[0, 2]],
    answer: 0,
  },
];

testCases.forEach(({ grid, answer }, index) => {
  const gridCopy = grid.map((row) => [...row]);
  const result = orangesRotting(gridCopy);

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
