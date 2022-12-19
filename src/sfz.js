// 城市编码范围
const citys = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外',
};
// 是否是Date对象
function isDate(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
}
// 生成0-9的随机数
function getRandomNum() {
  return Math.floor(Math.random() * 10);
}
// 生成多个0-9的随机数
function getRandomNumByLen(len = 4) {
  const result = Array(len)
    .fill('')
    .map(() => getRandomNum())
    .join('');
  return result;
}

function addZero(n) {
  return n < 10 ? '0' + n : n;
}
// 获取指定范围内的随机日期 20021122
function getRandomDateByRange(min, max) {
  if (!min || !isDate(min)) {
    min = new Date('1900/1/1');
  }
  if (!max) {
    max = new Date('2010/12/31');
  }
  if (!isDate(max)) {
    max = new Date();
  }
  if (+min > +max) {
    const t = min;
    min = max;
    max = t;
  }
  const maxDate = +max;
  const minDate = +min;
  const randomTimestamp = parseInt(
    Math.random() * (maxDate - minDate) + minDate
  );
  const randomDate = new Date(randomTimestamp);
  const rndYear = randomDate.getFullYear();
  const rndMonth = addZero(randomDate.getMonth() + 1);
  const rndDate = addZero(randomDate.getDate());
  const result = `${rndYear}${rndMonth}${rndDate}`;
  return result;
}

/**
 * 对应的身份证正则校验规则：
 * 只校验1900 - 2020 年的
 */
function isIdCardNo(code) {
  const reg = isIdCardNo.prototype.IdReg;
  var city = citys;
  var tip = '';
  var pass = true;
  if (
    !code ||
    !reg.test(
      code
    )
  ) {
    tip = '身份证号格式错误';
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = '身份证号格式错误';
    pass = false;
  } else {
    code = code.toUpperCase();
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      if (parity[sum % 11] != code[17]) {
        tip = '身份证号格式错误';
        pass = false;
      }
    }
  }
  var ct = '';
  var gender = '';
  if (!pass) {
    // alert(tip);
  } else {
    code = code.join('');
    ct = city[code.substr(0, 2)] || '';
    gender = code.substr(-2, 1) % 2 === 0 ? '女' : '男';
  }
  return {
    isValid: pass,
    city: ct,
    gender: gender,
  };
}

isIdCardNo.prototype.IdReg = /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|201[0-9]|2020)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i;

const sfz = {
  getRandomDateByRange,
  getRandomNumByLen,
  isIdCardNo,
};
export default sfz;
