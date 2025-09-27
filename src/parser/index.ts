import { parseThemeObject, isThemeObjectFormat } from './babelParser'
import type { ThemeConfig } from '../types'

/**
 * 解析主题对象文件
 */
export function parseFile(path: string): ThemeConfig {
  if (!isThemeObjectFormat(path)) {
    throw new Error('文件不是主题对象格式，请确保文件包含 theme 对象导出')
  }

  return parseThemeObject(path)
}
