import { readFileSync } from 'node:fs'


/**
 * @param path 文件路径
 * 
 * 用正则表达式匹配整个代码文件，提取出 
 * - `export const xxx = 'xx'`
 * - `export const xxx = "xx"`
 * - `export const xxx = 16`
 * 
 * 拿出变量名和变量值，如果是字符串，则去掉引号
 */
export function readVar(path: string) {
  const cssCode = readFileSync(path, 'utf-8')
  const reg = /export const (\w+)\s*=\s*(['"])(.*?)\2|export const (\w+)\s*=\s*(\S+)/g
  
  let match: RegExpExecArray | null

  const rawData = {}
  const cssData = {}
  const scssData = {}

  while ((match = reg.exec(cssCode))) {
    if (match[1]) {
      // 匹配到了字符串值
      rawData[match[1]] = match[3]
    }
    else if (match[4]) {
      // 匹配到了非字符串值
      rawData[match[4]] = match[5]
    }
  }

  for (const k in rawData) {
    const item = rawData[k]
    cssData[`--${k}`] = item
    scssData[`$${k}`] = item
  }

  return {
    cssData,
    scssData,
    rawData
  }
}
