
export function createElement(type, attributes, ...children) {
  let element;
  if (typeof type !== 'string') {
    element = new type;
  } else {
    element = new ElementWrapper(type);
  }
  for (let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  for (let child of children) {
    if (typeof child === 'string') {
      // 这里判断 child如果是一个字符串，则为文本节点
      // 这里判断的事子节点，所以react的组件外一定要包一个节点，即最外层的父组件一定要是一个节点形式
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return element;
}

export class Component {
  constructor() {
  }
  appendChild(child) {
    child.mountTo(this.root);
  }
  setAttribute(key, value) {
    this.root.setAttribute(key, value);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    this.root = document.createElement(type);
  }
}

class TextWrapper extends Component {
  constructor(text) {
    this.root = document.createTextNode(text);
  }
}