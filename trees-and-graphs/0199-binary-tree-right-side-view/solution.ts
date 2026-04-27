/**
 * 題號： 199
 * 標題： Binary Tree Right Side View
 * 連結： https://leetcode.com/problems/binary-tree-right-side-view/description/
 * 時間複雜度： O(n)
 * - n 為樹中節點的數量
 * - - 會遍歷整棵樹一次 (假設queue的操作為O(1)))
 * 空間複雜度： O(n)
 * - n 為樹中節點的數量
 * - 空間的主要消耗來自queue 存放當前level 的節點 最壞情況是平衡樹 最後一層的節點數量 (約為n/2))
 * 解題思路：
 * 1. 使用BFS 的技巧遍歷整棵樹
 * 2. 在每一層中 將最後一個節點的值加入結果陣列中
 * 3. 最後回傳結果陣列
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      if (i === levelSize - 1) {
        result.push(node.val);
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}

// test case
interface TestCase {
  root: (number | null)[];
  answer: number[];
}

const testCases: TestCase[] = [
  { root: [1, 2, 3, null, 5, null, 4], answer: [1, 3, 4] },
  { root: [1, 2, 3, 4, null, null, null, 5], answer: [1, 3, 4, 5] },
  { root: [1, null, 3], answer: [1, 3] },
  { root: [], answer: [] },
];

testCases.forEach(({ root, answer }, index) => {
  const result = rightSideView(createTreeFromArray(root));

  console.log(`Case ${index + 1}:`);
  console.log(`Input: root = ${JSON.stringify(root)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
