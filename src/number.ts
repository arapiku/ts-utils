import { isNil } from 'lodash'

/**
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
const formatter = Intl.NumberFormat('ja-JP', { maximumFractionDigits: 3 }).format

/**
 * 数値を桁数に合うようにゼロパディングする
 * @param num 数値
 * @param length 桁数
 * @returns ゼロパディングされた文字列
 */
export function padZero(num: number | string, length = 2) {
  return !isNaN(Number(num)) ? String(num).padStart(length, '0') : null
}

/**
 * 数値をカンマ区切りでフォーマットする
 * @param num 数値
 * @returns フォーマットされた文字列
 */
export function format(num: number) {
  return !isNil(num) ? formatter(num) : num
}