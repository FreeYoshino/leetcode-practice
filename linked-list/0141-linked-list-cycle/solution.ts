/**
 * 題號： 141
 * 標題： Linked List Cycle
 * 連結：https://leetcode.com/problems/linked-list-cycle/description/
 * 時間複雜度： O(N)
 * - N 是鏈表的節點數量
 * - 如果沒有環 則快指針會遍歷整個鏈表一次，時間複雜度為 O(N)
 * - 如果有環 快指針和慢指針會在環內相遇，最壞情況是快指針繞環一圈，時間複雜度為 O(N)
 * 空間複雜度： O(1)
 * - 指使用了slow和fast兩個指針，空間複雜度為 O(1)
 * 解題思路：
 * 1. 使用快慢指針的方式 慢指針每次移動一步 快指針每次移動兩步
 * 2. 如果快指針和慢指針相遇了 就代表有環
 * 3. 如果快指針或快指針的下一個節點為 null 就代表沒有環(到達鏈表末尾了)
 */

import { ListNode, createListWithCycle } from '../../utils/linked-list/singly.ts';

function hasCycle(head: ListNode | null): boolean {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) { 
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }
  return false;
}

// test case
interface TestCase {
  head: number[];
  pos: number;
  answer: boolean;
}

const testCases: TestCase[] = [
  { head: [3, 2, 0, -4], pos: 1, answer: true },
  { head: [1, 2], pos: 0, answer: true },
  { head: [1], pos: -1, answer: false },
];

testCases.forEach((tc, index) => {
  const head = createListWithCycle(tc.head, tc.pos);
  const result = hasCycle(head);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: head = ${JSON.stringify(tc.head)}, pos = ${tc.pos}`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
