/**
 * 題號： 142
 * 標題： Linked List Cycle II
 * 連結： https://leetcode.com/problems/linked-list-cycle-ii/description/
 * 時間複雜度： O(N)
 * - N為鏈結串列的節點數量
 * - 判斷是否有cycle的時間複雜度為O(N) 因為slow和fast最多會走N步就會相遇或fast到達null
 * - 找到cycle入口的時間複雜度為O(N) 因為slow和fast最多會走N步就會相遇
 * 空間複雜度： O(1)
 * - 沒有使用額外的空間 只有使用了幾個指標變數
 * 解題思路：
 * 1. 先判斷是否有cycle 若有cycle則slow和fast會相遇
 * 2. 之後將slow指向head 並且slow和fast每次移動一步 最終會在cycle的入口相遇(數學推導)
 * 3. 若沒有cycle則fast會先到達null
 *
 * 數學推導:
 * 假設 A: head到cycle入口的距離
 * 假設 B: cycle入口到slow和fast相遇點的距離
 * 假設 C: slow和fast相遇點到cycle入口的距離
 * 則 slow走的距離為 A + B
 * 則 fast走的距離為 A + B + C + B = A + 2B + C
 * 因為fast走的距離是slow的兩倍 所以 A + 2B + C = 2(A + B) => A = C
 * 因此當slow和fast相遇後 將slow指向head 並且slow和fast每次移動一步 最終會在cycle的入口相遇
 */

import {
  ListNode,
  createListWithCycle,
} from '../../utils/linked-list/singly.ts';

function detectCycle(head: ListNode | null): ListNode | null {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow!.next;
        fast = fast!.next;
      }
      return slow;
    }
  }

  return null;
}

// test case
interface TestCase {
  head: number[];
  pos: number;
  answer: ListNode | null;
}

const testCasses: TestCase[] = [
  { head: [3, 2, 0, -4], pos: 1, answer: new ListNode(2) },
  { head: [1, 2], pos: 0, answer: new ListNode(1) },
  { head: [1], pos: -1, answer: null },
];

testCasses.forEach((tc, index) => {
  const head = createListWithCycle(tc.head, tc.pos);
  const result = detectCycle(head);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: head = ${JSON.stringify(tc.head)}, pos = ${tc.pos}`);
  console.log(`Output: ${result ? result.val : null}`);
  console.log(`Answer: ${tc.answer ? tc.answer.val : null}`);
});
