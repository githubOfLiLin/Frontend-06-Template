/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfor (var _i = 0, _arr = [1, 2, 3]; _i < _arr.length; _i++) {\n  var i = _arr[_i];\n  console.log(i);\n}\n\nfunction createElement(type, attributes) {\n  var element;\n\n  if (typeof type !== 'string') {\n    element = new type();\n  } else {\n    element = new ElementWrapper(type);\n  }\n\n  for (var attr in attributes) {\n    element.setAttribute(attr, attributes[attr]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i2 = 0, _children = children; _i2 < _children.length; _i2++) {\n    var child = _children[_i2];\n\n    if (typeof child === 'string') {\n      // 这里判断 child如果是一个字符串，则为文本节点\n      // 这里判断的事子节点，所以react的组件外一定要包一个节点，即最外层的父组件一定要是一个节点形式\n      child = new TextWrapper(child);\n    }\n\n    element.appendChild(child);\n  }\n\n  return element;\n}\n\nvar MyComponent = /*#__PURE__*/function () {\n  function MyComponent() {\n    _classCallCheck(this, MyComponent);\n\n    this.root = document.createElement('div');\n  }\n\n  _createClass(MyComponent, [{\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // this.root.appendChild(child);\n      child.mountTo(this.root);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(key, value) {\n      this.root.setAttribute(key, value);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return MyComponent;\n}();\n\nvar ElementWrapper = /*#__PURE__*/function () {\n  function ElementWrapper(type) {\n    _classCallCheck(this, ElementWrapper);\n\n    this.root = document.createElement(type);\n  }\n\n  _createClass(ElementWrapper, [{\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // this.root.appendChild(child);\n      child.mountTo(this.root);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(key, value) {\n      this.root.setAttribute(key, value);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return ElementWrapper;\n}();\n\nvar TextWrapper = /*#__PURE__*/function () {\n  function TextWrapper(text) {\n    _classCallCheck(this, TextWrapper);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(TextWrapper, [{\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // this.root.appendChild(child);\n      child.mountTo(this.root);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(key, value) {\n      this.root.setAttribute(key, value);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return TextWrapper;\n}();\n\nvar a = createElement(MyComponent, {\n  id: \"1\"\n}, createElement(\"span\", null, \"a\"), createElement(\"span\", null, \"b\"), createElement(\"span\", null, \"c\"));\na.mountTo(document.body);\n\n//# sourceURL=webpack://jsx/./main.js?");
/******/ })()
;