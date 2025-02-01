# 一键将 JS 代码转换为 CSS、SCSS 代码


## 安装

```bash
npm i @jl-org/js-to-style -D
```


## 快速上手

```bash
touch scripts/jsToStyle.cjs
```

`scripts/jsToStyle.cjs`
```js
// @ts-check
const { writeStyle } = require('@jl-org/js-to-style')
const { resolve } = require('node:path')


writeStyle({
  jsPath: resolve(__dirname, './variable.js'),
  cssPath: resolve(__dirname, './output.css'),
  scssPath: resolve(__dirname, './output.scss'),
})
```


`variable.js`
```js
export const primaryColor = '#409eff'
export const successColor = '#67c23a'
export const warningColor = '#e6a23c'
export const dangerColor = '#f56c6c'
```