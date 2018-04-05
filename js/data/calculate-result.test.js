import {assert} from 'chai';
import calculateResult from './calculate-result';

describe(`Функция подсчёта набранных баллов игрока`, () => {
  describe(`Функция на вход принимает массив ответов пользователя`, () => {
    it(`возвращает false в том случае, если первый параметр - не массив `, () => {
      assert.isFalse(calculateResult());
      assert.isFalse(calculateResult(1));
      assert.isFalse(calculateResult(`test`));
      assert.isFalse(calculateResult(NaN));
      assert.isFalse(calculateResult({obj: 1}));
    });
  });
});
