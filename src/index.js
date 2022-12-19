/*!
 * gay-functions v1.1.2
 * https://github.com/liuzg0505/gay-functions
 *
 * Date: 2022-12-19T16:18Z
 */
import arr from './arr.js';
import sfz from './sfz.js';
const gayFn = {
  version: '1.1.2',
  arr,
  sfz,
  sayHello: function () {
    const msg = 'Thanks for using gay-functions!';
    console.log(msg);
    return msg;
  },
};

export default gayFn;
