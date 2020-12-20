function StringToNumber(str) {
  const reg = /^(0x|0b|0o)?([0-9abcdef]+)$/;
  const matchs = str.match(reg);
  if (!matchs) { throw Error('转换失败') }
  let result = 0;
  let obj = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15
  }
  const nums = matchs[2];
  for (let i = 0; i < nums.length; i++) {
    num = nums[i];
    switch (matchs[1]) {
      case '0x':
        if (obj[num] > 15) {
          throw Error('转换失败');
        }
        result += num * (16 ** (nums.length - 1 - i));
        break;
      case '0o':
        if (obj[num] > 7) {
          throw Error('转换失败');
        }
        result += num * 8 ** (nums.length - 1 - i);
        break;
      case '0b':
        if (obj[num] > 1) {
          throw Error('转换失败');
        }
        result += num * (2 ** (nums.length - 1 - i));
        break;
      case void 0:
        if (obj[num] > 1) {
          throw Error('转换失败');
        }
        result += num * (10 ** (nums.length - 1 - i));
    }
  }
  console.log('result', result);
  return result;
}
function NumberToString(num, base) {
  let obj = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 'a', 11: 'b', 12: 'c', 13: 'd', 14: 'e', 15: 'f'
  }
  if (base === 16) {
    return obj[num];
  }
  let arr = [];
  if (num === 0) {
    return '0';
  }
  while (num !== 0) {
    arr.unshift(obj[num % base]);
    num = Math.floor(num / base);
  }
  console.log('str', arr.join(''));
  return arr.join('');
}
StringToNumber('11');
NumberToString(11, 8);
