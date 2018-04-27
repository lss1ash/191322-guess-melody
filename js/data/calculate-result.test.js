import {assert} from 'chai';
import calculateResult from './calculate-result';

const testEqual = (testValue) => assert.strictEqual(-1, calculateResult(...testValue));

describe(`Функция подсчёта набранных баллов игрока`, () => {

  describe(`Функция на вход принимает массив ответов пользователя`, () => {
    it(`возвращает -1, если первый параметр - не массив `, () => {
      const checks = [[], [1], [true], [`test`], [NaN], [null], [{}]];
      checks.forEach(testEqual);
    });

    it(`возвращает -1, если количество элементов массива с ответами !== 10 `, () => {
      const checks = [[Array(0)], [Array(1)], [Array(2)], [Array(3)], [Array(4)], [Array(5)], [Array(6)], [Array(7)], [Array(8)], [Array(9)], [Array(11)], [Array(22)], [Array(66)]];
      checks.forEach(testEqual);
    });
  });

  describe(`Функция на вход принимает кол-во оставшихся нот`, () => {
    it(`возвращает -1, если второй параметр - не число `, () => {
      const checks = [[Array(10)], [Array(10), `123`], [Array(10), 12.3], [Array(10), NaN], [Array(10), null], [Array(10), true], [Array(10), []], [Array(10), {}]];
      checks.forEach(testEqual);
    });
  });

  describe(`За правильный ответ 1 балл; За быстрый правильный ответ (менее 30 секунд) — 2 балла; За каждую ошибку вычитается 2 балла.`, () => {

    it(`возвращает {score: 10, fast: 0}, если всё правильно, ошибок нет и все ответы не быстрые`, () => {
      assert.deepEqual({score: 10, fast: 0}, calculateResult([{right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false}], 0));
    });

    it(`возвращает 8, если всё правильно, 1 ошибка и все ответы не быстрые`, () => {
      assert.deepEqual({score: 8, fast: 0}, calculateResult([{right: true, fast: false},
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

    it(`возвращает 6, если всё правильно, 2 ошибки и все ответы не быстрые`, () => {
      assert.deepEqual({score: 6, fast: 0}, calculateResult([{right: true, fast: false},
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

    it(`возвращает 3, если 9 правильно, 3 ошибки и все ответы не быстрые`, () => {
      assert.deepEqual({score: 3, fast: 0}, calculateResult([{right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: true, fast: false},
        {right: false, fast: false}], 3));
    });

    it(`возвращает 20, если всё правильно, ошибок нет и все ответы быстрые`, () => {
      assert.deepEqual({score: 20, fast: 10}, calculateResult([{right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true}], 0));
    });

    it(`возвращает 18, если всё правильно, 1 ошибка и все ответы быстрые`, () => {
      assert.deepEqual({score: 18, fast: 10}, calculateResult([{right: true, fast: true},
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

    it(`возвращает 16, если всё правильно, 2 ошибки и все ответы быстрые`, () => {
      assert.deepEqual({score: 16, fast: 10}, calculateResult([{right: true, fast: true},
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

    it(`возвращает 12, если 9 правильно, 3 ошибки и все ответы быстрые`, () => {
      assert.deepEqual({score: 12, fast: 9}, calculateResult([{right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: false, fast: true}], 3));
    });

    it(`возвращает 7, если 7 правильно (из них 6 быстро), 3 ошибки`, () => {
      assert.deepEqual({score: 7, fast: 6}, calculateResult([{right: true, fast: true},
        {right: true, fast: false},
        {right: true, fast: true},
        {right: false, fast: false},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: false, fast: true},
        {right: true, fast: true},
        {right: true, fast: true},
        {right: false, fast: true}], 3));
    });

  });
});
