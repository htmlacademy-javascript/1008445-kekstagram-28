/* eslint-disable no-unused-vars */
const checkStrLength = (str, len) => str.length <= len;

const checkIsStrPalindrome = (str) => {
  str = str.replaceAll(' ', '').toLowerCase();
  return [ ...str ].reverse().join('') === str;
};

const getNumberFromStr = (val) => {
  val = String(val).replace(/[^0-9]+/g, '');
  return val === '' ? NaN : +val;
};

const returnNewStr = (str, minLen, addStr) => {
  while (minLen > str.length) {
    str = str.replace('', addStr.slice(0, minLen - str.length));
  }

  return str;
};
