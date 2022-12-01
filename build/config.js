const path = require('path');
const klawSync = require('klaw-sync');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CleanCSS = require('clean-css');

const resolve = (dir) => path.resolve(__dirname, dir);

// path.sep : 不同平台表示文件路径的分隔符不一样，有的是 '\\' ，有的是 '/'

/* *************************** Config Start ************************ */
// const destFolderPath = 'dist';
// const workFolderName = 'mobile';
// const jsExternals = [
//   'flexible.js',
//   'jaliswall.js',
//   'jquery-2.2.4.min.js',
//   'jquery.fullPage.js',
//   'swiper.min.js',
//   'video.js',
//   'wow.js',
//   'masonry-docs.min.js',
// ];
// const cssExternals = [
//   'animate.min.css',
//   'jquery.fullPage.css',
//   'swiper.min.css',
// ];

const destFolderPath = 'dist';
const workFolderName = 'src';
const jsExternals = [];
const cssExternals = [];
/* *************************** Config End ************************ */

const workFullPath = resolve(`../${workFolderName}`);
// const pathSplit = `\\${workFolderName}`;
// const pathSplit = `${path.sep}${workFolderName}`;

// 要直接复制的js路径配置
const copyJsObj = {};
// 需要直接复制的js文件 但 不需要打包，例如一些第三方依赖包
const jsCopyList = [...jsExternals];
// 转正则
const jsCopyListRegs = jsCopyList.map((v) => new RegExp(v));

// 要直接复制的html路径配置
const copyHtmlObj = {};

// 要打包的css和要直接复制的css路径配置
const packCssObj = {};
// 不需要要压缩的css
const copyCssObj = {};
const cssCopyList = [...cssExternals];
// 转正则
const cssCopyListRegs = cssCopyList.map((v) => new RegExp(v));

// 其他文件 - 直接复制
const otherFileExts = ['.jpg', '.png', '.gif', '.ico', '.jpeg', '.json'];
const otherFileObj = {};

const time1 = +new Date();
// 获取所有文件
const files = klawSync(workFullPath, { nodir: true });

const time2 = +new Date();
console.log('Read file time:', time2 - time1, 'ms');

files.map((file) => {
  // 过滤非项目文件夹
  if (file.path.includes(`${path.sep}.vscode`)) return;
  if (file.path.includes(`${path.sep}.git`)) return;
  if (file.path.includes(`${path.sep}.project`)) return;
  if (file.path.includes(`${path.sep}.DS_Store`)) return;
  if (file.path.includes(`${path.sep}.idea`)) return;
  if (file.path.includes(`${path.sep}.svn`)) return;
  if (file.path.includes(`${path.sep}node_modules`)) return;
  if (file.path.includes(`${path.sep}.package.json`)) return;
  if (file.path.includes(`${path.sep}.package-lock.json`)) return;
  if (file.path.includes(`${path.sep}.yarn-lock.json`)) return;

  const basename = path.basename(file.path);
  const extname = path.extname(file.path);
  // 截取源文件夹名后面的路径 - 相对路径
  // console.log(333,__dirname,2, file.path.split(resolve('../'))[1], 44, path.join(workFolderName, filePath));
  // process.exit(0);
  // 去除build/文件夹外的前缀路径，得到文件相对路径，例如： mobile/about.html
  const fullPath = file.path.split(resolve('../'))[1];
  const fullPathWithoutSrc = file.path.split(resolve(`../${workFolderName}`))[1];

  // console.log(4444,fullPathWithoutSrc, fullPath);

  const regExt = new RegExp(`${extname}$`);
  const withoutExtPath = fullPath.replace(regExt, '').split(path.sep).join('/');

  // console.log(5555, withoutExtPath);

  const sourcePath = resolve(`../${fullPath}`);
  const destPath = resolve(`../${destFolderPath}/${fullPathWithoutSrc}`);
  const copyObj = {
    from: sourcePath,
    to: destPath,
  };
  // 处理js文件
  if (extname === '.js') {
    copyJsObj[withoutExtPath] = { ...copyObj };
  }
  // 处理html文件
  /* if (extname === '.html') {
    copyHtmlObj[withoutExtPath] = { ...copyObj };
  } */
  // 处理css文件
  /* if (extname === '.css') {
    if (cssCopyList.includes(basename)) {
      copyCssObj[withoutExtPath] = { ...copyObj };
    } else {
      packCssObj[withoutExtPath] = {
        ...copyObj,
        // css 压缩
        transform(content) {
          return new CleanCSS({}).minify(content).styles;
        },
      };
    }
  } */
  // 如果是其他文件 - 直接复制
  if (otherFileExts.includes(extname.toLocaleLowerCase())) {
    otherFileObj[withoutExtPath] = { ...copyObj };
  }
});

const time3 = +new Date();
console.log('Handle file time:', time3 - time2, 'ms');

const copyPatterns = [];
if (JSON.stringify(copyHtmlObj) != '{}') {
  copyPatterns.push(...Object.values(copyHtmlObj));
}
if (JSON.stringify(copyJsObj) != '{}') {
  copyPatterns.push(...Object.values(copyJsObj));
}
if (cssCopyList.length) {
  copyPatterns.push(...Object.values(copyCssObj));
}
if (JSON.stringify(packCssObj) != '{}') {
  copyPatterns.push(...Object.values(packCssObj));
}
if (JSON.stringify(otherFileObj) != '{}') {
  copyPatterns.push(...Object.values(otherFileObj));
}

const config = {
  entry: {},
  output: {},
  jsCopyList: jsCopyList,
  jsCopyListRegs: jsCopyListRegs,
  packCssObj: packCssObj,
  copyCssObj: copyCssObj,
  cssCopyList: cssCopyList,
  cssCopyListRegs: cssCopyListRegs,
};
if (copyPatterns.length) {
  config.copyPlugins = new CopyWebpackPlugin({
    patterns: copyPatterns,
  });
}

module.exports = {
  ...config,
};
