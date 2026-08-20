/**
 * 題號：3069
 * 題目：Distribute Elements Into Two Arrays I
 * 連結：https://leetcode.com/problems/distribute-elements-into-two-arrays-i/description/
 * 時間複雜度：O(n)
 * - 逐一走訪 nums 中第 3 個元素以後的所有元素：O(n)
 * - 最後使用展開運算符合併 arr1 與 arr2：O(n)
 *
 * 空間複雜度：O(n)
 * - 使用 arr1 與 arr2 儲存分配後的元素，總數量為 n
 * - 回傳 [...arr1, ...arr2] 時會建立一個長度為 n 的新陣列
 *
 * 解題思路：
 * 1. 先將 nums 的前兩個元素分別放入 arr1 與 arr2，並以 last1、last2 記錄兩個陣列的最後一個元素。
 * 2. 從第 3 個元素開始逐一處理：若 last1 > last2，就將元素放入 arr1；否則放入 arr2。
 * 3. 每次放入元素後，同步更新對應陣列的最後一個元素，讓下一次比較使用最新狀態。
 * 4. 依序合併 arr1 與 arr2，即可得到題目要求的結果陣列。
 */

// --- LeetCode 提供的程式碼模板 ---
function resultArray(nums: number[]): number[] {
  const n = nums.length;
  const arr1: number[] = [];
  const arr2: number[] = [];

  let last1 = nums[0];
  let last2 = nums[1];

  arr1.push(nums[0]);
  arr2.push(nums[1]);

  for (let i = 2; i < n; i++) {
    const current = nums[i];

    if (last1 > last2) {
      last1 = current;
      arr1.push(current);
    } else {
      last2 = current;
      arr2.push(current);
    }
  }

  return [...arr1, ...arr2];
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    nums: [2, 1, 3],
    answer: [2, 3, 1],
  },
  {
    nums: [5, 4, 3, 8],
    answer: [5, 3, 4, 8],
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = resultArray(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
