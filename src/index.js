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
