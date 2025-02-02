# 一键将 JS 代码转换为 CSS、SCSS、LESS 代码


## 安装

```bash
npm i @jl-org/js-to-style -D
```


## 快速上手

`scripts/jsToStyle.cjs`
```js
// @ts-check
const { writeStyle } = require('@jl-org/js-to-style')
const { resolve } = require('node:path')


writeStyle({
  jsPath: resolve(__dirname, './variable.js'),
  cssPath: resolve(__dirname, './output.css'),
  scssPath: resolve(__dirname, './output.scss'),
  lessPath: resolve(__dirname, './output.less'),
})
```


`scripts/variable.js`
```js
export const primaryColor = '#409eff'
export let successColor = '#67c23a';
export var warningColor = '#e6a23c'
export const padding = 16;
```