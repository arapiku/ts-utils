/**
 * URL から origin を吐いた文字列を返します
 * @param url URL
 * @returns origin を省いた文字列
 */
export function dropOrigin(url: string) {
  try {
    const { pathname, search, hash } = new URL(url)
    return `${pathname}${search}${hash}`
  } catch {
    return url
  }
}