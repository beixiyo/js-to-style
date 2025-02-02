import { writeFile } from 'node:fs/promises'
import { parseVar } from './parseVar'
import type { Options } from './types'

/**
 * 写入样式文件
 */
export function writeStyle(
  opts: Options
) {
  const { cssData, scssData, lessData } = parseVar(opts.jsPath)

  const cssVariable = Object.entries(cssData).map(([k, v]) => `${k}: ${v}`).join(';\n  ') + ';'
  const cssText = `:root {
  ${cssVariable}
}`

  const scssText = Object.entries(scssData).map(([k, v]) => `${k}: ${v}`).join(';\n') + ';'
  const lessText = Object.entries(lessData).map(([k, v]) => `${k}: ${v}`).join(';\n') + ';'

  const promArr = []
  opts.cssPath && promArr.push(writeFile(opts.cssPath, cssText))
  opts.scssPath && promArr.push(writeFile(opts.scssPath, scssText))
  opts.lessPath && promArr.push(writeFile(opts.lessPath, lessText))

  return Promise.all(promArr)
}