'use strict';
// const path = require('path');
const config = require('./config');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [];
// if (config.htmlPlugins && config.htmlPlugins.length) {
//   plugins.push(...config.htmlPlugins);
// }
if (config.copyPlugins) {
  plugins.push(config.copyPlugins);
}
module.exports = {
  mode: 'production',
  entry: config.entry,
  output: config.output,
  // module: {
  //   rules: [],
  // },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 要复制的js不需要打包压缩
        exclude: config.jsCopyListRegs,
        extractComments: false, // 不将注释提取到单独的文件中
        terserOptions: {
          compress: {
            // 去除console
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [...plugins],
};
