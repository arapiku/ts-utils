/**
 * 全角英数記号を半角に変換する
 * @param str 文字列
 * @returns 全角が半角に変換された文字列
 */
export function toHalf(str: string): string {
  return String(str ?? '').replace(
    /[Ａ-Ｚａ-ｚ０-９！＃＄％＆’（）＊＋，ー．／：；＜＝＞？＠「＼」＾＿｀｛｜｝\u3000]/g,
    (v) => String.fromCharCode(v.charCodeAt(0) - 0xfee0),
  )
}

/**
 * 文字列のバイト数を取得する
 * @param value 文字列
 * @returns バイト数
 */
export function getByte(value: string): number {
  return encodeURIComponent(value).replace(/%../g, 'x').length
}

/**
 * CSV形式の文字列を Blob に変換する
 * @param text CSV形式の文字列
 * @returns blob
 */
export function csvTextToBlob(text: string) {
  const bom = new Uint8Array([0xef, 0xbb, 0xbf])
  return new Blob([bom, text], { type: 'text/csv'})
}

/**
 * CSVをダウンロードする
 * @param text CSV形式の文字列
 * @param name ファイル名
 */
export function downloadCSV(text: string, name: string) {
  const blob = csvTextToBlob(text)
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = `${name}.csv`
  link.click()
}