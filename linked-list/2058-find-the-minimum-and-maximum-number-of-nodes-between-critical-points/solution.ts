/**
 * 題號：2058
 * 題目：Find the Minimum and Maximum Number of Nodes Between Critical Points
 * 連結：https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/description/
 * 時間複雜度：O(n)
 * - 需要遍歷整個鏈表一次，找出所有臨界點的位置。
 *
 * 空間複雜度：O(k)
 * - k 為臨界點的個數，最壞情況下為 O(n)。
 * - 用 indices 陣列存儲所有臨界點的索引位置。
 * - 其他變數均為常數級空間。
 *
 * 解題思路：
 * 1. 遍歷鏈表，檢查每個非邊界節點是否為臨界點。
 *    - 臨界點定義：節點值大於兩個相鄰節點（local maximum）或小於兩個相鄰節點（local minimum）。
 * 2. 記錄所有臨界點的索引位置到 indices 陣列。
 * 3. 若臨界點少於 2 個，無法計算節點間距離，返回 [-1, -1]。
 * 4. 計算最大距離：最後一個臨界點索引減去第一個臨界點索引。
 * 5. 計算最小距離：相鄰臨界點之間的最小間隔。
 */

// --- LeetCode 提供的程式碼模板 ---
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { ListNode, arrayToList } from '../../utils/linked-list/singly.ts';

function nodesBetweenCriticalPoints(head: ListNode | null): number[] {
  if (!head || !head.next || !head.next.next) {
    return [-1, -1];
  }

  const indices: number[] = [];

  let prev = head;
  let current = head?.next;
  let index = 1;
  while (current?.next != null) {
    const prevVal = prev?.val;
    const currentVal = current.val;
    const nextVal = current.next?.val;

    if (
      (currentVal > prevVal && currentVal > nextVal) ||
      (currentVal < prevVal && currentVal < nextVal)
    ) {
      indices.push(index);
    }

    prev = current;
    current = current.next;
    index++;
  }
  console.log('indices:', indices);

  if (indices.length < 2) return [-1, -1];

  const maxDistance = indices[indices.length - 1] - indices[0];

  let minDistance = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i < indices.length; i++) {
    const distance = indices[i] - indices[i - 1];
    minDistance = Math.min(minDistance, distance);
  }

  return [minDistance, maxDistance];
}

// --- 測試案例 ---
interface TestCase {
  head: number[];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    head: [3, 1],
    answer: [-1, -1],
  },
  {
    head: [5, 3, 1, 2, 5, 1, 2],
    answer: [1, 3],
  },
  {
    head: [1, 3, 2, 2, 3, 2, 2, 2, 7],
    answer: [3, 3],
  },
];

testCases.forEach(({ head, answer }, index) => {
  const result = nodesBetweenCriticalPoints(arrayToList(head));
  console.log(`Case ${index + 1}:`);
  console.log(`Input: head = ${JSON.stringify(head)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
