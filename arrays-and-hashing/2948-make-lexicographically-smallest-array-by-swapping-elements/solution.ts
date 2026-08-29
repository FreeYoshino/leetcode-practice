/**
 * 題號：2948
 * 題目：Make Lexicographically Smallest Array by Swapping Elements
 * 連結：https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements/description/
 * 時間複雜度：O(n log n)
 * - 將每個元素和原始索引配對後排序，排序成本為 O(n log n)。
 * - 雙指標掃描已排序的陣列，將每一段可互相交換的區間找出來，總共只遍歷一次，耗時 O(n)。
 * - 按原索引重新寫回結果陣列時，也只會處理每個元素一次，耗時 O(n)。
 * - 因此總時間複雜度為 O(n log n)。
 *
 * 空間複雜度：O(n)
 * - pairs 會保存每個元素與其原始索引，大小為 O(n)。
 * - indices 只暫存當前可交換區間的索引，最壞情況也會達到 O(n)。
 * - 其餘額外變數為常數，因此總空間複雜度為 O(n)。
 *
 * 解題思路：
 * 1. 先把 nums 中每個元素和它原本的位置組成 (value, index) 的配對，依照 value 由小到大排序。
 * 2. 以雙指標找出排序後連續且差值不超過 limit 的區間，這代表這些元素都可以互相交換，且它們會被視為同一組。
 * 3. 對每一組，取出其原始索引，將這些索引按由小到大排序，並依序把該組中最小的數值填回對應位置。
 * 4. 因為同一組內的元素都可以任意交換，所以把這組數字排成升序後回填原索引，就能得到這一段的最小字典序排列。
 * 5. 每個組別都獨立處理，最終整個陣列便是可達成的最小字典序結果。
 */

// --- LeetCode 提供的程式碼模板 ---
function lexicographicallySmallestArray(
  nums: number[],
  limit: number,
): number[] {
  const pairs: [number, number][] = nums.map((num, index) => [num, index]);
  pairs.sort((a, b) => a[0] - b[0]); // 升序排列數字及其索引

  const n = nums.length;
  const result: number[] = new Array(n).fill(0);

  // 雙指針 找出每一組可以交換的元素
  let i = 0;
  while (i < n) {
    let j = i;
    while (j + 1 < n && Math.abs(pairs[j][0] - pairs[j + 1][0]) <= limit) {
      j++;
    }

    // 將這一組可互相交換的pairs[i...j]的元素 按照原始索引小到大放入result中
    const indices: number[] = [];
    for (let k = i; k <= j; k++) {
      indices.push(pairs[k][1]);
    }
    indices.sort((a, b) => a - b); // 按照原始索引排序

    for (let k = 0; k < indices.length; k++) {
      const index = indices[k];
      const value = pairs[i + k][0];
      result[index] = value;
    }

    // 移動到下一組可交換的元素
    i = j + 1;
  }

  return result;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  limit: number;
  answer: number[];
}

const testCases: TestCase[] = [
  {
    nums: [1, 5, 3, 9, 8],
    limit: 2,
    answer: [1, 3, 5, 8, 9],
  },
  {
    nums: [1, 7, 6, 18, 2, 1],
    limit: 3,
    answer: [1, 6, 7, 18, 1, 2],
  },
  {
    nums: [1, 7, 28, 19, 10],
    limit: 3,
    answer: [1, 7, 28, 19, 10],
  },
];

testCases.forEach(({ nums, limit, answer }, index) => {
  const result = lexicographicallySmallestArray(nums, limit);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, limit = ${limit}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
