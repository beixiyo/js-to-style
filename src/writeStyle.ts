import { parseFile } from './parser'
import { generateCSS, generateSCSS, generateLESS } from './generator'
import type { ParseOptions } from './types'
import { forceWriteFile } from './tools'

/**
 * 写入样式文件
 */
export function writeStyle(opts: ParseOptions) {
  const themeConfig = parseFile(opts.jsPath)

  // 生成 CSS
  if (opts.cssPath) {
    const cssContent = generateCSS(themeConfig, opts)
    forceWriteFile(opts.cssPath, cssContent)
  }

  // 生成 SCSS
  if (opts.scssPath) {
    const scssContent = generateSCSS(themeConfig, opts)
    forceWriteFile(opts.scssPath, scssContent)
  }

  // 生成 LESS
  if (opts.lessPath) {
    const lessContent = generateLESS(themeConfig, opts)
    forceWriteFile(opts.lessPath, lessContent)
  }
}
