/**
 * 題號：1569
 * 題目：Number of Ways to Reorder Array to Get Same BST
 * 連結：https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/description/
 * 時間複雜度： O(n^2)
 * 空間複雜度： O(n^2)
 * 解題思路：
 * 1. 先使用巴斯卡三角形預處理組合數 C(n, k)，讓 DFS 能在 O(1) 時間取得
 *    左右子樹元素的交錯排列數。
 * 2. 以陣列第一個元素作為目前子樹的根節點，將其餘元素分成左子樹與右子樹。
 * 3. 左右子樹的元素必須各自維持原本的相對順序，因此只需要從剩餘位置中選出
 *    左子樹所需的位置，其數量為 C(leftSize + rightSize, leftSize)。
 * 4. 遞迴計算左右子樹的排列數，將目前節點的交錯排列數與兩側結果相乘並取模。
 * 5. DFS 計算出的結果包含題目原始排列本身，因此最後減去 1。
 */

// --- LeetCode 提供的程式碼模板 ---
function numOfWays(nums: number[]): number {
  const MOD = 1000000007n;
  const n = nums.length;

  // 預處理巴斯卡三角形 (Pascal's Triangle) 用於快速查表計算組合數 C(n, k)
  // comb[i][j] 代表從 i 個位置選 j 個位置的組合數 C(i, j)
  const comb: bigint[][] = Array.from({ length: n + 1 }, () =>
    new Array<bigint>(n + 1).fill(0n),
  );

  for (let i = 0; i <= n; i++) {
    comb[i][0] = 1n;
    for (let j = 1; j <= i; j++) {
      comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
    }
  }

  // DFS
  function dfs(arr: number[]): bigint {
    // 如果長度小於等於 2，排列只有 1 種
    if (arr.length <= 2) {
      return 1n;
    }

    const root = arr[0];
    const left: number[] = [];
    const right: number[] = [];

    // 劃分左右子樹元素
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < root) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    const lSize = left.length;
    const rSize = right.length;

    // 組合數：在 (left + right) 的總空位中挑選 left 個位置放入左子樹元素
    const ways = comb[lSize + rSize][lSize];
    const leftWays = dfs(left);
    const rightWays = dfs(right);

    // 乘積後取模
    return (((ways * leftWays) % MOD) * rightWays) % MOD;
  }

  // 減 1 排除題目初始給定的那 1 種排列
  const totalWays = dfs(nums);
  const result = (totalWays - 1n + MOD) % MOD;

  return Number(result);
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [2, 1, 3],
    answer: 1,
  },
  {
    nums: [3, 4, 5, 1, 2],
    answer: 5,
  },
  {
    nums: [1, 2, 3],
    answer: 0,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = numOfWays(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
