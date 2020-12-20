function find(str) {
  let hasA = false;
  for (let c of str) {
    if (c === 'a') {
      hasA = true;
    } else if (hasA === true && c === 'b') {
      return true;
    } else {
      hasA = false;
    }
  }
  return false;
}

// 找到是否含有'abcdef'

// 用多个变量表示状态
function find2(str) {
  let hasA = false;
  let hasB = false;
  let hasC = false;
  let hasD = false;
  let hasE = false;
  for (let c of str) {
    if (c === 'a') {
      hasA = true;
    } else if (hasA === true && c === 'b') {
      hasB = true;
      hasA = false;
    } else if (hasB === true && c === 'c') {
      hasC = true;
      hasB = false;
      hasA = false;
    } else if (hasC === true && c === 'd') {
      hasD = true;
      hasC = false;
      hasB = false;
      hasA = false;
    } else if (hasD === true && c === 'e') {
      hasE = true;
      hasD = false;
      hasC = false;
      hasB = false;
      hasA = false;
    } else if (hasE === true && c === 'f') {
      return true;
    } else {
      hasA = false;
      hasB = false;
      hasC = false;
      hasD = false;
      hasE = false;
    }

  }
  return false;
}

//  用当前匹配到的步数表示状态
function find2(str) {
  let step = 0;
  for (let c of str) {
    if (c === 'a') {
      step = 1;
    } else if (step === 1 && c === 'b') {
      step = 2;
    } else if (step === 2 && c === 'c') {
      step = 3;
    } else if (step === 3 && c === 'd') {
      step = 4;
    } else if (step === 4 && c === 'e') {
      step = 5;
    } else if (step === 5 && c === 'f') {
      return true;
    } else {
      step = 0;
    }

  }
  return false;
}

//  用当前匹配到的步数表示状态，并合并重复逻辑
function find2(str) {
  let pattern = 'abcdef';
  let step = 0;

  for (let c of str) {
    if (c === pattern[step]) {
      step++;
      if (step === pattern.length) {
        return true;
      }
    } else {
      step = 0;
    }
  }
  return false;
}

// KMP
function find2(str) {
  str = 'abcdabcdabef'
  let pattern = 'abcdabef';
  let step = 0;

  let table = [];
  for (let c of pattern) {

  }

  for (let c of str) {
    if (c === pattern[step]) {
      step++;
      if (step === pattern.length) {
        return true;
      }
    } else {
      step = 0;
    }
  }
  return false;
}

console.log(find2('dabcdefs'));
