/**
 * 題號：3524
 * 題目：Find X Value of Array I
 * 連結：https://leetcode.com/problems/find-x-value-of-array-i/description/
 * 時間複雜度：O(n * k)
 * - n 是陣列 nums 的長度，k 是需要統計的餘數種類數。
 * - 每個元素都需要遍歷 k 個餘數狀態，計算延伸後的乘積模 k。
 * - 因此總時間複雜度為 O(n * k)。
 *
 * 空間複雜度：O(k)
 * - dp 陣列儲存以目前位置結尾、各乘積餘數的子陣列數量。
 * - 每次只需要保留目前輪的 dp、下一輪的 newDp，以及累計答案 result，
 *   每個陣列大小皆為 k，因此空間複雜度為 O(k)。
 *
 * 解題思路：
 * 1. 將所有子陣列依照「乘積除以 k 的餘數」分類，並使用 dp[i] 記錄
 *    以目前位置結尾、乘積 mod k 等於 i 的子陣列數量。
 * 2. 遍歷 nums 中的每個元素，先計算目前元素對 k 的餘數 mod。
 * 3. 對於前一輪的每個餘數 j，將目前元素接到原本的子陣列後方，
 *    新的乘積餘數為 (j * mod) % k，並將對應數量累加到 newDp。
 * 4. 另外，將目前元素單獨視為一個新的子陣列，因此將 newDp[mod] 加 1。
 * 5. 更新 dp 為 newDp，並將目前位置結尾的所有子陣列數量累加到 result。
 * 6. 遍歷完成後，result[i] 就是所有乘積 mod k 等於 i 的非空連續子陣列數量。
 */

// --- LeetCode 提供的程式碼模板 ---
function resultArray(nums: number[], k: number): number[] {
  const n = nums.length;

  // dp[i]: 代表以遍歷到的位置為解尾的子陣列中 乘積mod k後的數字為 i 的子陣列數量
  let dp: number[] = new Array(k).fill(0);

  const result: number[] = new Array(k).fill(0);
  for (let i = 0; i < n; i++) {
    const mod = nums[i] % k;
    const newDp: number[] = new Array(k).fill(0);

    // 加上前一個位置的子陣列數量
    for (let j = 0; j < k; j++) {
      if (dp[j] > 0) {
        const newMod = (j * mod) % k;
        newDp[newMod] += dp[j];
      }
    }
    // 加上以當前位置為子陣列起點
    newDp[mod] += 1;

    // 更新dp
    dp = newDp;

    // 累加到結果中
    for (let j = 0; j < k; j++) {
      result[j] += dp[j];
    }
  }
  return result;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  k: number;
  answer: number[];
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 3, 4, 5],
    k: 3,
    answer: [9, 2, 4],
  },
  {
    nums: [1, 2, 4, 8, 16, 32],
    k: 4,
    answer: [18, 1, 2, 0],
  },
  {
    nums: [1, 1, 2, 1, 1],
    k: 2,
    answer: [9, 6],
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = resultArray(nums, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
