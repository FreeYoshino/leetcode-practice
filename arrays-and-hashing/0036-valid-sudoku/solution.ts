/**
 * 題號： 36
 * 標題： Valid Sudoku
 * 連結： https://leetcode.com/problems/valid-sudoku/description/
 * 時間複雜度: O(1)
 * - 因為題目定義的board 大小為常數 所以運算次數永遠都是9*9次 因此時間複雜度為O(1)
 * 空間複雜度: O(1)
 * - 同時間複雜度 最多就是建立 3*9 個 Set 每個Set最多裝9個數字 因此所需的記憶體空間是固定的 空間複雜度為O(1)
 * 解題思路:
 */

function isValidSudoku(board: string[][]): boolean {
  // 使用3個 Set 來分別判斷 row 、 col 、 grid 是否有重複的digit
  const rows: Set<string>[] = Array.from(
    { length: 9 },
    () => new Set<string>(),
  );
  const cols: Set<string>[] = Array.from(
    { length: 9 },
    () => new Set<string>(),
  );
  const boxes: Set<string>[] = Array.from(
    { length: 9 },
    () => new Set<string>(),
  );

  // 遍歷整個 board(9*9)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const digit = board[i][j];

      // 遇到空值跳過
      if (digit === '.') continue;

      // 利用 i 、 j 整除於3 後的值 做運算取得對應的 boxIndex(0~8)
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      // 檢查是否存在於對應的Set中
      if (rows[i].has(digit)) return false;
      if (cols[j].has(digit)) return false;
      if (boxes[boxIndex].has(digit)) return false;

      rows[i].add(digit);
      cols[j].add(digit);
      boxes[boxIndex].add(digit);
    }
  }

  return true;
}

// test case
interface TestCase {
  board: string[][];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    board: [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ],
    answer: true,
  },
  {
    board: [
      ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ],
    answer: false,
  },
];

testCases.forEach((tc, index) => {
  const result = isValidSudoku(tc.board);

  console.log(`Case: ${index + 1}`);
  console.log(`Input: board = [`);
  tc.board.forEach((row, rowIndex) => {
    console.log(`${JSON.stringify(row)}`);
  });
  console.log(`]`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
