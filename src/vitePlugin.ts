import type { Plugin } from 'vite'
import { writeStyle } from './writeStyle'
import type { AutoParseStylesPluginOptions } from './types'

/**
 * 自动解析样式变量并生成 CSS | SCSS | LESS 文件的 Vite 插件
 */
export function autoParseStyles(options: AutoParseStylesPluginOptions): Plugin {
  const {
    watch = true,
  } = options

  let isFirstRun = true

  const runWriteStyle = () => {
    try {
      writeStyle(options)
      console.log('✅ Auto parse styles completed')
    }
    catch (error) {
      console.error('❌ Auto parse styles failed:', error)
    }
  }

  return {
    name: 'auto-parse-styles',
    configResolved() {
      // 在配置解析完成后运行一次
      if (isFirstRun) {
        runWriteStyle()
        isFirstRun = false
      }
    },
    buildStart() {
      // 在构建开始时运行
      runWriteStyle()
    },
    configureServer(server) {
      if (watch) {
        try {
          server.watcher.add(options.jsPath)
          console.log(`👀 Watching file: ${options.jsPath}`)

          // 监听文件变化事件
          server.watcher.on('change', (filePath) => {
            if (filePath === options.jsPath) {
              console.log(`📝 File changed: ${options.jsPath}`)
              runWriteStyle()
            }
          })
        }
        catch (error) {
          console.warn(`⚠️ Failed to watch file ${options.jsPath}:`, error)
        }
      }
    }
  }
}
