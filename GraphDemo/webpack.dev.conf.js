const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
    proxy: {
      '/': {
        // target:"http://172.16.10.34:8080",
        // target:"http://172.16.10.25:8805",
        target: '172.10.10.221:8007',
        pathRewrite: { '^/': "" },
        changeOrigin: true
      }
    }
  }
});