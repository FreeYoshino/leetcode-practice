/**
 * 題號：2747
 * 題目：Count Zero Request Servers
 * 連結：https://leetcode.com/problems/count-zero-request-servers/description/
 * 時間複雜度：O(m log m + q log q)
 * - 將 logs 依照請求時間排序，需要 O(m log m)
 * - 將 queries 依照查詢時間排序，需要 O(q log q)
 * - 滑動視窗的左右指針最多各掃描 logs 一次，需要 O(m)
 * - 每個查詢只進行常數次的視窗更新與 Map 操作，需要 O(q)
 * - 綜合後由排序成本主導，時間複雜度為 O(m log m + q log q)
 *
 * 空間複雜度：O(n + q)
 * - serverRequestCount 最多記錄 n 台伺服器的請求數量，需要 O(n)
 * - indexedQueries 需要儲存 q 筆帶有索引的查詢，需要 O(q)
 * - result 需要儲存 q 筆查詢結果，需要 O(q)
 * - 因此總空間複雜度為 O(n + q)
 *
 * 解題思路：
 * 1. 先將 logs 依照請求時間排序，並將 queries 按照查詢時間排序，同時保留每個查詢原本的索引。
 * 2. 使用滑動視窗維護目前查詢時間 [queryTime - x, queryTime] 範圍內的所有請求。
 * 3. 右指針持續加入時間不超過 queryTime 的請求，並在 serverRequestCount 中統計每台伺服器的請求次數。
 * 4. 左指針移除早於 queryTime - x 的請求；當某台伺服器的請求數量降為 0 時，從 Map 中刪除。
 * 5. serverRequestCount.size 代表時間區間內有請求的伺服器數量，因此以 n 減去該數量即可得到沒有請求的伺服器數量。
 * 6. 將結果依照查詢原本的索引放回 result，最後回傳 result。
 */

// --- LeetCode 提供的程式碼模板 ---
function countServers(
  n: number,
  logs: number[][],
  x: number,
  queries: number[],
): number[] {
  const logsLength = logs.length;
  const queriesLength = queries.length;

  // sort logs by timestamp
  logs.sort((a, b) => a[1] - b[1]);

  // sort queries by timestamp(with index)
  const indexedQueries = queries.map((query, index) => [query, index]);
  indexedQueries.sort((a, b) => a[0] - b[0]);

  const result: number[] = new Array(queriesLength).fill(0);
  const serverRequestCount = new Map<number, number>();

  let left = 0;
  let right = 0;
  for (const [queryTime, queryIndex] of indexedQueries) {
    const startTime = queryTime - x;
    const endTime = queryTime;

    // Move the right pointer to include logs within the time window
    while (right < logsLength && logs[right][1] <= endTime) {
      const serverId = logs[right][0];
      serverRequestCount.set(
        serverId,
        (serverRequestCount.get(serverId) || 0) + 1,
      );
      right++;
    }

    // Move the left pointer to exclude logs outside the time window
    while (left < logsLength && logs[left][1] < startTime) {
      const serverId = logs[left][0];
      serverRequestCount.set(
        serverId,
        (serverRequestCount.get(serverId) || 0) - 1,
      );
      if (serverRequestCount.get(serverId) === 0) {
        serverRequestCount.delete(serverId);
      }
      left++;
    }

    // Calculate the number of servers with zero requests
    const zeroRequestServers = n - serverRequestCount.size;
    result[queryIndex] = zeroRequestServers;
  }
  return result;
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  logs: number[][];
  x: number;
  queries: number[];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    n: 3,
    logs: [
      [1, 3],
      [2, 6],
      [1, 5],
    ],
    x: 5,
    queries: [10, 11],
    answer: [1, 2],
  },
  {
    n: 3,
    logs: [
      [2, 4],
      [2, 1],
      [1, 2],
      [3, 1],
    ],
    x: 2,
    queries: [3, 4],
    answer: [0, 1],
  },
];

testCases.forEach(({ n, logs, x, queries, answer }, index) => {
  const result = countServers(n, logs, x, queries);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: n = ${n}, logs = ${JSON.stringify(logs)}, x = ${x}, queries = ${JSON.stringify(queries)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
