/**
 * 数値を桁数に合うようにゼロパディングする
 * @param num 数値
 * @param length 桁数
 * @returns ゼロパディングされた文字列
 */
export function padZero(num: number | string, length = 2) {
  return !isNaN(Number(num)) ? String(num).padStart(length, '0') : null
}