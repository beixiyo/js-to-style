# Auto Parse Styles

自动解析 TypeScript 主题对象文件并生成 CSS/SCSS/LESS 样式文件的工具包，支持深色模式和高度可自定义配置。

## 功能特性

- 🔄 **主题对象解析**: 解析包含 light/dark 主题的 TypeScript 对象
- 🌙 **深色模式**: 支持 light/dark 主题模式，自动生成对应的 CSS 变量
- 🎨 **多格式支持**: 支持生成 CSS、SCSS、LESS 格式
- ⚡ **Vite 插件**: 提供 Vite 插件，支持热更新
- 🔧 **高度可配置**: 支持自定义类名、变量前缀、变量名转换等
- 📦 **TypeScript 支持**: 完整的 TypeScript 类型定义
- 🚀 **多格式构建**: 支持 ES 模块和 CommonJS 格式
- 📁 **类型声明**: 自动生成 `.d.ts` 类型声明文件

## 安装

```bash
# pnpm
pnpm add @jl-org/js-to-style -D

# npm
npm i @jl-org/js-to-style -D
```

## 使用方法

### 1. 作为 Vite 插件使用

在 `vite.config.ts` 中配置插件：

```typescript
import { defineConfig } from 'vite'
import { autoParseStyles } from '@jl-org/js-to-style'

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
```

### 2. 直接调用函数

```typescript
import { writeStyle } from '@jl-org/js-to-style'

// 生成样式文件
await writeStyle({
  jsPath: './src/styles/variable.ts',
  cssPath: './src/styles/css/autoVariables.css',
  scssPath: './src/styles/scss/autoVariables.scss',
  lessPath: './src/styles/less/autoVariables.less',
  // 自定义配置
  darkClassName: '.dark',
  lightClassName: ':root',
  cssPrefix: '--',
  scssPrefix: '$',
  lessPrefix: '@',
})
```

## 变量文件格式

插件只支持主题对象格式，文件必须包含一个名为 `theme` 的导出对象，该对象包含 `light` 和 `dark` 两个主题模式：

```typescript
// src/styles/variable.ts
export const theme = {
  light: {
    primaryColor: '#409eff',
    secondaryColor: '#67c23a',
    successColor: '#67c23a',
    warningColor: '#e6a23c',
    dangerColor: '#f56c6c',
    infoColor: '#909399',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    fontSize: 14,
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)',
  },
  dark: {
    primaryColor: '#66b1ff',
    secondaryColor: '#85ce61',
    successColor: '#85ce61',
    warningColor: '#ebb563',
    dangerColor: '#f78989',
    infoColor: '#a6a9ad',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    fontSize: 14,
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.12)',
  }
}
```

## 生成的文件

### CSS 格式

```css
:root {
  --primaryColor: #409eff;
  --secondaryColor: #67c23a;
  --successColor: #67c23a;
  --warningColor: #e6a23c;
  --dangerColor: #f56c6c;
  --infoColor: #909399;
  --backgroundColor: #ffffff;
  --textColor: #333333;
  --fontSize: 14;
  --borderRadius: 4;
  --boxShadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.dark {
  --primaryColor: #66b1ff;
  --secondaryColor: #85ce61;
  --successColor: #85ce61;
  --warningColor: #ebb563;
  --dangerColor: #f78989;
  --infoColor: #a6a9ad;
  --backgroundColor: #1a1a1a;
  --textColor: #ffffff;
  --fontSize: 14;
  --borderRadius: 4;
  --boxShadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.12);
}
```

### SCSS 格式

```scss
$primaryColor: #409eff;
$secondaryColor: #67c23a;
$successColor: #67c23a;
$warningColor: #e6a23c;
$dangerColor: #f56c6c;
$infoColor: #909399;
$backgroundColor: #ffffff;
$textColor: #333333;
$fontSize: 14;
$borderRadius: 4;
$boxShadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

.dark {
  $primaryColor: #66b1ff;
  $secondaryColor: #85ce61;
  $successColor: #85ce61;
  $warningColor: #ebb563;
  $dangerColor: #f78989;
  $infoColor: #a6a9ad;
  $backgroundColor: #1a1a1a;
  $textColor: #ffffff;
  $fontSize: 14;
  $borderRadius: 4;
  $boxShadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.12);
}
```

### LESS 格式

```less
@primaryColor: #409eff;
@secondaryColor: #67c23a;
@successColor: #67c23a;
@warningColor: #e6a23c;
@dangerColor: #f56c6c;
@infoColor: #909399;
@backgroundColor: #ffffff;
@textColor: #333333;
@fontSize: 14;
@borderRadius: 4;
@boxShadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

.dark {
  @primaryColor: #66b1ff;
  @secondaryColor: #85ce61;
  @successColor: #85ce61;
  @warningColor: #ebb563;
  @dangerColor: #f78989;
  @infoColor: #a6a9ad;
  @backgroundColor: #1a1a1a;
  @textColor: #ffffff;
  @fontSize: 14;
  @borderRadius: 4;
  @boxShadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.12);
}
```

## API 参考

### `autoParseStyles(options)`

Vite 插件函数。

#### 参数

- `options` (`AutoParseStylesPluginOptions`): 插件配置选项

#### 配置选项

| 选项 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| `jsPath` | `string` | ✅ | - | TypeScript 变量文件路径 |
| `cssPath` | `string` | ❌ | - | 输出 CSS 文件路径 |
| `scssPath` | `string` | ❌ | - | 输出 SCSS 文件路径 |
| `lessPath` | `string` | ❌ | - | 输出 LESS 文件路径 |
| `cssPrefix` | `string` | ❌ | `'--'` | CSS 变量前缀 |
| `scssPrefix` | `string` | ❌ | `'$'` | SCSS 变量前缀 |
| `lessPrefix` | `string` | ❌ | `'@'` | LESS 变量前缀 |
| `darkClassName` | `string` | ❌ | `'.dark'` | 深色模式类名 |
| `lightClassName` | `string` | ❌ | `':root'` | 浅色模式类名 |
| `generateLight` | `boolean` | ❌ | `true` | 是否生成浅色模式变量 |
| `generateDark` | `boolean` | ❌ | `true` | 是否生成深色模式变量 |
| `variableNameTransform` | `function` | ❌ | `(name) => name` | 变量名转换函数 |
| `dev` | `boolean` | ❌ | `true` | 是否在开发模式下启用 |
| `build` | `boolean` | ❌ | `true` | 是否在构建模式下启用 |
| `watch` | `boolean` | ❌ | `true` | 是否监听文件变化 |

### `writeStyle(options)`

直接生成样式文件的函数。

#### 参数

- `options` (`ParseOptions`): 配置选项

#### 配置选项

| 选项 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| `jsPath` | `string` | ✅ | - | TypeScript 变量文件路径 |
| `cssPath` | `string` | ❌ | - | 输出 CSS 文件路径 |
| `scssPath` | `string` | ❌ | - | 输出 SCSS 文件路径 |
| `lessPath` | `string` | ❌ | - | 输出 LESS 文件路径 |
| `cssPrefix` | `string` | ❌ | `'--'` | CSS 变量前缀 |
| `scssPrefix` | `string` | ❌ | `'$'` | SCSS 变量前缀 |
| `lessPrefix` | `string` | ❌ | `'@'` | LESS 变量前缀 |
| `darkClassName` | `string` | ❌ | `'.dark'` | 深色模式类名 |
| `lightClassName` | `string` | ❌ | `':root'` | 浅色模式类名 |
| `generateLight` | `boolean` | ❌ | `true` | 是否生成浅色模式变量 |
| `generateDark` | `boolean` | ❌ | `true` | 是否生成深色模式变量 |
| `variableNameTransform` | `function` | ❌ | `(name) => name` | 变量名转换函数 |

## 注意事项

1. 变量名会自动转换为对应的样式变量格式：
   - CSS: `--variableName`
   - SCSS: `$variableName`
   - LESS: `@variableName`

2. 只有 `export const theme` 格式的主题对象会被解析

3. 字符串值会自动去除引号

4. 插件会在以下时机自动运行：
   - Vite 配置解析完成后
   - 构建开始时
   - 监听文件变化时（开发模式）
