# gay-functions

> daily-util-functions-for-FE-code-farmer
> 
> 前端好基友日常开发常用工具函数库
> 

## 安装
```shell
npm i gay-functions
# or
yarn add gay-functions
```

## 使用
```javascript
import gf from 'gay-functions'
gf.sayHello(); // 'Thanks for using gay-functions!'
```

## Demo

```
参见 examples/demo.html
```


## gf.sfz (0.1.0)

> 校验身份证号

#### isIdCardNo

> 身份证号码格式校验
>
> **只校验1900 - 2020 年的**

```javascript
// 校验身份证号码
const info = gf.sfz.isIdCardNo('422714********917X');
console.log(info);
// {
//    isValid: true,
//    city: '湖北',
//    gender: '男',
// }
```



#### getRandomDateByRange

```javascript
// 获取指定范围内的随机日期: '20021122'
const rndDate = gf.sfz.getRandomDateByRange(); // 随机日期字符串，默认范围：1900/1/1 - 2010/12/31

// 指定日期范围
const rndDate2 = gf.sfz.getRandomDateByRange(new Date('1995/5/12'), new Date('2005/10/22'));
```



#### getRandomNumByLen

```javascript
// 生成多个0-9的随机数 -> 字符串
const rndNumStr = gf.sfz.getRandomNumByLen(); // '1615'
// 指定生成字符串的长度
const rndNumStr2 = gf.sfz.getRandomNumByLen(10); // '5499938490'
```


## gf.arr (0.2.1)

> 数组相关方法

#### arrayToTree(arr, config)
> 平级数组转树形结构

```javascript
import gf from 'gay-functions';
const treeOrigArr = [
  { id: '1', title: 'root 1', pid: '0' },
  { id: '1-1', title: 'child 1-1', pid: '1' },
  { id: '1-2', title: 'child 1-2', pid: '1' },
  { id: '1-1-1', title: 'child 1-1-1', pid: '1-1' },
  { id: '2', title: 'root 2', pid: '0' },
  { id: '3', title: 'root 3', pid: '0' },
  { id: '3-1', title: 'child 3-1', pid: '3' },
  { id: '3-2', title: 'child 3-2', pid: '3' },
  { id: '3-3', title: 'child 3-3', pid: '3' },
  { id: '3-3-1', title: 'child 3-3-1', pid: '3-3' },
];
const tree = gf.arr.arrayToTree(treeOrigArr, {
  idKey: 'id',
  pidKey: 'pid',
  rootPid: '0',
  childKey: 'children',
});
console.log(tree);
```

#### treeToArr(arr, config)
> 树形结构数组扁平化

```javascript
// 树形结构数组扁平化 treeToArr - 递归方式
const tree2Arr = gf.arr.treeToArr(tree, { childKey: 'children' });
console.log('treeToArr:', tree2Arr); // 结果不含 children 属性
// 树形结构数组扁平化 treeToArrV2 - 堆栈方式
// const tree2ArrV2 = gf.arr.treeToArrV2(tree, {
  // childKey: 'children',
// });
// console.log('treeToArrV2:', tree2ArrV2);
```

#### flattenArr(arr)
> 数组扁平化

```javascript
const unHndArr = [
  1,
  2,
  3,
  4,
  [4, 3, 2, 3],
  [[5, 5, 5, [8, 9, 10, 11], 12, 12, 12, 14], 46, 47],
  6,
  8,
];
// 树形结构数组扁平化 flattenArr - 递归方式
const flatArr = gf.arr.flattenArr(unHndArr);
console.log('flatArr:', flatArr);
// 树形结构数组扁平化 flattenArrV2 - 堆栈方式
// const flatArrV2 = gf.arr.flattenArrV2(unHndArr);
// console.log('flatArrV2:', flatArrV2);
```