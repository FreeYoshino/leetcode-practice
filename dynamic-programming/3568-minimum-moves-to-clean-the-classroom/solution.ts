/**
 * 題號：3568
 * 題目：Minimum Moves to Clean the Classroom
 * 連結：https://leetcode.com/problems/minimum-moves-to-clean-the-classroom/description/
 * 時間複雜度：O(m * n * 2^k)
 * - m × n 是棋盤中的格子數量，k 是垃圾總數。
 * - 狀態可以視為 (row, col, mask)，其中 mask 表示目前已收集到哪些垃圾，總狀態數為 m × n × 2^k。
 * - 每個狀態最多向 4 個方向擴展，並且使用 dp 來避免重複計算，總時間為 O(m * n * 2^k)。
 *
 * 空間複雜度：O(m * n * 2^k)
 * - dp 陣列儲存每個狀態的最佳剩餘能量，大小為 m × n × 2^k。
 * - BFS 隊列中也可能同時存放大量狀態，因此空間複雜度仍為 O(m * n * 2^k)。
 *
 * 解題思路：
 * 1. 先掃描整個教室，找出起點 S、所有垃圾 L。
 * 2. 將每個垃圾依序編號，並用 bitmask 表示「哪些垃圾已經收集過」。
 *    例如 mask = 101 表示已收集第 0 個與第 2 個垃圾。
 * 3. 將狀態定義為 (row, col, mask)，表示在某一格、且目前收集到的垃圾集合為 mask。
 * 4. 從起點開始做 BFS，並維護一個 dp[row][col][mask]，記錄在這個狀態下可保留的最大剩餘能量。
 *    若同一狀態出現更高的剩餘能量，才需要更新並繼續擴展。
 * 5. 每次移動到相鄰格子時：
 *    - 消耗 1 點能量；
 *    - 若移到 R，則將剩餘能量重置為初始 energy；
 *    - 若移到垃圾 L，則將對應 bit 加到 mask。
 * 6. 當某個狀態的 mask 等於全部垃圾的 mask（也就是全部垃圾都收集完）時，
 *    便代表已找到最少步數的解，直接返回當前步數。
 * 7. 若 BFS 完整跑完仍無法達成目標，則返回 -1。
 */

// --- LeetCode 提供的程式碼模板 ---
function minMoves(classroom: string[], energy: number): number {
  const m = classroom.length;
  const n = classroom[0].length;

  // 找到起點和垃圾位置
  let startRow = -1;
  let startCol = -1;
  const litterPositions: [number, number][] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (classroom[i][j] === 'S') {
        startRow = i;
        startCol = j;
      }
      if (classroom[i][j] === 'L') {
        litterPositions.push([i, j]);
      }
    }
  }

  // 使用 bitmask 來表示垃圾的收集狀態
  const litterCount = litterPositions.length;
  const targetMask = (1 << litterCount) - 1;
  if (litterCount === 0) return 0; // 沒有垃圾需要收集

  // 建立垃圾位置到索引的map
  const litterIndexMap = new Map<string, number>();
  for (let i = 0; i < litterCount; i++) {
    const [row, col] = litterPositions[i];
    litterIndexMap.set(`${row},${col}`, i);
  }

  const totalMask = 1 << litterCount;

  // 扁平化 3D DP 陣列為 1D 陣列 記錄在[i][j][mask]的剩餘最大能量
  const dp: number[] = new Array(m * n * totalMask).fill(-1);

  // BFS 初始化
  const queueRow: number[] = [startRow];
  const queueCol: number[] = [startCol];
  const queueMask: number[] = [0];
  const queueEnergy: number[] = [energy];
  const queueSteps: number[] = [0];

  const startIndex = (startRow * n + startCol) * totalMask;
  dp[startIndex] = energy;

  const directions = [
    [0, 1], // 右
    [1, 0], // 下
    [0, -1], // 左
    [-1, 0], // 上
  ];

  let head = 0;
  while (head < queueRow.length) {
    const row = queueRow[head];
    const col = queueCol[head];
    const mask = queueMask[head];
    const remainingEnergy = queueEnergy[head];
    const steps = queueSteps[head];
    head++;

    if (mask === targetMask) {
      return steps; // 已經收集到所有垃圾
    }

    if (remainingEnergy <= 0) continue; // 沒有剩餘能量，無法移動

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // 檢查邊界條件
      if (
        newRow < 0 ||
        newRow >= m ||
        newCol < 0 ||
        newCol >= n ||
        classroom[newRow][newCol] === 'X'
      )
        continue;

      let nextEnergy = remainingEnergy - 1; // 移動消耗能量
      let nextMask = mask;

      // 'R' 重製能量
      if (classroom[newRow][newCol] === 'R') nextEnergy = energy;

      // 'L' 收集垃圾
      const litterIndex = litterIndexMap.get(`${newRow},${newCol}`);
      if (litterIndex !== undefined) {
        nextMask |= 1 << litterIndex;
      }

      // 檢查是否能以更高的剩餘能量到達這個狀態
      const stateIndex = (newRow * n + newCol) * totalMask + nextMask;
      if (nextEnergy > dp[stateIndex]) {
        dp[stateIndex] = nextEnergy;
        queueRow.push(newRow);
        queueCol.push(newCol);
        queueMask.push(nextMask);
        queueEnergy.push(nextEnergy);
        queueSteps.push(steps + 1);
      }
    }
  }

  return -1;
}

// --- 測試案例 ---
interface TestCase {
  classroom: string[];
  energy: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    classroom: ['S.', 'XL'],
    energy: 2,
    answer: 2,
  },
  {
    classroom: ['LS', 'RL'],
    energy: 4,
    answer: 3,
  },
  {
    classroom: ['L.S', 'RXL'],
    energy: 3,
    answer: -1,
  },
];

testCases.forEach(({ classroom, energy, answer }, index) => {
  const result = minMoves(classroom, energy);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: classroom = ${JSON.stringify(classroom)}, energy = ${energy}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
