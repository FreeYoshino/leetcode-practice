/**
 * 題號： 71
 * 標題： Simplify Path
 * 連結： https://leetcode.com/problems/simplify-path/description/
 * 時間複雜度：O(n)
 * - n 為輸入字串 path 的長度
 * - path.split('/') 會走訪整個字串 後續的for迴圈和join() 也是線性走訪 整體時間複雜度為 O(n)
 * 空間複雜度：O(n)
 * - 由path.split('/') 產生的陣列 pathArr 以及用來模擬 stack 的陣列 canonicalArr 使用的空間
 * 解題思路：
 *  1. 將路徑的操作模擬成對 stack 的操作 . 代表 stack 無事發生 .. 代表將stack pop 出最後進入的路徑 "path_name" 代表push 新的路徑到 stack 中
 *  2. 將輸入字串以 '/' 切割
 *  3. 將對路徑的操作模擬成對 stack 的操作
 *  4. 將操作到最後完成的 stack 組合成一道完整的路徑表示形式
 */

function simplifyPath(path: string): string {
  const pathArr: string[] = path.split('/');
  const canonicalArr: string[] = [];

  for (let dir of pathArr) {
    if (!dir || dir === '.') {
      continue;
    } else if (dir === '..') {
      canonicalArr.pop();
    } else {
      canonicalArr.push(dir);
    }
  }

  const result = '/' + canonicalArr.join('/');
  return result;
}

// test case
const case_1 = '/home/';
const case_2 = '/home//foo/';
const case_3 = '/home/user/Documents/../Pictures';
const case_4 = '/../';
const case_5 = '/.../a/../b/c/../d/./';

console.log(`Case_1 result: ${simplifyPath(case_1)}`);
console.log(`Case_2 result: ${simplifyPath(case_2)}`);
console.log(`Case_3 result: ${simplifyPath(case_3)}`);
console.log(`Case_4 result: ${simplifyPath(case_4)}`);
console.log(`Case_5 result: ${simplifyPath(case_5)}`);
