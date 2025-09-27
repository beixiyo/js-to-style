import type { ThemeConfig, ParseOptions } from '../types'

/**
 * 生成 CSS 内容
 */
export function generateCSS(
  themeConfig: ThemeConfig,
  options: ParseOptions = {} as ParseOptions
): string {
  const {
    cssPrefix = '--',
    darkClassName = '.dark',
    lightClassName = ':root',
    generateLight = true,
    generateDark = true,
    variableNameTransform = (name: string) => name
  } = options

  const { modes } = themeConfig
  const lines: string[] = []

  // 生成浅色模式变量
  if (generateLight && modes.light) {
    const lightVars = Object.entries(modes.light)
      .map(([key, value]) => `  ${cssPrefix}${variableNameTransform(key)}: ${value};`)
      .join('\n')

    lines.push(`${lightClassName} {\n${lightVars}\n}`)
  }

  // 生成深色模式变量
  if (generateDark && modes.dark) {
    const darkVars = Object.entries(modes.dark)
      .map(([key, value]) => `  ${cssPrefix}${variableNameTransform(key)}: ${value};`)
      .join('\n')

    lines.push(`${darkClassName} {\n${darkVars}\n}`)
  }

  return lines.join('\n\n')
}
