/**
 * 題號： 21
 * 標題： Merge Two Sorted Lists
 * 連結： https://leetcode.com/problems/merge-two-sorted-lists/description/
 * 時間複雜度：O(M + N)
 * - 其中M和N分別是list1和list2的長度
 * - 總共會遍歷兩個linked list 各一次 因此時間複雜度為O(M + N)
 * 空間複雜度：O(1)
 * - 只使用了常數級別的額外空間來存儲指針和dummyHead 因此空間複雜度為O(1)
 * 解題思路：
 * 1. 使用dummyHead來簡化邊界條件的處理 然後使用current指針來建立新的linked list
 * 2. 當list1和list2都不為null時 比較兩者的值 將較小的節點連接到current指標的next 並將對應的list指針移動到下一個節點
 * 3. 迴圈結束後 將current指標的next連接到剩餘的list1或list2
 * 4. 回傳dummyHead的next作為合併後的linked list的頭節點
 */

import {
  ListNode,
  arrayToList,
  listToArray,
} from '../../utils/linked-list/singly.ts';

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  const dummyHead = new ListNode(0);
  let current = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }

    current = current.next;
  }

  current.next = list1 || list2;

  return dummyHead.next;
}

interface TestCase {
  list1: ListNode | null;
  list2: ListNode | null;
  answer: number[] | null;
}

const testCases: TestCase[] = [
  {
    list1: arrayToList([1, 2, 4]),
    list2: arrayToList([1, 3, 4]),
    answer: [1, 1, 2, 3, 4, 4],
  },
  { list1: arrayToList([]), list2: arrayToList([]), answer: [] },
  { list1: arrayToList([]), list2: arrayToList([0]), answer: [0] },
];

testCases.forEach(({ list1, list2, answer }, index) => {
  const result = mergeTwoLists(list1, list2);
  const resultArray = listToArray(result);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: list1 = ${JSON.stringify(listToArray(list1))}, list2 = ${JSON.stringify(listToArray(list2))}`,
  );
  console.log(`Output: ${JSON.stringify(resultArray)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
});
