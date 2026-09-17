/**
 * 題號：1477
 * 題目：Find Two Non-overlapping Sub-arrays Each With Target Sum
 * 連結：https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/description/
 * 時間複雜度：O(n)
 * - 左到右與右到左各執行一次滑動視窗，都是 O(n)。
 * - 最後再掃描所有切分點，時間為 O(n)，因此總時間複雜度為 O(n)。
 *
 * 空間複雜度：O(n)
 * - prefix 與 suffix 陣列分別儲存每個位置左側與右側的最短子陣列長度。
 * - 兩個陣列大小皆為 n，因此額外空間複雜度為 O(n)。
 *
 * 解題思路：
 * 1. 因為陣列中的數字皆為正數，可以使用滑動視窗在線性時間內找出總和為 target 的子陣列。
 * 2. 從左到右掃描陣列，建立 prefix[right]，記錄 arr[0..right] 中總和為 target 的最短子陣列長度。
 *    若目前視窗總和大於 target，就不斷移動 left 縮小視窗；找到符合條件的視窗時更新最短長度。
 * 3. 從右到左以相同方式掃描陣列，建立 suffix[left]，記錄 arr[left..n-1] 中總和為 target 的最短子陣列長度。
 * 4. 枚舉兩個子陣列的分界點 i：左側使用 prefix[i]，右側使用 suffix[i + 1]，
 *    確保兩個子陣列不重疊，並更新兩者長度總和的最小值。
 * 5. 若所有分界點都無法找到兩個符合條件的子陣列，則返回 -1；否則返回最小長度總和。
 */

// --- LeetCode 提供的程式碼模板 ---
function minSumOfLengths(arr: number[], target: number): number {
  const n = arr.length;

  // prefix[i]: 表示在 arr[0..i] 中，和為 target 的最短子陣列長度
  // suffix[i]: 表示在 arr[i..n-1] 中，和為 target 的最短子陣列長度
  const prefix: number[] = new Array(n).fill(Infinity);
  const suffix: number[] = new Array(n).fill(Infinity);

  // 計算prefix
  let left = 0;
  let sum = 0;
  for (let right = 0; right < n; right++) {
    sum += arr[right];

    while (sum > target && left <= right) {
      sum -= arr[left];
      left++;
    }

    if (right > 0) {
      // 繼承前一個位置的最短子陣列長度
      prefix[right] = prefix[right - 1];
    }

    if (sum === target) {
      prefix[right] = Math.min(prefix[right], right - left + 1);
    }
  }

  // 計算suffix
  let right = n - 1;
  sum = 0;
  for (let left = n - 1; left >= 0; left--) {
    sum += arr[left];

    while (sum > target && left <= right) {
      sum -= arr[right];
      right--;
    }

    if (left < n - 1) {
      // 繼承後一個位置的最短子陣列長度
      suffix[left] = suffix[left + 1];
    }

    if (sum === target) {
      suffix[left] = Math.min(suffix[left], right - left + 1);
    }
  }

  let minLength = Infinity;
  for (let i = 0; i < n - 1; i++) {
    if (prefix[i] < Infinity && suffix[i + 1] < Infinity) {
      minLength = Math.min(minLength, prefix[i] + suffix[i + 1]);
    }
  }
  return minLength === Infinity ? -1 : minLength;
}

// --- 測試案例 ---
interface TestCase {
  arr: number[];
  target: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    arr: [3, 2, 2, 4, 3],
    target: 3,
    answer: 2,
  },
  {
    arr: [7, 3, 4, 7],
    target: 7,
    answer: 2,
  },
  {
    arr: [4, 3, 2, 6, 2, 3, 4],
    target: 6,
    answer: -1,
  },
];

testCases.forEach(({ arr, target, answer }, index) => {
  const result = minSumOfLengths(arr, target);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: arr = ${JSON.stringify(arr)}, target = ${target}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
