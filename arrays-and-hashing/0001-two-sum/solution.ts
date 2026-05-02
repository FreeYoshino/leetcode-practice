/**
 * 題號： 1
 * 標題： Two Sum
 * 連結： https://leetcode.com/problems/two-sum/description/
 * 時間複雜度： O(n)
 * - n為nums陣列的長度
 * - 會遍歷nums陣列一次 並且在map中查找差值的時間複雜度為O(1) 所以總時間複雜度為O(n)
 * 空間複雜度： O(n)
 * - 最壞的情況下 map中會儲存n個元素 因此空間複雜度為O(n)
 * 解題思路：
 * 1. 使用一個map來除存nums陣列中的元素以及對應的索引
 * 2. 遍歷nums陣列 對每個元素計算出差值(target - nums[i]) 並在map中查找是否存在該差值
 * 3. 如果存在差值 則返回該差值的索引以及當前元素的索引
 * 4. 如果不存在差值 則將當前元素以及索引存入map中
 * 5. 回傳result陣列
 */

function twoSum(nums: number[], target: number): number[] {
  const result: number[] = [];
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      result.push(map.get(diff)!, i);
      break;
    }

    map.set(nums[i], i);
  }

  return result;
}

// test case
interface TestCase {
  nums: number[];
  target: number;
  answer: number[];
}

const testCases: TestCase[] = [
  {
    nums: [2, 7, 11, 15],
    target: 9,
    answer: [0, 1],
  },
  {
    nums: [3, 2, 4],
    target: 6,
    answer: [1, 2],
  },
  {
    nums: [3, 3],
    target: 6,
    answer: [0, 1],
  },
];

testCases.forEach(({ nums, target, answer }, index) => {
  const result = twoSum(nums, target);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, target = ${target}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
