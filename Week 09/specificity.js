function specificity(selector) {
  const p = [0, 0, 0, 0];
  const selectorParts = selector.split(' ');
  for (let part of selectorParts) {
    let reg = /^([_\-a-zA-Z]+[_\-a-zA-Z0-9]*)*(#[_\-a-zA-Z]+[_-a-zA-Z0-9]*)*(\.[_\-a-zA-Z]+[_\-a-zA-Z0-9]*)*$/;
    let matchs = part.match(reg);
    if (matchs) {
      for (let i = 1; i < matchs.length; i++) {
        if (matchs[i]) {
          if (matchs[i][0] === '#') {
            p[1] += 1;
          } else if (matchs[i][0] === '.') {
            p[2] += 1;
          } else {
            p[3] += 1;
          }
        }

      }
    }
  }
  return p;
}
specificity('div .sc');
