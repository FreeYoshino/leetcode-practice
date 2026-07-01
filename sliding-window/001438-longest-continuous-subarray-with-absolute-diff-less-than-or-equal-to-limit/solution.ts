/**
 * 題號： 1438
 * 標題： Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
 * 連結： https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description/
 * 時間複雜度：O(n)
 * — 每個元素最多被加入與從單調佇列中移除一次，左右指標各移動最多 n 次。
 * 空間複雜度：O(n)
 * — 使用兩個單調佇列儲存索引，最壞情況下佔用 O(n) 空間。
 * 解題思路：
 * 使用滑動視窗搭配兩個單調佇列分別維護當前視窗的最大值與最小值。
 *  1. 右指標向右擴展時，將索引加入 `maxDeque`（保持遞減）與 `minDeque`（保持遞增），在加入時移除不符合單調性的尾部索引。
 *  2. 若 `max - min > limit`，則將左指標右移並移除已過期的索引（從佇列前端移除）。
 *  3. 每次擴展或收縮後更新最大長度。
 * 如此每個元素在佇列中出入最多一次，達到線性時間。
 */

function longestSubarray(nums: number[], limit: number): number {
  // 使用兩個單調佇列來分別儲存目前子陣列的最大值和最小值的索引
  const maxDeque: number[] = []; // 單調遞減
  const minDeque: number[] = []; // 單調遞增

  // 使用雙指針 來取代shift() 避免頻繁的陣列操作，提升效能
  let maxHead = 0;
  let minHead = 0;

  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < nums.length; right++) {
    // 更新最大值的單調佇列
    while (
      maxDeque.length > maxHead &&
      nums[right] > nums[maxDeque[maxDeque.length - 1]]
    ) {
      // 移除所有比當前元素小的索引，因為它們不可能成為最大值
      maxDeque.pop();
    }
    maxDeque.push(right);

    // 更新最小值的單調佇列
    while (
      minDeque.length > minHead &&
      nums[right] < nums[minDeque[minDeque.length - 1]]
    ) {
      // 移除所有比當前元素大的索引，因為它們不可能成為最小值
      minDeque.pop();
    }
    minDeque.push(right);

    // 檢查當前窗口的最大值和最小值的差是否超過限制
    while (nums[maxDeque[maxHead]] - nums[minDeque[minHead]] > limit) {
      left++;
      // 移除不在當前窗口範圍內的索引
      while (maxDeque.length > maxHead && maxDeque[maxHead] < left) {
        maxHead++;
      }
      while (minDeque.length > minHead && minDeque[minHead] < left) {
        minHead++;
      }
    }

    // 更新最長子陣列的長度
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}

interface TestCase {
  nums: number[];
  limit: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [8, 2, 4, 7],
    limit: 4,
    answer: 2,
  },
  {
    nums: [10, 1, 2, 4, 7, 2],
    limit: 5,
    answer: 4,
  },
  {
    nums: [4, 2, 2, 2, 4, 4, 2, 2],
    limit: 0,
    answer: 3,
  },
];

testCases.forEach(({ nums, limit, answer }, index) => {
  const result = longestSubarray(nums, limit);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, limit = ${limit}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
