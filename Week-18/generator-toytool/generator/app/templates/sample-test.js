const assert = require('assert');

// describe 主要用于分组，使测试信息更好看
describe('sample test:', function () {
  it('1 + 1 == 2', function () {
    assert.strictEqual(1 + 1, 2);
  })
})