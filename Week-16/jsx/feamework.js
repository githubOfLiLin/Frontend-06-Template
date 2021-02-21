
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

  let processChildren = (children) => {
    for (let child of children) {
      if (typeof child === 'object' && child instanceof Array) {
        processChildren(child);
        continue;
      }
      if (typeof child === 'string') {
        // 这里判断 child如果是一个字符串，则为文本节点
        // 这里判断的事子节点，所以react的组件外一定要包一个节点，即最外层的父组件一定要是一个节点形式
        child = new TextWrapper(child);
      }
      element.appendChild(child);
    }
  }
  processChildren(children);
  return element;
}

export const STATE = Symbol('state'); // 防止用户在外部访问，使用Symbol，同时为了使继承子类访问，export出去，类似于protect
export const ATTRIBUTES = Symbol('attributes');

export class Component {
  constructor() {
    this[ATTRIBUTES] = Object.create(null);
    this[STATE] = Object.create(null);
  }

  appendChild(child) {
    child.mountTo(this.root);
  }
  setAttribute(key, value) {
    this[ATTRIBUTES][key] = value;
  }
  render() {
    return this.root;
  }
  mountTo(parent) {
    if (!this.root)
      this.render();
    parent.appendChild(this.root);
  }
  triggerEvent(type, args) {
    // 知识点，replace第二个参数可以传函数
    this[ATTRIBUTES]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, { detail: args })); // ?
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super();
    this.root = document.createElement(type);
  }
  setAttribute(key, value) {
    this.root.setAttribute(key, value);
  }
  // render() {
  // }
}

class TextWrapper extends Component {
  constructor(text) {
    super();
    this.root = document.createTextNode(text);
  }
  // render() {
  // }
}