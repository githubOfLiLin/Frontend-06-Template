const assert = require('assert');
import { parseHTML } from '../src/parser';

// describe 主要用于分组，使测试信息更好看
describe('parse html:', function () {
  it('<a></a>', function () {
    const tree = parseHTML('<a></a>');
    console.log(tree);
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].children.length, 0);
  });
  it('<div class></div>', function () {
    const tree = parseHTML('<div class></div>');
    console.log(tree.children[0].attributes);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
  it('<a href="./test.js"></a>', function () {
    const tree = parseHTML('<a  href="test"></a>');
    console.log(tree);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
  it('<a href="./test.js" id></a>', function () {
    const tree = parseHTML('<a  href="test" id></a>');
    console.log(tree);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
  it('<a id=abc></a>', function () {
    const tree = parseHTML('<a id=abc></a>');
    console.log(tree);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
  it('<img/>', function () {
    const tree = parseHTML('<img/>');
    console.log(tree);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
  it('<a id=\'abc\'></a>', function () {
    const tree = parseHTML('<a id=\'abc\'></a>');
    console.log(tree);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
  it('<img />', function () {
    const tree = parseHTML('<img />');
    console.log(tree);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
  it('<A/>', function () {
    const tree = parseHTML('<A/>');
    console.log(tree);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
  it('<>', function () {
    const tree = parseHTML('<>');
    console.log(tree);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0)
  });
})