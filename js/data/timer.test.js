import {assert} from 'chai';
import Timer from './timer';

describe(`Класс таймера`, () => {

  describe(`Конструктор на вход должен принимать время, в течение которого будет работать таймер, коллбэк на тик и коллбэк на завершение`, () => {
    it(`возвращает false, если параметр - не целое число `, () => {
      assert.isFalse((new Timer()).start());
      const testEqual = (value) => assert.isFalse((new Timer(value)).start());
      [{}, [], `123`, NaN, null].forEach(testEqual);
    });
  });

  describe(`Конструктор возвращает экземпляр класса Timer`, () => {
    it(`возвращает объект с методом tick, если параметр - целое число`, () => {
      const testIsObjectWithMethod = (value) => assert.isObject(new Timer(value)) && assert.isFunction((new Timer(value)).tick);
      [123, 2, 54, 1].forEach(testIsObjectWithMethod);
    });
  });

});
