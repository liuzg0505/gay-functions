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

> 根据输入日期随机生成18位身份证号
>
> 校验身份证号

#### getRandomSfzCode

```javascript
// 一个随机的18位身份证号码字符串： 默认范围是 1900/1/1 ~ 2010/12/31
const code = gf.sfz.getRandomSfzCode();
// 设置身份证出生日期范围：
const code2 = gf.sfz.getRandomSfzCode(new Date('1995/5/12'), new Date('2005/10/22'));
```



#### isIdCardNo

> 身份证号码格式校验
>
> **只校验1900 - 2020 年的**

```javascript
// 校验身份证号码
const info = gf.sfz.isIdCardNo('42271419981029917X');
console.log(info);
// {
//    isValid: true,
//    city: '湖北',
//    gender: '男',
// }
```



#### getManySfzCodes

```javascript
// 获取多个：
const codes = gf.sfz.getManySfzCodes();
// [...] 5个随机的18位身份证号码字符串数组

// 指定个数
const codes2 = gf.sfz.getManySfzCodes(10); // 10个

// 指定出生日期范围
const codes3 = gf.sfz.getManySfzCodes(10, new Date('1995/5/12'), new Date('2005/10/22'));
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



