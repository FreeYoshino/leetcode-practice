/**
 * 題號：3886
 * 題目：Sum of Sortable Integers
 * 連結：https://leetcode.com/problems/sum-of-sortable-integers/description/
 * 時間複雜度：O(n√n)
 * - 只需枚舉至 √n，找出 n 的所有因數
 * - 每個因數都需要透過 canSort 線性檢查整個陣列，最壞情況為 O(n√n)
 *
 * 空間複雜度：O(1)
 * - 只使用固定數量的變數，沒有額外配置與陣列長度相關的空間
 *
 * 解題思路：
 * 1. 對每個 n 的因數 k，將 nums 視為多個長度為 k 的區塊。
 * 2. 檢查每個區塊是否能透過循環位移變成遞增排列；區塊內最多只能有一個
 *    轉折點，並確認各區塊的值域能依序銜接。
 * 3. 利用因數成對出現的特性，同時檢查 k 與 n / k，將符合條件的區塊長度
 *    加總至答案。
 * 4. 回傳所有可排序區塊長度的總和。
 */

// --- LeetCode 提供的程式碼模板 ---
function sortableIntegers(nums: number[]): number {
  const n = nums.length;
  let sum = 0;

  const canSort = (k: number): boolean => {
    let prevBlockMax = -Infinity;

    for (let i = 0; i < n; i += k) {
      if (k === 1) {
        const value = nums[i];
        if (value < prevBlockMax) return false;
        prevBlockMax = value;
        continue;
      }

      // 找到區塊內的轉折點(drop point)
      let dropCount = 0;
      let dropIndex = -1;
      for (let j = 0; j < k; j++) {
        const currentValue = nums[i + j];
        const nextValue = nums[i + ((j + 1) % k)];
        if (currentValue > nextValue) {
          dropCount++;
          dropIndex = j;

          if (dropCount > 1) return false;
        }
      }

      const blockMin =
        dropCount === 0 ? nums[i] : nums[i + ((dropIndex + 1) % k)];
      const blockMax = dropCount === 0 ? nums[i + k - 1] : nums[i + dropIndex];

      if (blockMin < prevBlockMax) return false;
      prevBlockMax = blockMax;
    }

    return true;
  };

  for (let k = 1; k * k <= n; k++) {
    if (n % k === 0) {
      if (canSort(k)) sum += k;

      const otherK = n / k;
      if (otherK !== k && canSort(otherK)) sum += otherK;
    }
  }
  return sum;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [3, 1, 2],
    answer: 3,
  },
  {
    nums: [7, 6, 5],
    answer: 0,
  },
  {
    nums: [5, 8],
    answer: 3,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = sortableIntegers(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
