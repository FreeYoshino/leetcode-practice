/**
 * 題號： 79
 * 題目： Word Search
 * 連結： https://leetcode.com/problems/word-search/description/
 * 時間複雜度：O(m * n * 4^L)
 * - 先把 board 上每個格子都當作起點嘗試，最多會有 m * n 個起點。
 * - DFS / 回溯在每一步最多往四個方向擴展，但因為不能走回頭路，
 *   除了第一步外，後續每層實際分支大約是 3。
 * - 在最壞情況下會把所有可能路徑都搜尋一遍，若把字串長度記為 L，
 *   整體可以視為 O(m * n * 4^L)。
 * 空間複雜度：O(L)
 * - 回溯遞迴的最深深度只會到字串長度 L。
 * - 另外只需要幾個暫存變數來標記走訪狀態，額外空間是 O(L)。
 * 解題思路：
 * - 逐一嘗試 board 中每個格子作為起點，只有字元等於 word[0] 時才值得開始搜尋。
 * - 使用 DFS 搭配回溯，從目前格子往上下左右四個方向繼續找下一個字元。
 * - 走訪過的格子先暫時改成特殊字元，避免同一條路徑重複使用同一格。
 * - 如果某條路徑成功找到整個 word，就直接回傳 true；全部起點都嘗試過仍失敗，就回傳 false。
 */

class Solution {
  directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ];
  exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;

    const backtrack = (row: number, col: number, index: number): boolean => {
      if (index === word.length) {
        return true;
      }

      // 檢查邊界 和 是否符合目標字元
      if (
        row < 0 ||
        row >= rows ||
        col < 0 ||
        col >= cols ||
        board[row][col] !== word[index]
      ) {
        return false;
      }

      // 標記已經走過的路徑
      const temp = board[row][col];
      board[row][col] = '#';

      // 查找鄰近的格子
      for (const [dx, dy] of this.directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (backtrack(newRow, newCol, index + 1)) {
          return true;
        }
      }

      // 回溯，恢復原本的格子值
      board[row][col] = temp;

      return false;
    };

    // 尋找起始點 並開始回溯
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col] === word[0]) {
          if (backtrack(row, col, 0)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}

interface TestCase {
  board: string[][];
  word: string;
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    board: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    word: 'ABCCED',
    answer: true,
  },
  {
    board: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    word: 'SEE',
    answer: true,
  },
  {
    board: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    word: 'ABCB',
    answer: false,
  },
];

testCases.forEach(({ board, word, answer }, index) => {
  const sol = new Solution();
  const result = sol.exist(board, word);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: board = ${JSON.stringify(board)}, word = "${word}"`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
