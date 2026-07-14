/**
 * 題號： 51
 * 題目： N-Queens
 * 連結： https://leetcode.com/problems/n-queens/description/
 * 時間複雜度：O(n!)
 * - 第 0 列有 n 種放法，第 1 列最多剩下 n - 1 種，以此類推，整體搜尋空間可視為排列層級
 * - 雖然實際上會因為對角線衝突而大量剪枝，但最壞情況下仍可用 O(n!) 來描述回溯搜尋成本
 * - 每找到一組合法解時，還需要將 queens 陣列轉回棋盤表示，成本為 O(n^2)
 * 空間複雜度：O(n)
 * - col、mainDiagonal、antiDiagonal 與 queens 都是長度與 n 成正比的輔助陣列
 * - 遞迴深度最多只有 n 層，額外使用的呼叫堆疊也是 O(n)
 * - 另外 result 會依據題目輸出所有合法棋盤，若把輸出也算進去會依答案數量而增加
 * 解題思路：
 * - 使用回溯法逐列放置皇后，每次只處理目前這一列，並嘗試把皇后放在每個可能的欄位
 * - 為了快速判斷是否合法，使用三個布林陣列紀錄欄位、主對角線、副對角線是否已經有皇后
 * - 若某個位置與已放置的皇后衝突，就直接跳過；若可以放置，就先標記狀態，再往下一列遞迴
 * - 當成功放滿 n 列時，代表找到一組合法解，再根據 queens 陣列重建整個棋盤加入結果
 */

class Solution {
  solveNQueens(n: number): string[][] {
    const result: string[][] = [];

    // 紀錄3個方向是否有皇后
    const col: boolean[] = new Array(n).fill(false);
    const mainDiagonal: boolean[] = new Array(2 * n - 1).fill(false);
    const antiDiagonal: boolean[] = new Array(2 * n - 1).fill(false);

    let queens: number[] = new Array(n).fill(-1); // queens[i] 表示第 i 列皇后放置的列索引

    // 利用回溯法解題
    const backtrack = (row: number) => {
      // 當 row === n 時 代表已經放置完所有皇后 將結果加入 result
      if (row === n) {
        // 根據 queens 陣列的值重建棋盤表示
        const board: string[] = new Array(n).fill('.'.repeat(n));
        for (let i = 0; i < n; i++) {
          const colIndex = queens[i];
          board[i] =
            board[i].substring(0, colIndex) +
            'Q' +
            board[i].substring(colIndex + 1);
        }

        result.push(board);
        return;
      }

      // 嘗試在每一行放置皇后
      for (let colIndex = 0; colIndex < n; colIndex++) {
        const mainDiagonalIndex = row - colIndex + n - 1; // (row - colIndex) + (n - 1) 用於將索引轉換為非負數
        const antiDiagonalIndex = row + colIndex;

        // 檢查是否可以放置皇后
        if (
          col[colIndex] ||
          mainDiagonal[mainDiagonalIndex] ||
          antiDiagonal[antiDiagonalIndex]
        ) {
          continue;
        }

        // 放置皇后
        queens[row] = colIndex;
        col[colIndex] = true;
        mainDiagonal[mainDiagonalIndex] = true;
        antiDiagonal[antiDiagonalIndex] = true;

        // 往下尋找下一列
        backtrack(row + 1);

        // 回溯
        queens[row] = -1;
        col[colIndex] = false;
        mainDiagonal[mainDiagonalIndex] = false;
        antiDiagonal[antiDiagonalIndex] = false;
      }
    };

    // 從第 0 列開始放置皇后
    backtrack(0);
    return result;
  }
}

interface TestCase {
  n: number;
  answer: string[][];
}

const testCases: TestCase[] = [
  {
    n: 4,
    answer: [
      ['.Q..', '...Q', 'Q...', '..Q.'],
      ['..Q.', 'Q...', '...Q', '.Q..'],
    ],
  },
  {
    n: 1,
    answer: [['Q']],
  },
];

testCases.forEach(({ n, answer }, index) => {
  const solution = new Solution();
  const result = solution.solveNQueens(n);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: n = ${n}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
