/**
 * 題號： 297
 * 標題： Serialize and Deserialize Binary Tree
 * 連結： https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/
 * 時間複雜度： O(n)
 * 空間複雜度： O(h)
 * - h 為樹的高度，遞迴呼叫堆疊的最大深度為樹的高度
 * 解題思路：
 * - 序列化時使用前序走訪，遇到空節點就記錄 `null`，這樣可以完整保留樹的結構。
 * - 反序列化時依照序列化後的順序逐一取值，遇到 `null` 就回傳空節點，否則建立當前節點並遞迴還原左右子樹。
 * - 因為前序走訪搭配空節點標記可以唯一表示一棵二元樹，所以 `serialize(root)` 再接 `deserialize(...)` 能還原回原本的樹。
 */

import {
  TreeNode,
  createTreeFromArray,
  treeToArray,
} from '../../utils/tree/binary-tree.ts';

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  let result: string[] = [];
  function helper(node: TreeNode | null) {
    if (node === null) {
      result.push('null');
      return;
    }

    result.push(`${node.val}`);
    helper(node.left);
    helper(node.right);
  }

  helper(root);
  return result.join(',');
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const dataArray = data.split(',');
  let index = 0;

  function helper(): TreeNode | null {
    if (dataArray[index] === 'null') {
      index++;
      return null;
    }

    const node = new TreeNode(parseInt(dataArray[index]));
    index++;
    node.left = helper();
    node.right = helper();
    return node;
  }

  return helper();
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
interface TestCase {
  root: (number | null)[];
  answer: (number | null)[];
}

const testCases: TestCase[] = [
  {
    root: [1, 2, 3, null, null, 4, 5],
    answer: [1, 2, 3, null, null, 4, 5],
  },
  {
    root: [],
    answer: [],
  },
];

testCases.forEach(({ root, answer }, index) => {
  const treeRoot = createTreeFromArray(root);
  const result = deserialize(serialize(treeRoot));
  const resultArray = treeToArray(result);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(root)}`);
  console.log(`Output: ${JSON.stringify(resultArray)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
