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