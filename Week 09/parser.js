let css = require('css');
const EOF = Symbol('EOF');
// 每一个 tag 当作一个 token 处理
let currentToken = null;
let currentAttribute = null;

let stack = [{ type: 'document', children: [] }];

// 输出 token
function emit(token) {
  console.log(token);
  const top = stack[stack.length - 1];
  if (token.type === 'text') {
    return;
  }
  if (token.type === 'startTag') {
    const element = {
      type: 'element',
      children: [],
      attributes: []
    }
    element.tagName = token.tagName;
    for (let p in token) {
      if (p !== 'type' || p !== 'tagName') {
        element.attributes.push({ p: token[p] })
      }
    }
    // 在 startTag 时，应用它的 css 
    computeCss(element);
    top.children.push(element);
    element.parent = top;
    // 非自封闭标签需要push到栈中，以使后面的标签可以依靠栈顶元素找到自己的父节点
    if (!token.isSelfClosing) {
      stack.push(element);
    }
  } else if (token.type === 'endTag') {
    if (token.tagName === top.tagName) {
      if (top.tagName === 'style') {
        // 只考虑 style 标签样式
        addCssRules(top.children[0].content);
      }
      stack.pop(top);
    } else {
      throw new Error("tag start end doesn't match ");
    }
  }
}

let rules = [];
// 解析 css 规则
function addCssRules(text) {
  let ast = css.parse(text);
  console.log(JSON.stringify(ast, null, "  "));
  rules.push(...ast.stylesheet.rules);
}

// 计算 element 的 css应用
function computeCss(element) {
  // 在 startTag 时，stack 中的所有元素就是当前元素的父元素
  // reverse 将数组反排，要先计算当前元素的 css，周后从内向外计算 css
  const elements = stack.slice().reverse();
  if (!element.computedStyle) {
    element.computedStyle = {};
  }
  // 遍历所有的 css 规则
  for (let rule of rules) {
    // 不考虑逗号分隔的选择器
    const selectors = rule.selectors[0].split(" ").reverse();
    if (!match(element, selectors[0])) {
      continue;
    }
    let j = 0;
    let matched = false;
    // 需要遍历当前元素的父元素，是否能匹配当前选择器
    for (let i = 1; i < elements.length; i++) {
      if (match(elements[i], selectors[j])) {
        j++;
      }
      if (j >= selectors.length) {
        matched = true;
        break;
      }
    }
    if (j < selectors.length) {
      matched = false;
    }
    if (matched) {
      console.log("Element", element, "matched", "rule", rule);
      let sp = specificity(rule);
      const computedStyle = element.computedStyle;
      for (let declaration of rule.declarations) {
        // 用对象保存 css property的值,方便存储其他值
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {};

          if (!computedStyle[declaration.property].specificity) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;
          } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
            // 旧的更小或等于新的，则让新的覆盖（优先级更高或后来者覆盖），否则不覆盖
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;
          }

        }
      }
      console.log('element.computedStyle', element.computedStyle);
    }
  }
};

// 选择器与单个元素的匹配
// 这里只实现了简单选择器，实际上还有复合选择器
function match(element, selector) {
  if (!selector || !element.attributes) {
    return;
  }
  let firstChar = selector[0];
  if (firstChar === '#') {
    var attr = element.attributes.filter(({ name }) => name === 'id')[0];
    if (attr && attr.name === selector.replace('#', '')) {
      return true;
    }
  }
  if (firstChar === '.') {
    var attr = element.attributes.filter(({ name }) => name === 'class')[0];
    if (attr && attr.name === selector.replace('.', '')) {
      return true;
    }
  }
  if (element.tagName === selector) {
    return true;
  }
  return false;
}

// 计算选择器优先级
function specificity(selector) {
  const specificity = [0, 0, 0, 0];
  const selectorParts = selector.split(' ');
  for (let part of selectorParts) {
    if (part[0] === '#') {
      specificity[1] += 1;
    } else if (part[0] === '.') {
      specificity[2] += 1;
    } else {
      specificity[3] += 1;
    }
  }
  return specificity;
}
// 比较两个选择器的优先级
function compare(part1, part2) {
  // 若高位不相等，则直接返回比较结果
  // 若相等则继续比较低位
  // 每一位都相等，返回0，优先级相同
  for (let i = 0; i < 4; i++) {
    if (part1[i] - part2[i]) {
      return part1[i] - part2[i];
    }
  }
  return 0;
}

function data(c) {
  if (c === EOF) {
    emit({
      type: EOF
    });
    return;
  }
  // 标签开始，不是开始标签，还不知道是三种标签类型的哪一种
  if (c === '<') {
    return tagOpen;
  }
  // 文本
  emit({
    type: 'text',
    content: c
  });
  return data;
}

function tagOpen(c) {
  // 结束标签
  if (c === '/') {
    return endTagOpen;
  }
  // 开始标签或自封闭标签
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    };
    return tagName(c);
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    };
    return tagName(c);
  }
  if (c === '>') {
    // 报错
  } else if (c === EOF) {
    // 报错
  }
}

function tagName(c) {
  // 后面是标签的属性
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  }
  // 自关闭 tag
  if (c === '/') {
    return selfClosingStartTag;
  }
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName;
  }
  // 开始标签，结束掉当前标签的解析，回到 data 状态,开始下一个标签解析
  if (c === '>') {
    emit(currentToken);
    return data;
  }
  return tagName;
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  }
  if (c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  }
  if (c === '=') {
    //  属性的开头不会是一个等号，报错
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  }
  if (c === '=') {
    return beforeAttributeValue;
  }

}
function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeValue(c);
  }
  if (c === '"') {
    return doubleQuotedAttributeValue;
  }
  if (c === "'") {
    return singleQuotedAttributeValue;
  }
  if (c === '>') {
    return data;
  }
  return unquotedAttributeValue(c);
}
function doubleQuotedAttributeValue() {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentToken[currentAttribute.value];
    return afterQuotedAttributeValue;
  }
  if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if (c === "'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  }
  if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}

function unquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  }
  // 自关闭 tag
  if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  }
  // tag 结束
  if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }
  if (c === EOF) {

  } else if (c === '\u0000') {

  } else if (c === '/' || c === '>' || c === EOF) {

  } else {
    currentAttribute.value += c;
    return unquotedAttributeValue;
  }
}

function afterAttributeName() {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  }
  if (c === '/') {
    return selfClosingStartTag;
  }
  if (c === '=') {
    return beforeAttributeValue;
  }
  if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }
  if (c === EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  }
  if (c === '/') {
    return selfClosingStartTag;
  }
  if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }
  if (c === EOF) {

  } else {
    // 除非后面跟了空格才认为当前属性值结束，否则还是属于当前属性值
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function selfClosingStartTag(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true;
    return data;
  } else {
    // 报错
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
  console.log('stack', stack[0]);
}