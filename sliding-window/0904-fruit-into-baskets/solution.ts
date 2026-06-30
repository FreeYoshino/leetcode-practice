/**
 * 題號： 904
 * 標題： Fruit Into Baskets
 * 連結： https://leetcode.com/problems/fruit-into-baskets/description/
 * 時間複雜度：O(n)
 * 空間複雜度：O(1)
 * 解題思路：
 * 使用sliding window搭配 Map 記錄目前區間內每種水果的數量。
 * 當視窗內水果種類超過兩種時，持續移動左邊界並更新計數，
 * 直到種類數回到兩種以內。每次都用目前視窗長度更新答案，
 * 就能找出最多可以收集的水果數量。
 */

function totalFruit(fruits: number[]): number {
  let fruitCount = new Map<number, number>(); // 儲存每種水果的數量
  let left = 0;
  let maxFruits = 0;
  for (let right = 0; right < fruits.length; right++) {
    const fruit = fruits[right];
    fruitCount.set(fruit, (fruitCount.get(fruit) || 0) + 1); // 更新水果數量

    // 如果水果種類超過兩種 縮小左邊界
    while (fruitCount.size > 2) {
      const leftFruit = fruits[left];
      fruitCount.set(leftFruit, fruitCount.get(leftFruit)! - 1); // 減少左邊水果的數量
      left++; // 移動左邊界
      if (fruitCount.get(leftFruit) === 0) {
        fruitCount.delete(leftFruit); // 如果數量為0，刪除該水果種類
      }
    }

    // 更新最大水果數量
    maxFruits = Math.max(maxFruits, right - left + 1);
  }

  return maxFruits;
}

interface TestCase {
  fruits: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { fruits: [1, 2, 1], answer: 3 },
  { fruits: [0, 1, 2, 2], answer: 3 },
  { fruits: [1, 2, 3, 2, 2], answer: 4 },
];

testCases.forEach(({ fruits, answer }, index) => {
  const result = totalFruit(fruits);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: fruits = ${JSON.stringify(fruits)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
