'use strict';
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const outputPath = path.join(__dirname, '../dist');

// 清空文件夹
const deleteFolder = (url) => {
  // 判断给定的路径是否存在
  if (fs.existsSync(url)) {
    // 如果存在文件夹 先递归删除该文件夹
    fs.rmSync(url, { recursive: true });
    // 新建文件夹 递归新建
    fs.mkdirSync(url, { recursive: true });
  } else {
    // console.log('给定的路径不存在，请给出正确的路径');
  }
};

deleteFolder(outputPath);
!fs.existsSync(outputPath) && fs.mkdirSync(outputPath, { recursive: true });

console.log('building for production...');
const timeBuildStart = +new Date();
webpack(webpackConfig, function (err, stats) {
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n'
  );

  const timeBuildEnd = +new Date();
  console.log('  Build time: ', timeBuildEnd - timeBuildStart, 'ms\n');
  if (stats.hasErrors()) {
    console.log('  Build failed with errors.\n');
    process.exit(1);
  }

  console.log('  Build complete.\n');
});
