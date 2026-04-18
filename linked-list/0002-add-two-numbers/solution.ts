/**
 * 題號： 2
 * 標題： Add Two Numbers
 * 連結： https://leetcode.com/problems/add-two-numbers/description/
 * 時間複雜度： O(max(M, N))
 * - M 和 N 分別是兩個list的長度
 * - 需要走訪完兩個list的所有節點 因此時間複雜度為 O(max(M, N))
 * 空間複雜度： O(max(M, N))
 * - M 和 N 分別是兩個list的長度
 * - 需要建立一個新的list來儲存結果 新list的長度最多為max(M, N) + 1 因此空間複雜度為 O(max(M, N))
 * 解題思路：
 * 1. 使用一個dummy head來簡化list的建立過程
 * 2. 使用一個carry變數來處理進位
 * 3. 同時走訪兩個list 直到將兩個list都走訪完 並且carry為0
 * 4. 在每次的迭代中 計算l1和l2 當前節點以及carry的總和 將總和的十位數作為新的carry 將個位數作為新節點的值 並將新節點連接到結果list中
 * 5. 最後返回dummy head的下一個節點 
 */

import {
  ListNode,
  arrayToList,
  listToArray,
} from '../../utils/linked-list/singly.ts';

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry > 0) {
    const val1 = l1 !== null ? l1.val : 0;
    const val2 = l2 !== null ? l2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;

    // 移動L1和L2的指標
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }

  return dummyHead.next;
}

// test case
interface TestCase {
  l1: ListNode | null;
  l2: ListNode | null;
  answer: ListNode | null;
}

const testCases: TestCase[] = [
  {
    l1: arrayToList([2, 4, 3]),
    l2: arrayToList([5, 6, 4]),
    answer: arrayToList([7, 0, 8]),
  },
  { l1: arrayToList([0]), l2: arrayToList([0]), answer: arrayToList([0]) },
  {
    l1: arrayToList([9, 9, 9, 9, 9, 9, 9]),
    l2: arrayToList([9, 9, 9, 9]),
    answer: arrayToList([8, 9, 9, 9, 0, 0, 0, 1]),
  },
];

testCases.forEach(({ l1, l2, answer }, index) => {
  const result = addTwoNumbers(l1, l2);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: l1 = ${JSON.stringify(listToArray(l1))}, l2 = ${JSON.stringify(listToArray(l2))}`,
  );
  console.log(`Output: ${JSON.stringify(listToArray(result))}`);
  console.log(`Expected: ${JSON.stringify(listToArray(answer))}`);
});
