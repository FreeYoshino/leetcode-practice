/**
 * 題號： 207
 * 題目： Course Schedule
 * 連結： https://leetcode.com/problems/course-schedule/description/
 * 時間複雜度： O(V + E)
 * 空間複雜度： O(V + E)
 * - V 為課程數，E 為先修關係數量
 * - 鄰接表與 indegree 陣列需要 O(V + E) 的空間，queue 最多也會放入所有課程
 * 解題思路：
 * - 這題可以視為有向圖的拓樸排序問題，若圖中存在環，就代表有課程互相依賴，無法全部修完。
 * - 先建立鄰接表與每門課的 indegree，`indegree[i]` 表示課程 i 還有多少前置課程尚未完成。
 * - 把所有 indegree 為 0 的課程先放進 queue，因為它們可以直接修習。
 * - 每次從 queue 取出一門課，就代表已經完成這門課，並把它指向的後續課程 indegree 減 1；如果某門課的 indegree 變成 0，就加入 queue。
 * - 最後如果能修完的課程數等於 `numCourses`，表示沒有循環依賴，可以完成所有課程；否則就代表圖中有環，無法修完。
 */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // 建立鄰接表: 前置課程 -> 後續課程 graph[i] = [j1, j2, ...] 表示課程 i 是課程 j1, j2, ... 的前置課程
  const graph: Map<number, number[]> = new Map();
  const inDegree: number[] = new Array(numCourses).fill(0);
  for (const [course, prereq] of prerequisites) {
    if (!graph.has(prereq)) {
      graph.set(prereq, []);
    }

    inDegree[course]++;
    graph.get(prereq)!.push(course);
  }

  // 找出所有 indegree 為 0 的課程，表示這些課程沒有前置課程，可以直接修習
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  // BFS 遍歷課程，將可以修習的課程加入 queue，並更新後續課程的 indegree
  let count = 0; // 紀錄已經修習的課程數量
  while (queue.length > 0) {
    const course = queue.shift()!;
    count++;

    for (const nextCourse of graph.get(course) || []) {
      inDegree[nextCourse]--;

      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // count === numCourses 代表所有課程都可以修習完畢，否則表示存在循環依賴，無法完成所有課程
  return count === numCourses;
}

interface TestCase {
  numCourses: number;
  prerequisites: number[][];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    numCourses: 2,
    prerequisites: [[1, 0]],
    answer: true,
  },
  {
    numCourses: 2,
    prerequisites: [
      [1, 0],
      [0, 1],
    ],
    answer: false,
  },
];

testCases.forEach(({ numCourses, prerequisites, answer }, index) => {
  const result = canFinish(numCourses, prerequisites);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: numCourses = ${numCourses}, prerequisites = ${JSON.stringify(prerequisites)}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
