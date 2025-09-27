// 使用示例
import { autoParseStyles } from '@jl-org/js-to-style'
import { defineConfig } from 'vite'

// 在 vite.config.ts 中使用插件
export default defineConfig({
  plugins: [
    autoParseStyles({
      // TypeScript 变量文件路径（必选）
      jsPath: './src/styles/variable.ts',

      // ======================
      // * 下面都是可选的
      // ======================

      // 输出 CSS 文件路径
      cssPath: './src/styles/css/autoVariables.css',
      // 输出 SCSS 文件路径
      scssPath: './src/styles/scss/autoVariables.scss',
      // 输出 LESS 文件路径（可选）
      lessPath: './src/styles/less/autoVariables.less',
      // 深色模式类名
      darkClassName: '.dark',
      // 浅色模式类名
      lightClassName: ':root',
      // 是否在开发模式下启用
      dev: true,
      // 是否在构建模式下启用
      build: true,
      // 是否监听文件变化
      watch: true,
    })
  ]
})

// 主题文件示例 (src/styles/variable.ts)
/*
export const theme = {
  light: {
    primaryColor: '#409eff',
    secondaryColor: '#67c23a',
  },
  dark: {
    primaryColor: '#66b1ff',
    secondaryColor: '#85ce61',
  }
}
*/

// 生成的 CSS 文件示例
/*
:root {
  --primaryColor: #409eff;
  --secondaryColor: #67c23a;
}

.dark {
  --primaryColor: #66b1ff;
  --secondaryColor: #85ce61;
}
*/

// 生成的 SCSS 文件示例
/*
$primaryColor: #409eff;
$secondaryColor: #67c23a;

.dark {
  $primaryColor: #66b1ff;
  $secondaryColor: #85ce61;
}
*/

// 生成的 LESS 文件示例
/*
@primaryColor: #409eff;
@secondaryColor: #67c23a;

.dark {
  @primaryColor: #66b1ff;
  @secondaryColor: #85ce61;
}
*/
