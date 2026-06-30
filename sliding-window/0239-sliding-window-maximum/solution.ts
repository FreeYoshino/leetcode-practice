/**
 * 題號： 239
 * 標題： Sliding Window Maximum
 * 連結： https://leetcode.com/problems/sliding-window-maximum/description/
 * 時間複雜度：O(n)
 * 但這份實作是用一般陣列模擬雙向佇列，包含 shift() 操作，
 * 所以實際執行時不會完全是理想的 O(n)。
 * 空間複雜度：O(k)
 * 解題思路：
 * 使用單調遞減佇列保存「索引」而不是直接保存值，
 * 讓佇列最前面永遠是當前視窗中的最大值索引。
 *
 * 每次右指標往右移動時：
 * 1. 先移除已經離開視窗的索引。
 * 2. 再把所有比新元素小的索引從尾端移除，維持佇列單調遞減。
 * 3. 將當前索引加入佇列。
 * 4. 當視窗大小達到 k 時，佇列最前面的元素就是該視窗最大值。
 *
 * 每個索引最多被加入一次、移除一次，所以總時間複雜度是 O(n)。
 */

function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];

  let left = 0;
  const queue: number[] = []; // 單調遞減的雙向佇列 存儲index
  for (let right = 0; right < nums.length; right++) {
    // 移除不在窗口範圍內的元素
    while (queue.length > 0 && queue[0] < left) {
      queue.shift();
    }

    // 移除比當前元素小的元素，保持單調遞減
    while (queue.length > 0 && nums[queue[queue.length - 1]] < nums[right]) {
      queue.pop();
    }

    // 將當前元素的索引加入佇列
    queue.push(right);

    if (right - left + 1 == k) {
      result.push(nums[queue[0]]); // 當窗口大小達到k時，將最大值加入結果
      left++; // 移動左邊界
    }
  }
  return result;
}

interface TestCase {
  nums: number[];
  k: number;
  answer: number[];
}

const testCases: TestCase[] = [
  {
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    k: 3,
    answer: [3, 3, 5, 5, 6, 7],
  },
  {
    nums: [1],
    k: 1,
    answer: [1],
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = maxSlidingWindow(nums, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
