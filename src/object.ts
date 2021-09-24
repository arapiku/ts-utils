import { cloneDeep, isPlainObject } from "lodash"

/**
 * オブジェクトから value が null | '' の key　を再起的に削除する
 * @param obj オブジェクト
 * @returns value が　null | '' の key を省いたオブジェクト
 */
export function cleanObject<T extends Record<string, any>>(obj: T) {
  const clone = cloneDeep(obj)
  return Object.keys(clone).reduce((acc, k) => {
    const v = clone[k]
    if (isPlainObject(v)) {
      if (Object.values(v).some((vv: any) => ![null, ''].includes(vv))) Object.assign(acc, { [k]: cleanObject(v) })
    } else if (Array.isArray(v)) {
      Object.assign(acc, { [k] : v.map((vv: any) => (isPlainObject(vv) ? cleanObject(vv) : vv)) })
    } else if (![null, ''].includes(v)) {
      Object.assign(acc, { [k] : v })
    }
    return acc
  }, {}) as T
}