# gay-functions

> daily-util-functions-for-FE-code-farmer
> 
> 前端好基友日常开发常用工具函数库

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

## gf.sfz

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


