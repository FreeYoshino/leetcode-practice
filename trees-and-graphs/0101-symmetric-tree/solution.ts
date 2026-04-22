/**
 * 題號： 101
 * 標題：Symmetric Tree
 * 連結：https://leetcode.com/problems/symmetric-tree/description/
 * 時間複雜度： O(n)
 * - n 為樹的節點數量
 * - 會遍歷整棵樹一次
 * 空間複雜度： O(h)
 * - h 為樹的高度
 * - 空間的消耗來自於遞迴呼叫的堆疊空間
 * - 最壞情況為 O(n) 當樹為單邊時
 * - 平均情況為 O(log n) 當樹為平衡時
 * 解題思路：
 * 1. 透過遞迴的方式 檢查左右子樹是否為鏡像對稱
 * 2. 若左右子樹都為null 則為鏡像對稱
 * 3. 若其中一個子樹為null 則不為鏡像對稱
 * 4. 若左右子樹的值不相等 則不為鏡像對稱
 * 5. 遞迴檢查 外對外(left.left, right.right) 內對內(left.right, right.left) 是否為鏡像對稱
 * 6. 若左右子樹都為鏡像對稱 則整棵樹為鏡像對稱
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function isMirror(left: TreeNode | null, right: TreeNode | null): boolean {
  if (!left && !right) return true;
  if (!left || !right) return false;
  if (left.val !== right.val) return false;
  return isMirror(left.left, right.right) && isMirror(left.right, right.left);
}

function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return true;
  return isMirror(root.left, root.right);
}

// test case
interface TestCase {
  root: (number | null)[];
  answer: boolean;
}

const testCases: TestCase[] = [
  { root: [1, 2, 2, 3, 4, 4, 3], answer: true },
  { root: [1, 2, 2, null, 3, null, 3], answer: false },
];

testCases.forEach(({ root, answer }, index) => {
  const result = isSymmetric(createTreeFromArray(root));

  console.log(`Case ${index + 1}:`);
  console.log(`Input: root = ${JSON.stringify(root)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
