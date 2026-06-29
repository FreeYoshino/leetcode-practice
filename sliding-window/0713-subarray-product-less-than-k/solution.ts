/**
 * 題號： 713
 * 標題： Subarray Product Less Than K
 * 連結： https://leetcode.com/problems/subarray-product-less-than-k/description/
 * 時間複雜度：O(n)
 * 空間複雜度：O(1)
 * 解題思路：
 * 使用雙指針搭配滑動視窗維持目前區間的乘積。
 * 每次右指針往右擴張時，先把新元素乘進目前乘積。
 * 如果乘積大於等於 k，就持續移動左指針並把左側元素從乘積中移除，
 * 直到區間乘積重新小於 k。
 * 當 [left, right] 的乘積小於 k 時，表示所有以 right 結尾、起點落在
 * [left, right] 之間的子陣列都符合條件，所以可以一次加上 right - left + 1。
 * 由於每個元素最多只會被左、右指針各處理一次，因此總時間複雜度是 O(n)。
 */

function numSubarrayProductLessThanK(nums: number[], k: number): number {
  let left = 0;
  let product = 1;
  let count = 0;
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];

    while (product >= k && left <= right) {
      product /= nums[left];
      left++;
    }

    // 當 [left, right] 窗口的乘積小於 k 時 所有以 right 為結尾的子陣列都符合條件 因此count += right - left + 1
    count += right - left + 1;
  }
  return count;
}

interface TestCase {
  nums: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [10, 5, 2, 6],
    k: 100,
    answer: 8,
  },
  {
    nums: [1, 2, 3],
    k: 0,
    answer: 0,
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = numSubarrayProductLessThanK(nums, k);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
