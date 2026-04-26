/**
 * 題號： 102
 * 標題： Binary Tree Level Order Traversal
 * 連結： https://leetcode.com/problems/binary-tree-level-order-traversal/description/
 * 時間複雜度： O(n)
 * - n 是二元樹的節點數量
 * - 會遍歷整棵樹一次 (假設queue的操作為O(1)))
 * 空間複雜度： O(n)
 * - n 是二元樹的節點數量
 * - 空間的主要消耗來自queue 存放當前level 的節點 最壞情況是平衡樹 最後一層的節點數量 (約為n/2))
 * 解題思路：
 * 1. 使用BFS 的技巧 來遍歷整棵樹
 * 2. 建立一個queue來存放當前level 的節點
 * 3. 每次從queue取出當前的level 的節點 並將其值存入一個暫存的陣列中 且將其左右子節點加入queue中
 * 4. 將每一層的節點值存入結果陣列中
 * 5. 最後回傳結果陣列
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelValues: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      levelValues.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(levelValues);
  }

  return result;
}

// test case
interface TestCase {
  root: (number | null)[];
  answer: number[][];
}

const testCases: TestCase[] = [
  {
    root: [3, 9, 20, null, null, 15, 7],
    answer: [[3], [9, 20], [15, 7]],
  },
  {
    root: [1],
    answer: [[1]],
  },
  {
    root: [],
    answer: [],
  },
];

testCases.forEach(({ root, answer }, index) => {
  const result = levelOrder(createTreeFromArray(root));

  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(root)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
