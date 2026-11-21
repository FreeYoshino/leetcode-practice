/**
 * 題號：3331
 * 題目：Find Subtree Sizes After Changes
 * 連結：https://leetcode.com/problems/find-subtree-sizes-after-changes/description/
 * 時間複雜度：O(n)
 * - n 為樹的節點數量
 * - 建立原始樹的鄰接矩陣需要走訪一次 parent 陣列，為 O(n)
 * - 使用 DFS 建立新樹時，每個節點與每條原始邊各會處理一次，為 O(n)
 * - 以 DFS 計算每個節點的子樹大小時，每個節點與每條新邊各會處理一次，為 O(n)
 * - lastOccurrence 固定只需要 26 個位置，查詢與更新皆為 O(1)
 *
 * 空間複雜度：O(n)
 * - origAdjList 與 newAdjList 各最多儲存 n - 1 條邊，為 O(n)
 * - lastOccurrence 固定儲存 26 個字母的最近出現位置，為 O(1)
 * - result 最多儲存 n 個節點的子樹大小，為 O(n)
 * - DFS 遞迴呼叫堆疊最壞情況為 O(n)
 *
 * 解題思路：
 * 1. 先依照 parent 陣列建立原始樹的鄰接矩陣。
 * 2. 使用 DFS 依照原始樹的祖先順序走訪每個節點，並維護 lastOccurrence，記錄每個字母最近出現的祖先節點。
 * 3. 對於目前不是根節點的節點，若該字母已經出現過，就把它掛到最近的相同字母祖先下；否則仍掛到原本的父節點下。
 * 4. 雖然程式會隨著走訪動態修改新樹的鄰接矩陣，但只需在建立完成後再做一次 DFS，計算所有節點的最終子樹大小。
 * 5. 雙 DFS 都會離開子樹後恢復或回傳計算結果，因此不會因為走訪順序影響兄弟節點的判斷與子樹大小。
 */

// --- LeetCode 提供的程式碼模板 ---
function findSubtreeSizes(parent: number[], s: string): number[] {
  const n = parent.length;

  const origAdjList: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    if (parent[i] !== -1) {
      origAdjList[parent[i]].push(i);
    }
  }

  const newAdjList: number[][] = Array.from({ length: n }, () => []);
  const lastOccurrence: number[] = Array(26).fill(-1);

  function buildNewAdjList(node: number): void {
    const charIndex = s.charCodeAt(node) - 'a'.charCodeAt(0);

    // 當前節點不是根節點時 檢查是否有相同字母的節點出現過
    if (node !== 0) {
      const newParent =
        lastOccurrence[charIndex] !== -1
          ? lastOccurrence[charIndex]
          : parent[node];
      newAdjList[newParent].push(node);
    }

    const prev = lastOccurrence[charIndex];
    lastOccurrence[charIndex] = node;

    // 遞迴處理子節點
    for (const child of origAdjList[node]) {
      buildNewAdjList(child);
    }

    // 離開當前節點時 恢復 lastOccurrence
    lastOccurrence[charIndex] = prev;
  }

  buildNewAdjList(0);

  const result: number[] = Array(n).fill(0);

  function calculateSubtreeSizes(node: number): number {
    let size = 1; // 包含當前節點

    // 遞迴計算子節點的大小
    for (const child of newAdjList[node]) {
      size += calculateSubtreeSizes(child);
    }

    result[node] = size;
    return size;
  }

  calculateSubtreeSizes(0);
  return result;
}

// --- 測試案例 ---
interface TestCase {
  parent: number[];
  s: string;
  answer: number[];
}

const testCases: TestCase[] = [
  {
    parent: [-1, 0, 0, 1, 1, 1],
    s: 'abaabc',
    answer: [6, 3, 1, 1, 1, 1],
  },
  {
    parent: [-1, 0, 4, 0, 1],
    s: 'abbba',
    answer: [5, 2, 1, 1, 1],
  },
];

testCases.forEach(({ parent, s, answer }, index) => {
  const result = findSubtreeSizes(parent, s);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: parent = ${JSON.stringify(parent)}, s = ${JSON.stringify(s)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
