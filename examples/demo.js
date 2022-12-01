import GayFunc from '../dist/index.js';
console.log('GayFunc:', GayFunc);
const title = document.querySelector('.title');
title.textContent = GayFunc.sayHello();

const idcard = document.querySelector('#idcard');
const validIdBtn = document.querySelector('#validIdcard');
const resultBox = document.querySelector('#idValidResult');
validIdBtn.onclick = function () {
  const num = idcard.value.trim();
  const res = GayFunc.sfz.isIdCardNo(num);
  resultBox.textContent = JSON.stringify(res, null, 2);
  hljs.highlightElement(resultBox);
};

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
const tree = GayFunc.arr.arrayToTree(treeOrigArr, {
  idKey: 'id',
  pidKey: 'pid',
  rootPid: '0',
  childKey: 'children',
});
const tree2Arr = GayFunc.arr.treeToArr(tree, { childKey: 'children' });
const tree2ArrV2 = GayFunc.arr.treeToArrV2(tree, {
  childKey: 'children',
});
console.log('treeOrigArr:', treeOrigArr);
console.log('arrayToTree:', tree);
console.log('treeToArr:', tree2Arr);
console.log('treeToArrV2:', tree2ArrV2);
const arrayToTreeResult = document.querySelector('#arrayToTreeResult');
arrayToTreeResult.textContent = JSON.stringify(tree, null, 2);
const treeToArrResult = document.querySelector('#treeToArrResult');
treeToArrResult.textContent = JSON.stringify(tree2Arr, null, 2);

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
const flatArr = GayFunc.arr.flattenArr(unHndArr);
const flatArrV2 = GayFunc.arr.flattenArrV2(unHndArr);
console.log('unHndArr:', unHndArr);
console.log('flatArr:', flatArr);
console.log('flatArrV2:', flatArrV2);
const flattenArrResult = document.querySelector('#flattenArrResult');
flattenArrResult.textContent = JSON.stringify(flatArr, null, 0);
