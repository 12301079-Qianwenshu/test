const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

console.log(__dirname)
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]
})
