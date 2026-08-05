/**
 * 題號：3310
 * 題目：Remove Methods From Project
 * 連結：https://leetcode.com/problems/remove-methods-from-project/description/
 * 時間複雜度：O(n + m)
 * - n 為方法數量，m 為 invocations 的邊數
 * - 建立呼叫圖需要走訪一次 invocations，為 O(m)
 * - 從 k 做 DFS 找出所有可達方法，最多會走訪每個方法與每條邊一次，為 O(n + m)
 * - 檢查是否存在外部方法呼叫 suspiciousMethods 需要再走訪一次 invocations，為 O(m)
 * - 最後整理剩餘方法清單需要 O(n)
 *
 * 空間複雜度：O(n + m)
 * - graph 最多儲存 m 條邊，為 O(n + m)
 * - suspiciousMethods 最多儲存 n 個方法，為 O(n)
 * - DFS 遞迴呼叫堆疊最壞情況為 O(n)
 *
 * 解題思路：
 * 1. 先把 invocations 建成有向圖，表示每個方法會呼叫哪些其他方法。
 * 2. 從起點方法 k 出發做 DFS，把所有可從 k 抵達的方法都標記成 suspiciousMethods。
 * 3. 如果存在某個不在 suspiciousMethods 中的方法，卻呼叫到 suspiciousMethods 中的方法，代表這些方法不能被移除，直接回傳所有方法。
 * 4. 如果沒有外部方法呼叫到 suspiciousMethods，就把所有不在 suspiciousMethods 中的方法收集起來回傳。
 */

// --- LeetCode 提供的程式碼模板 ---
function remainingMethods(
  n: number,
  k: number,
  invocations: number[][],
): number[] {
  // Create a graph to represent the method invocations
  const graph: Map<number, Set<number>> = new Map();
  for (let i = 0; i < invocations.length; i++) {
    const [caller, called] = invocations[i];

    const callerSet = graph.get(caller) ?? new Set();
    callerSet.add(called);
    graph.set(caller, callerSet);
  }

  // dfs function to find all reachable methods from a given method
  const suspiciousMethods: Set<number> = new Set();
  const dfs = (method: number): void => {
    if (suspiciousMethods.has(method)) return;
    suspiciousMethods.add(method);

    const calledMethods = graph.get(method);
    if (!calledMethods) return;
    for (const calledMethod of calledMethods) {
      dfs(calledMethod);
    }
  };

  dfs(k);

  // Check any method can reach the suspicious methods
  for (const [caller, called] of invocations) {
    if (!suspiciousMethods.has(caller) && suspiciousMethods.has(called)) {
      return Array.from({ length: n }, (_, i) => i);
    }
  }

  const result: number[] = [];
  for (let i = 0; i < n; i++) {
    if (!suspiciousMethods.has(i)) {
      result.push(i);
    }
  }
  return result;
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  k: number;
  invocations: number[][];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    n: 4,
    k: 1,
    invocations: [
      [1, 2],
      [0, 1],
      [3, 2],
    ],
    answer: [0, 1, 2, 3],
  },
  {
    n: 5,
    k: 0,
    invocations: [
      [1, 2],
      [0, 2],
      [0, 1],
      [3, 4],
    ],
    answer: [3, 4],
  },
  {
    n: 3,
    k: 2,
    invocations: [
      [1, 2],
      [0, 1],
      [2, 0],
    ],
    answer: [],
  },
];

testCases.forEach(({ n, k, invocations, answer }, index) => {
  const result = remainingMethods(n, k, invocations);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: n = ${n}, k = ${k}, invocations = ${JSON.stringify(invocations)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
