import type { ThemeConfig, ParseOptions } from '../types'

/**
 * 生成 LESS 内容
 */
export function generateLESS(
  themeConfig: ThemeConfig,
  options: ParseOptions = {} as ParseOptions
): string {
  const {
    lessPrefix = '@',
    darkClassName = '.dark',
    generateLight = true,
    generateDark = true,
    variableNameTransform = (name: string) => name
  } = options

  const { modes } = themeConfig
  const lines: string[] = []

  // 生成浅色模式变量
  if (generateLight && modes.light) {
    const lightVars = Object.entries(modes.light)
      .map(([key, value]) => `${lessPrefix}${variableNameTransform(key)}: ${value};`)
      .join('\n')

    lines.push(lightVars)
  }

  // 生成深色模式变量
  if (generateDark && modes.dark) {
    const darkVars = Object.entries(modes.dark)
      .map(([key, value]) => `  ${lessPrefix}${variableNameTransform(key)}: ${value};`)
      .join('\n')

    lines.push(`\n${darkClassName} {\n${darkVars}\n}`)
  }

  return lines.join('\n')
}
