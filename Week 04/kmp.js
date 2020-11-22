function kmp(source, pattern) {
  // 计算table (PMT) table的长度应该与pattern字符串长度一致
  let table = new Array(pattern.length).fill(0);
  {
    // 查找字符串中是否有自重复
    let i = 1, j = 0;
    //  从i开始算，
    // j表示重复的次数
    while (i < table.length) {
      if (pattern[i] === pattern[j]) {
        i++;
        j++;
        table[i] = j;
      } else {
        //  如果前面已经有匹配上的，就只是当前这个字符串没有与原串上的字符匹配
        // 那么我们去看一下，之前匹配到j的时候，j前面匹配上了几个
        // 我们下次将该字符与j处重复的字符开始匹配
        if (j > 0) {
          j = table[j];
        } else {
          ++i;
        }
      }
    }
  }
  {
    // j：pattern的位置，i：source串的位置
    let i = 0, j = 0;
    while (i < source.length) {

      if (pattern[j] === source[i]) {
        i++;
        j++;
      } else {
        // 若没有匹配上，则j回退到table[j],source从table[j]开始匹配后面的字符
        if (j > 0) {
          j = table[j];
        } else {
          i++;
        }
      }
      if (j === pattern.length)
        return true;
    }
    return false;
  }
}

console.log(kmp('ll', 'll'));