import {assert} from 'chai';
import calculateResult from './result';

describe(`Функция подсчёта набранных баллов игрока`, () => {
  describe(`Функция на вход принимает массив ответов пользователя`, () => {

    it(`возвращает -1 в том случае, если первый параметр - не массив `, () => {
      assert.equal(-1, calculateResult());
      assert.equal(-1, calculateResult(1));
      assert.equal(-1, calculateResult(true));
      assert.equal(-1, calculateResult(`test`));
      assert.equal(-1, calculateResult(NaN));
      assert.equal(-1, calculateResult({}));
    });

    it(`возвращает -1 в том случае, если второй параметр - не число `, () => {
      assert.equal(-1, calculateResult([]));
      assert.equal(-1, calculateResult([], `123`));
      assert.equal(-1, calculateResult([], NaN));
      assert.equal(-1, calculateResult([], true));
      assert.equal(-1, calculateResult([], []));
      assert.equal(-1, calculateResult([], {}));
    });
  });
});
