/**
 * 題號：3348
 * 題目：Smallest Divisible Digit Product II
 * 連結：https://leetcode.com/problems/smallest-divisible-digit-product-ii/description/
 * 時間複雜度：O(n)
 * - n 為輸入字串 nums 的長度
 * - 先建立 4 個前綴統計陣列來記錄 2、3、5、7 的出現次數，為 O(n)
 * - 接著從右到左嘗試每個位置，最多嘗試 9 個替換數字，且每次檢查均為常數次操作
 * - 因此整體時間複雜度為 O(n)
 *
 * 空間複雜度：O(n)
 * - 需要 4 個長度為 n + 1 的前綴陣列來記錄質因數數量
 * - 其餘空間皆為常數級，故總空間複雜度為 O(n)
 *
 * 解題思路：
 * 1. 先把 t 分解成 2、3、5、7 的質因數需求量。
 * 2. 檢查原始字串是否已經滿足條件；若有 0，則不能把 0 放在前綴中。
 * 3. 建立前綴統計，快速得知某個位置之前已經使用了多少個 2、3、5、7。
 * 4. 從右到左嘗試將當前位數替換成更大的數字，並用貪婪方式組合後綴，讓剩餘需求盡量用最短的數字串補齊。
 * 5. 若原長度無法成立，則回傳一個比原字串更長、且最小可行的數字，必要時用 1 補齊。
 */

type PrimeFactors = readonly [number, number, number, number];

interface FactorExtractionResult {
  readonly factors: PrimeFactors;
  readonly remaining: number;
}

interface SuffixResult {
  readonly length: number;
  readonly suffix: string;
}

class PrimeFactorHelper {
  private static readonly DIGIT_FACTORS: PrimeFactors[] = [
    [0, 0, 0, 0], // 0
    [0, 0, 0, 0], // 1
    [1, 0, 0, 0], // 2
    [0, 1, 0, 0], // 3
    [2, 0, 0, 0], // 4
    [0, 0, 1, 0], // 5
    [1, 1, 0, 0], // 6
    [0, 0, 0, 1], // 7
    [3, 0, 0, 0], // 8
    [0, 2, 0, 0], // 9
  ];

  // 取得一個Digit的質因數分解
  public static getDigitFactors(digit: number): PrimeFactors {
    return this.DIGIT_FACTORS[digit];
  }

  // 提取一個數字的質因數分解，返回質因數的數量和剩餘的部分
  public static extractFactors(num: number): FactorExtractionResult {
    let [count2, count3, count5, count7] = [0, 0, 0, 0];
    let remaining = num;
    while (remaining % 2 === 0) {
      count2++;
      remaining /= 2;
    }
    while (remaining % 3 === 0) {
      count3++;
      remaining /= 3;
    }
    while (remaining % 5 === 0) {
      count5++;
      remaining /= 5;
    }
    while (remaining % 7 === 0) {
      count7++;
      remaining /= 7;
    }

    return { factors: [count2, count3, count5, count7], remaining };
  }

  /**
   * Greedy Digits Builder
   * 給定質因數的需求數量，返回最小的數字組合
   *
   * @param reqFactors - 需要的質因數數量 [count of 2s, count of 3s, count of 5s, count of 7s]
   * @returns SuffixResult - 包含最小數字組合的長度和字串表示
   */
  public static getMinSuffix(reqFactors: PrimeFactors): SuffixResult {
    const [req2, req3, req5, req7] = reqFactors;

    // 先組合為更大的digit (例如 8, 9, 6, 4) 以減少數字的長度
    const c8 = Math.floor(req2 / 3);
    const rem2 = req2 % 3;
    const c9 = Math.floor(req3 / 2);
    const rem3 = req3 % 2;
    const c5 = req5;
    const c7 = req7;

    let cnt2 = 0,
      cnt3 = 0,
      cnt4 = 0,
      cnt6 = 0;
    // 處理剩餘的 2、3 組合為: (空, '2', '3', '4', '6','26')
    if (rem2 === 0 && rem3 === 1) cnt3++;
    else if (rem2 === 1 && rem3 === 0) cnt2++;
    else if (rem2 === 1 && rem3 === 1) cnt6++;
    else if (rem2 === 2 && rem3 === 0) cnt4++;
    else if (rem2 === 2 && rem3 === 1) (cnt2++, cnt6++);

    const length = cnt2 + cnt3 + cnt4 + cnt6 + c5 + c7 + c8 + c9;
    const suffix =
      '2'.repeat(cnt2) +
      '3'.repeat(cnt3) +
      '4'.repeat(cnt4) +
      '5'.repeat(c5) +
      '6'.repeat(cnt6) +
      '7'.repeat(c7) +
      '8'.repeat(c8) +
      '9'.repeat(c9);
    return { length, suffix };
  }
}

// --- LeetCode 提供的程式碼模板 ---
function smallestNumber(num: string, t: number): string {
  // 檢查t是否合法(只能是2,3,5,7的質因數組合)
  const { factors, remaining } = PrimeFactorHelper.extractFactors(t);
  if (remaining > 1) return '-1';

  const [req2, req3, req5, req7] = factors;
  const n = num.length;

  // 檢查原始數字是否滿足條件
  let firstZeroIndex = num.indexOf('0');
  if (firstZeroIndex === -1) {
    firstZeroIndex = n; // 不包含digit '0'，設為n 允許後續檢查

    let [c2, c3, c5, c7] = [0, 0, 0, 0];
    for (const digit of num) {
      const d = parseInt(digit);
      const [f2, f3, f5, f7] = PrimeFactorHelper.getDigitFactors(d);
      c2 += f2;
      c3 += f3;
      c5 += f5;
      c7 += f7;
    }
    if (c2 >= req2 && c3 >= req3 && c5 >= req5 && c7 >= req7) {
      return num; // 原始數字已經滿足條件
    }
  }

  // 計算前綴的質因數數量
  const pref2 = Array(n + 1).fill(0);
  const pref3 = Array(n + 1).fill(0);
  const pref5 = Array(n + 1).fill(0);
  const pref7 = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    pref2[i + 1] = pref2[i];
    pref3[i + 1] = pref3[i];
    pref5[i + 1] = pref5[i];
    pref7[i + 1] = pref7[i];

    const d = parseInt(num[i]);
    if (d > 0) {
      const [c2, c3, c5, c7] = PrimeFactorHelper.getDigitFactors(d);
      pref2[i + 1] += c2;
      pref3[i + 1] += c3;
      pref5[i + 1] += c5;
      pref7[i + 1] += c7;
    }
  }

  // 從低位開始檢查可修改的位置 i(不能在 firstZeroIndex 之後，因為前綴不能包含 '0')
  for (let i = Math.min(firstZeroIndex, n - 1); i >= 0; i--) {
    const currentDigit = parseInt(num[i]);

    // 嘗試將當前digit替換為更大的digit
    for (let newDigit = currentDigit + 1; newDigit <= 9; newDigit++) {
      let [c2, c3, c5, c7] = PrimeFactorHelper.getDigitFactors(newDigit);

      // 計算當前還須要的質因數數量 = 需求 - 前綴的質因數數量 - 當前digit的質因數數量
      const needFactors: PrimeFactors = [
        Math.max(0, req2 - (pref2[i] + c2)),
        Math.max(0, req3 - (pref3[i] + c3)),
        Math.max(0, req5 - (pref5[i] + c5)),
        Math.max(0, req7 - (pref7[i] + c7)),
      ];

      const { length: minlen, suffix } =
        PrimeFactorHelper.getMinSuffix(needFactors);
      const space = n - (i + 1); // 後綴的空間長度
      if (minlen <= space) {
        // 可以組合出滿足條件的數字，構建最終結果
        const prefix = num.slice(0, i) + newDigit.toString();
        const paddingOnes = '1'.repeat(space - minlen); // 填充 '1' 以保證數字最小
        const result = prefix + paddingOnes + suffix;
        return result;
      }
    }
  }

  /**
   * 長度增加時的fallback策略
   * 當在原字串長度n中無解時，代表至少需要長度為n+1的數字才能滿足條件
   * targetLength 需要同時滿足兩道下限門檻
   * 1. 數值下限(n+1): 即使suffix長度小於n+1，仍然需要至少n+1位數字，以確保最後的數值嚴格大於原始數字
   * 2. suffix長度下限(minlen): 若需滿足的質因數組合的suffix長度大於n+1，則需要至少minlen位數字，無須再填充 '1'，因為suffix本身已經足夠長
   */
  const { length: minlen, suffix } = PrimeFactorHelper.getMinSuffix(factors);
  const targentLength = Math.max(n + 1, minlen);
  return '1'.repeat(targentLength - minlen) + suffix;
}

// --- 測試案例 ---
interface TestCase {
  nums: string;
  t: number;
  answer: string;
}

const testCases: TestCase[] = [
  {
    nums: '1234',
    t: 256,
    answer: '1488',
  },
  {
    nums: '12355',
    t: 50,
    answer: '12355',
  },
  {
    nums: '11111',
    t: 26,
    answer: '-1',
  },
];

testCases.forEach(({ nums, t, answer }, index) => {
  const result = smallestNumber(nums, t);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${nums}, t = ${t}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
