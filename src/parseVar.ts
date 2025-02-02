import { readFileSync } from 'node:fs'


/**
 * @param path 文件路径
 * 
 * 用正则表达式匹配整个代码文件，提取出 
 * - export const xxx = 'xx'
 * - export var xxx = "xx";
 * - export let xxx = 16
 * 
 * 拿出变量名和变量值，如果是字符串，则去掉引号
 */
export function parseVar(path: string) {
  const cssCode = readFileSync(path, 'utf-8')

  /**
   * 当匹配到字符串值时（如 export const xxx = 'xx'），分组索引是：
   *   match[1]：const、var 或 let
   *   match[2]：变量名
   *   match[3]：引号（' 或 "）
   *   match[4]：字符串值
   * 
   * 当匹配到非字符串值时（如 export let xxx = 16），分组索引是：
   *   match[5]：const、var 或 let
   *   match[6]：变量名
   *   match[7]：非字符串值
   */
  const reg = /export (const|var|let) (\w+)\s*=\s*(['"])(.*?)\3|export (const|var|let) (\w+)\s*=\s*([^\s;]+)?/g

  let match: RegExpExecArray | null

  const rawData: Record<string, string | number> = {}
  const cssData: Record<string, string | number> = {}
  const scssData: Record<string, string | number> = {}
  const lessData: Record<string, string | number> = {}

  while ((match = reg.exec(cssCode))) {
    if (match[2]) {
      // 匹配到了字符串值
      rawData[match[2]] = match[4]
    }
    else if (match[6]) {
      // 匹配到了非字符串值
      rawData[match[6]] = match[7]
    }
  }

  for (const k in rawData) {
    const item = rawData[k]
    cssData[`--${k}`] = item
    scssData[`$${k}`] = item
    lessData[`@${k}`] = item
  }

  return {
    cssData,
    scssData,
    lessData,
    rawData,
  }
}
