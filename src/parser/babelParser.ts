import { readFileSync } from 'node:fs'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import type { ThemeConfig } from '../types'

/**
 * 使用 Babel 解析器解析主题对象
 */
export function parseThemeObject(path: string): ThemeConfig {
  const code = readFileSync(path, 'utf-8')

  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'decorators-legacy']
  })

  let themeConfig: ThemeConfig | null = null

  traverse(ast, {
    ExportDefaultDeclaration(path: any) {
      const { declaration } = path.node
      if (t.isObjectExpression(declaration)) {
        themeConfig = parseObjectExpression(declaration)
      }
    },
    ExportNamedDeclaration(path: any) {
      const { declaration } = path.node
      if (t.isVariableDeclaration(declaration)) {
        const declarator = declaration.declarations[0]
        if (t.isIdentifier(declarator.id) && declarator.id.name === 'theme') {
          if (t.isObjectExpression(declarator.init)) {
            themeConfig = parseObjectExpression(declarator.init)
          }
        }
      }
    }
  })

  if (!themeConfig) {
    throw new Error('未找到主题对象导出，请确保文件包含默认导出或名为 theme 的命名导出')
  }

  return themeConfig
}

/**
 * 解析对象表达式
 */
function parseObjectExpression(obj: t.ObjectExpression): ThemeConfig {
  const modes: { light: Record<string, string | number>; dark: Record<string, string | number> } = {
    light: {},
    dark: {}
  }

  for (const property of obj.properties) {
    if (t.isObjectProperty(property)) {
      let key: string

      // 获取键名
      if (t.isIdentifier(property.key)) {
        key = property.key.name
      }
      else if (t.isStringLiteral(property.key)) {
        key = property.key.value
      }
      else {
        continue
      }

      if (key === 'light' || key === 'dark') {
        if (t.isObjectExpression(property.value)) {
          modes[key] = parseModeObject(property.value)
        }
      }
    }
  }

  return { modes }
}

/**
 * 解析模式对象（light 或 dark）
 */
function parseModeObject(obj: t.ObjectExpression): Record<string, string | number> {
  const result: Record<string, string | number> = {}

  for (const property of obj.properties) {
    if (t.isObjectProperty(property)) {
      let key: string
      let value: string | number

      // 获取键名
      if (t.isIdentifier(property.key)) {
        key = property.key.name
      }
      else if (t.isStringLiteral(property.key)) {
        key = property.key.value
      }
      else {
        continue
      }

      // 获取值
      if (t.isStringLiteral(property.value)) {
        value = property.value.value
      }
      else if (t.isNumericLiteral(property.value)) {
        value = property.value.value
      }
      else if (t.isBooleanLiteral(property.value)) {
        value = property.value.value ? 1 : 0
      }
      else {
        continue
      }

      result[key] = value
    }
  }

  return result
}

/**
 * 检测文件是否包含主题对象格式
 */
export function isThemeObjectFormat(path: string): boolean {
  try {
    const code = readFileSync(path, 'utf-8')
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'decorators-legacy']
    })

    let hasThemeExport = false

    traverse(ast, {
      ExportDefaultDeclaration(path: any) {
        const { declaration } = path.node
        if (t.isObjectExpression(declaration)) {
          hasThemeExport = true
        }
      },
      ExportNamedDeclaration(path: any) {
        const { declaration } = path.node
        if (t.isVariableDeclaration(declaration)) {
          const declarator = declaration.declarations[0]
          if (t.isIdentifier(declarator.id) && declarator.id.name === 'theme') {
            hasThemeExport = true
          }
        }
      }
    })

    return hasThemeExport
  }
  catch {
    return false
  }
}
