const assert = require('assert');
import { add, mul } from '../add';

// describe 主要用于分组，使测试信息更好看
describe('add function test', function () {
  it('1+2 should be 3', function () {
    assert.strictEqual(add(1, 2), 3);
  });

  it('-2+2 should be 0', function () {
    assert.strictEqual(add(-2, 2), 0);
  });
})

describe('mul function test', function () {
  it('1*2 should be 2', function () {
    assert.strictEqual(mul(1, 2), 2);
  });

  it('-2*2 should be -4', function () {
    assert.strictEqual(mul(-2, 2), -4);
  });
})