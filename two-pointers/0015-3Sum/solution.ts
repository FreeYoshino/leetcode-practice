/**
 * 題號： 15
 * 標題： 3Sum
 * 連結： https://leetcode.com/problems/3sum/solutions/6284786/best-solution-ever-python-java-c-c-javas-riwx/
 * 時間複雜度： O(n^2)
 * - n 為輸入陣列的長度
 * - 排序需 O(n log n) 外層迴圈配合雙指標掃描需 O(n^2) 取最高階O(n^2)
 * 空間複雜度：O(log n) ~ O(n)
 * - 雙指標操作本身只需O(1)
 * - 實際消耗主要來自使用的 .sort() 方法底層所需的記憶體或堆疊(回傳的 result 不計)
 * 解題思路：
 *  1. 目標是找出 nums[i] + nums[j] + nums[k] == 0 所有可能解
 *  2. 將 nums 陣列排序(小到大)
 *  3. 外層迴圈固定基準點 nums[i]
 *  4. 使用雙指標分別將 left 指向 i+1 right 指向陣列尾部
 *  5. 移動兩指標使其和等於 -nums[i]
 *  6. 利用nums以排序好的特性 當雙指標和 大於 -nums[i] 時代表 right 向前移動 小於時 left 需要往後移動
 */

function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];

  // 排序 nums
  nums.sort((a, b) => {
    return a - b;
  });

  for (let i = 0; i < nums.length; i++) {
    // 剪枝
    if (nums[i] > 0) break;
    // 跳過相同基準點(會產生重複組合)
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;
    const targetNum = -nums[i];
    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum > targetNum) {
        right--;
      } else if (sum < targetNum) {
        left++;
      } else if (sum === targetNum) {
        result.push([nums[i], nums[left], nums[right]]);

        // 找到一解後 指標繼續向中間移動
        left++;
        right--;

        // 跳過內層重複(會產生重複組合)
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      }
    }
  }
  return result;
}

// test case
const case_1 = [-1, 0, 1, 2, -1, -4];
const case_2 = [0, 1, 1];
const case_3 = [0, 0, 0];

console.log(`Case 1 result: ${JSON.stringify(threeSum(case_1))}`);
console.log(`Case 2 result: ${JSON.stringify(threeSum(case_2))}`);
console.log(`Case 3 result: ${JSON.stringify(threeSum(case_3))}`);
