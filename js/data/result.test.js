import {assert} from 'chai';
import calculateResult from './result';

describe(`Функция подсчёта набранных баллов игрока`, () => {

  describe(`Функция на вход принимает массив ответов пользователя`, () => {
    it(`возвращает -1, если первый параметр - не массив `, () => {
      assert.equal(-1, calculateResult());
      assert.equal(-1, calculateResult(1));
      assert.equal(-1, calculateResult(true));
      assert.equal(-1, calculateResult(`test`));
      assert.equal(-1, calculateResult(NaN));
      assert.equal(-1, calculateResult({}));
    });

    it(`возвращает -1, если количество элементов массива с ответами !== 10 `, () => {
      assert.equal(-1, calculateResult(new Array(0)));
      assert.equal(-1, calculateResult(new Array(1)));
      assert.equal(-1, calculateResult(new Array(2)));
      assert.equal(-1, calculateResult(new Array(3)));
      assert.equal(-1, calculateResult(new Array(4)));
      assert.equal(-1, calculateResult(new Array(5)));
      assert.equal(-1, calculateResult(new Array(6)));
      assert.equal(-1, calculateResult(new Array(7)));
      assert.equal(-1, calculateResult(new Array(8)));
      assert.equal(-1, calculateResult(new Array(9)));
      assert.equal(-1, calculateResult(new Array(11)));
      assert.equal(-1, calculateResult(new Array(22)));
      assert.equal(-1, calculateResult(new Array(66)));
    });
  });

  describe(`Функция на вход принимает массив ответов пользователя`, () => {
    it(`возвращает -1, если второй параметр - не число `, () => {
      assert.equal(-1, calculateResult([]));
      assert.equal(-1, calculateResult([], `123`));
      assert.equal(-1, calculateResult([], 12.3));
      assert.equal(-1, calculateResult([], NaN));
      assert.equal(-1, calculateResult([], true));
      assert.equal(-1, calculateResult([], []));
      assert.equal(-1, calculateResult([], {}));
    });
  });

  describe(`За правильный ответ 1 балл;\nЗа быстрый правильный ответ (менее 30 секунд) — 2 балла;\nЗа каждую ошибку вычитается 2 балла.`, () => {

    it(`возвращает 10, если всё правильно, ошибок нет и все ответы не быстрые`, () => {
      assert.equal(10, calculateResult([{right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false}], 3));
    });

    it(`возвращает 8, если всё правильно, 1 ошибка и все ответы не быстрые`, () => {
      assert.equal(8, calculateResult([{right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false}], 2));
    });

    it(`возвращает 6, если всё правильно, 2 ошибки и все ответы не быстрые`, () => {
      assert.equal(6, calculateResult([{right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false}], 1));
    });

    it(`возвращает 3, если 9 правильно, 3 ошибки и все ответы не быстрые`, () => {
      assert.equal(3, calculateResult([{right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: false, fast: false}], 0));
    });

    it(`возвращает 20, если всё правильно, ошибок нет и все ответы быстрые`, () => {
      assert.equal(20, calculateResult([{right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true}], 3));
    });

    it(`возвращает 18, если всё правильно, 1 ошибка и все ответы быстрые`, () => {
      assert.equal(18, calculateResult([{right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true}], 2));
    });

    it(`возвращает 16, если всё правильно, 2 ошибки и все ответы быстрые`, () => {
      assert.equal(16, calculateResult([{right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true}], 1));
    });

    it(`возвращает 12, если 9 правильно, 3 ошибки и все ответы быстрые`, () => {
      assert.equal(12, calculateResult([{right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: false, fast: true}], 0));
    });

    it(`возвращает 7, если 7 правильно (из них 6 быстро), 3 ошибки`, () => {
      assert.equal(7, calculateResult([{right: true, fast: true},
        {right: true, fast: false},
        {right: true, fast: true},
        {right: false, fast: false},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: false, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: false, fast: true}], 0));
    });

    it(`возвращает -1, т.к. не все ответы даны`, () => {
      assert.equal(-1, calculateResult([{right: false, fast: false},
        {right: true, fast: false},
        {right: false, fast: true},
        {right: false, fast: false}], 0));
    });

  });
});
