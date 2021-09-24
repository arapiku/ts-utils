import { isDate } from "lodash"
import { padZero } from "./number"

const TIME_REGEX = /(\d+)[:：]?(\d{2})/

/**
 * 時間形式の文字列を時／分のオブジェクトに変換する
 * @param time 時間形式の文字列
 * @returns 時／分のオブジェクト
 */
export function toTimeObject(time: string | Date) {
  if (!time) return {}
  if (isDate(time)) return { hour: padZero(time.getHours()), minute: padZero(time.getMinutes()) }
  const [, hour, minute] = TIME_REGEX.exec(time)
  return { hour, minute }
}

/**
 * 時間形式の文字列を分に変換する
 * @param time 時間形式の文字列
 * @returns 分
 */
export function toMinutes(time: string | Date) {
  const { hour, minute } = toTimeObject(time)
  if (!hour || !minute) return 0
  return +hour * 60 + +minute
}