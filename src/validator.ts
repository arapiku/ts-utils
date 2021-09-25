/**
 * エラーが存在するかどうかをチェックする
 * @param error エラーオブジェクト
 * @returns true: あり | false: なし
 */
export function isDirty(error: { [key: string]: any }): boolean {
  return Object.values(error).some(value => {
    return Array.isArray(value) ? value.some(v => isDirty(v)) : !!value
  })
}