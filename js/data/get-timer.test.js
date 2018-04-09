import {assert} from 'chai';
import getTimer from './get-timer';

describe(`Функция создания таймера`, () => {

  describe(`Функция на вход должна принимать время, в течение которого будет работать таймер`, () => {
    it(`возвращает -1, если параметр - не целое число `, () => {
      assert.strictEqual(-1, getTimer());
      const testEqual = (value) => assert.strictEqual(-1, getTimer(value));
      [{}, [], `123`, NaN, null].forEach(testEqual);
    });
  });

  describe(`Функция возвращает объект`, () => {
    it(`возвращает объект с методом tick, если параметр - целое число`, () => {
      const testIsObjectWithMethod = (value) => assert.isObject(getTimer(value)) && assert.isFunction(getTimer(value).tick);
      [123, 2, 54, 1].forEach(testIsObjectWithMethod);
    });
  });

});
