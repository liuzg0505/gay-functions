/*!
 * gay-functions v0.2.1
 * https://github.com/liuzg0505/gay-functions
 * 
 * Date: 2022-12-01T17:38Z
 */
import arr from './arr.js';
import sfz from './sfz.js';
const gayFn = {
  arr,
  sfz,
  sayHello: function () {
    const msg = 'Thanks for using gay-functions!';
    console.log(msg);
    return msg;
  },
};

export default gayFn;
