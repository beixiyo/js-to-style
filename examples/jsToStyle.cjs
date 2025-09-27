// @ts-check
const { writeStyle } = require('../dist/index.cjs')
const { resolve } = require('node:path')

writeStyle({
  jsPath: resolve(__dirname, './variable.js'),
  cssPath: resolve(__dirname, './.hidden/output.css'),
  scssPath: resolve(__dirname, './.hidden/output.scss'),
  lessPath: resolve(__dirname, './.hidden/output.less'),
  cssPrefix: '--test-'
})