// @ts-check
const { writeStyle } = require('@jl-org/js-to-style')
const { resolve } = require('node:path')


writeStyle({
  jsPath: resolve(__dirname, './variable.js'),
  cssPath: resolve(__dirname, './output.css'),
  scssPath: resolve(__dirname, './output.scss'),
})