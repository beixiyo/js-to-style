import { writeFile } from 'node:fs/promises'
import { readVar } from './readVar'
import type { Options } from './types'

/**
 * 写入文件
 */
export function writeStyle(
  {
    jsPath,
    cssPath,
    scssPath,
  }: Options
) {
  const { cssData, scssData } = readVar(jsPath)

  const cssVariable = Object.entries(cssData).map(([k, v]) => `${k}: ${v}`).join(';\n  ') + ';'
  const cssText = `:root {
  ${cssVariable}
}`

  const scssText = Object.entries(scssData).map(([k, v]) => `${k}: ${v}`).join(';\n') + ';'

  return Promise.all([
    writeFile(cssPath, cssText),
    writeFile(scssPath, scssText)
  ])
}