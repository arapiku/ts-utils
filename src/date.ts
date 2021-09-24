import { format, isValid, parseISO } from "date-fns"

/**
 * 日付形式の文字列までは Date オブジェクトを pattern 形式に変換する
 * @param date 日付形式の文字列または Date オブジェクト
 * @param pattern 形式
 * @returns pattern 形式に format された文字列
 */
export function formatDate(date: string | Date, pattern = 'yyyy年M月d日') {
  if (!date) return ''
  const d = typeof date === 'string' ? parseISO(date) : date
  return isValid(d) ? format(d, pattern) : ''
}