import {assert} from 'chai';
import getTimer from './get-timer';

describe(`Функция создания таймера`, () => {

  describe(`Функция на вход должна принимать время, в течение которого будет работать таймер`, () => {
    it(`возвращает -1, если параметр - не целое число `, () => {
      assert.equal(-1, getTimer());
      assert.equal(-1, getTimer({}));
      assert.equal(-1, getTimer([]));
      assert.equal(-1, getTimer(`123`));
      assert.equal(-1, getTimer(NaN));
      assert.equal(-1, getTimer(null));
    });
  });

  describe(`Функция возвращает объект`, () => {
    it(`возвращает объект, если параметр - целое число`, () => {
      assert.isObject(getTimer(123));
      assert.isObject(getTimer(2));
      assert.isObject(getTimer(54));
      assert.isObject(getTimer(1));
    });

    it(`возвращает объект с методом tick, если параметр - целое число`, () => {
      assert.isFunction(getTimer(123).tick);
      assert.isFunction(getTimer(2).tick);
      assert.isFunction(getTimer(54).tick);
      assert.isFunction(getTimer(1).tick);
    });
  });

});
