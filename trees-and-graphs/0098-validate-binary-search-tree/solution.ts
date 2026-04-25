/**
 * 題號： 98
 * 標題： Validate Binary Search Tree
 * 連結： https://leetcode.com/problems/validate-binary-search-tree/description/
 * 時間複雜度： O(n)
 * - 會遍歷整棵樹一次來檢查每個節點的值是否符合二元搜尋樹的條件
 * 空間複雜度： O(h)
 * - h為樹的高度
 * - 最壞的情況下 樹是一條鏈表 空間複雜度為 O(n) 平均情況下樹是平衡的 空間複雜度為 O(log n)
 * 解題思路：
 * 1. 以遞迴狀態傳遞的方式 檢查每個節點的值是否在 min 和 max 之間
 * 2. 對於左子樹的檢查 將max 更新為當前節點的值
 * 3. 對於右子樹的檢查 將min 更新為當前節點的值
 * 4. 如果節點的值不在 min 和 max 之間 則返回 false
 * 5. 如果所有節點都符合條件 則返回 true
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function isValid(root: TreeNode | null, max: number, min: number): boolean {
  if (root === null) return true;
  const value = root.val;
  if (value >= max || value <= min) return false;

  return isValid(root.left, value, min) && isValid(root.right, max, value);
}

function isValidBST(root: TreeNode | null): boolean {
  return isValid(root, Infinity, -Infinity);
}

// test case
interface TestCase {
  root: (number | null)[];
  answer: boolean;
}

const testCases: TestCase[] = [
  { root: [2, 1, 3], answer: true },
  { root: [5, 1, 4, null, null, 3, 6], answer: false },
];

testCases.forEach(({ root, answer }, index) => {
  const result = isValidBST(createTreeFromArray(root));

  console.log(`Case ${index + 1}: `);
  console.log(`Input: ${JSON.stringify(root)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
