/**
 * 平级数组转树形结构 arrayToTree
 * @param {Array} arr 原始数组
 * @param {Object} config 配置
 * {
 *    idKey: 数据唯一标识的属性名
 *    pidKey: 数据的父级的唯一标识的属性名
 *    rootPid: 根节点(没有父级就表示是根节点)的pidKey的属性值
 *    childKey: 转换成tree时，下属子级数组的属性名
 * }
 * @returns {Array} tree结构数据
 */
function arrayToTree(arr, config) {
  if (!Array.isArray(arr)) {
    throw new Error(`First param is not an Array:`, arr);
  }
  config = config || {};
  const {
    idKey = 'id',
    pidKey = 'pid',
    rootPid = 'root',
    childKey = 'children',
  } = config;
  const result = [];
  const itemMap = {};
  arr.map((v) => {
    const id = v[idKey];
    const pid = v[pidKey];

    itemMap[id] = { ...v };
    itemMap[id][childKey] = itemMap[id][childKey] || [];

    const treeItem = itemMap[id];

    if (pid === rootPid) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {};
        itemMap[pid][childKey] = [];
      }
      itemMap[pid][childKey].push(treeItem);
    }
  });
  return result;
}
/**
 * 树形结构数组扁平化 treeToArr - 递归方式
 * @param {Array} arr 原始数组
 * @param {Object} config 配置
 * {
 *    childKey: 扁平化时，原tree每个下属子级的属性名
 * }
 * @returns {Array} tree结构数据
 */
function treeToArr(arr, config) {
  if (!Array.isArray(arr)) {
    throw new Error(`First param is not an Array:`, arr);
  }
  const copyArr = JSON.parse(JSON.stringify(arr));
  config = config || {};
  const { childKey = 'children' } = config;
  return copyArr.reduce((pre, next) => {
    const chd = next[childKey];
    delete next[childKey];
    if (chd && chd.length) {
      return pre.concat(next, treeToArr(chd, { childKey }));
    } else {
      return pre.concat(next);
    }
  }, []);
}
/**
 * 树形结构数组扁平化 treeToArrV2 - 堆栈方式
 * @param {Array} arr 原始数组
 * @param {Object} config 配置
 * {
 *    childKey: 扁平化时，原tree每个下属子级的属性名
 * }
 * @returns {Array} tree结构数据
 */
function treeToArrV2(arr, config) {
  if (!Array.isArray(arr)) {
    throw new Error(`First param is not an Array:`, arr);
  }
  config = config || {};
  const { childKey = 'children' } = config;
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const next = stack.pop();
    const chd = next[childKey];
    result.push(next);
    if (chd && chd.length) {
      stack.push(...chd);
    }
  }
  return result.reverse();
}

/**
 * 数组扁平化 flattenArr - 递归
 * 注意：es6有自带方法 arr.flat(Infinity)
 * @param {Array} arr 原始数组
 * @returns {Array} 结果数组
 */
function flattenArr(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`First param is not an Array:`, arr);
  }
  return arr.reduce(
    (res, curr) => res.concat(Array.isArray(curr) ? flattenArr(curr) : curr),
    []
  );
}
/**
 * 数组扁平化 flattenArrV2 - 堆栈
 * 注意：es6有自带方法 arr.flat(Infinity)
 * @param {Array} arr 原始数组
 * @returns {Array} 结果数组
 */
function flattenArrV2(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`First param is not an Array:`, arr);
  }
  // es6其实有自带方法 arr.flat(Infinity)
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}

const common = {
  arrayToTree,
  treeToArr,
  treeToArrV2,
  flattenArr,
  flattenArrV2,
};

export default common;
