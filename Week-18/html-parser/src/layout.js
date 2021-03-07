export function layout(element) {
  if (!element.computedStyle) {
    return;
  }
  let elementStyle = getStyle(element);
  // 预处理
  if (elementStyle.display !== 'flex') {
    return;
  }
  // 将 children 的文本节点等过滤掉
  const childrenItems = element.children.filter(({ type }) => type === 'element');

  // 排序(根据 order 属性) 使用原生 sort 方法进行排序
  childrenItems.sort(function (a, b) {
    return (a.order || 0 - b.order || 0);
  });

  const style = elementStyle;

  // width 和 height 属性如果是空的或者是 auto，则将其置为 null，方便后面处理
  ['widtth', 'height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  });

  style.flexDirection = style.flexDirection || 'row';
  // alignItems 默认值是 stretch
  style.alignItems = style.alignItems || 'stretch';
  style.justifyContent = style.justifyContent || 'flex-start';
  style.flexWrap = style.flexWrap || 'nowrap';
  style.alignContent = style.alignContent || 'stretch';

  let mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase;
  if (style.flexDirection === 'row') {
    mainSize = 'width'; // 主轴尺寸
    mainStart = 'left'; // 
    mainEnd = 'right';
    mainSign += 1; // 相当于当前子元素的 index
    mainBase = 0; // 开始排列的初始位置值  （从左或从右）

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width'; // 主轴尺寸
    mainStart = 'right'; // 
    mainEnd = 'left';
    mainSign -= 1; // 相当于当前子元素的 index
    mainBase = 'width'; // 开始排列的初始位置值  （从左或从右）

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'column') {
    mainSize = 'height'; // 主轴尺寸
    mainStart = 'top'; // 
    mainEnd = 'bottom';
    mainSign += 1; // 相当于当前子元素的 index
    mainBase = 0; // 开始排列的初始位置值  （从左或从右）

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height'; // 主轴尺寸
    mainStart = 'bottom'; // 
    mainEnd = 'top';
    mainSign -= 1; // 相当于当前子元素的 index
    mainBase = 'height'; // 开始排列的初始位置值  （从左或从右）

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'righ';
  }

  // 反向换行，第一行在下方，第二行在上方
  // crossStart和crossEnd互换
  if (style.flexWrap === 'wrap-reverse') {
    let [a, b] = [crossEnd, crossStart];
    crossStart = a;
    crossEnd = b;
    crossSign = 1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

}

// 样式预处理
// 主要是将像素相关的字符串转成数字
function getStyle(element) {
  if (!element.style) {
    element.style = {};
  }

  for (let prop in element.computedStyle) {
    element.style[prop] = element.computedStyle[prop].value;

    // 可以将 '12px' 转换成数字12
    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }

    // 对纯数字的也转换一下，因为写入样式的时候都是字符串
    if (element.style[prop].toString().match(/^[0-9\.]$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }
  return element.style;
}