/**
 * 題號： 226
 * 標題： Invert Binary Tree
 * 連結： https://leetcode.com/problems/invert-binary-tree/description/
 * 時間複雜度： O(N)
 * - N為binary tree的節點數量 需要遍歷整棵樹一次
 * 空間複雜度： O(H)
 * - H為binary tree的高度
 * - 空間的消耗來自於遞迴呼叫堆疊的深度
 * - 最差的情況 tree為skewed tree 時高度為N 空間複雜度為O(N)
 * - 最佳的情況 tree為balanced tree 時高度為logN 空間複雜度為O(logN)
 * 解題思路：
 * 1. 使用遞迴的方式來遍歷binary tree
 * 2. 在每個節點處交換其左右子樹
 *    - 先遞迴呼叫invertTree來反轉左子樹和右子樹
 *    - 然後將反轉後的左子樹賦值給右子樹 反轉後的右子樹賦值給左子樹
 *    - 最後返回當前節點
 * 3. 這樣整棵樹就會被反轉
 * 4. 回傳反轉後的binary tree的root節點
 */

import {
  TreeNode,
  createTreeFromArray,
  treeToArray,
} from '../../utils/tree/binary-tree.ts';

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}

// test case
interface TestCase {
  root: (number | null)[];
  answer: (number | null)[];
}

const testCases: TestCase[] = [
  {
    root: [4, 2, 7, 1, 3, 6, 9],
    answer: [4, 7, 2, 9, 6, 3, 1],
  },
  {
    root: [2, 1, 3],
    answer: [2, 3, 1],
  },
  {
    root: [],
    answer: [],
  },
];

testCases.forEach(({ root, answer }, index) => {
  const rootNode = createTreeFromArray(root);
  const resultArray = treeToArray(invertTree(rootNode));

  console.log(`Case ${index + 1}`);
  console.log(`Input: root = ${JSON.stringify(root)}`);
  console.log(`Output: ${JSON.stringify(resultArray)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
