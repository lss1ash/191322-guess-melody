import {assert} from 'chai';
import showResult from './show-result';

const testEqual = (testValue) => assert.strictEqual(-1, showResult(...testValue));

describe(`Функция вывода результата игрока`, () => {

  describe(`Функция на вход принимает массив результатов игр других игроков`, () => {
    it(`возвращает -1, если первый параметр - не массив `, () => {
      [[], [1], [true], [`test`], [NaN], [null], [{}]].forEach(testEqual);
    });
  });

  describe(`Функция на вход принимает объект результата с кол-вом набранных баллов, кол-вом оставшихся нот и кол-вом оставшегося времени`, () => {
    it(`возвращает -1, если второй параметр - не объект `, () => {
      [[[]], [[], `123`], [[], 12.3], [[], NaN], [[], true], [[], []], [[], 555], [[], null]].forEach(testEqual);
    });

    it(`возвращает -1, если любой из трёх параметров объекта результата - не число`, () => {
      [[[], {}],
        [[], {currentScore: 1}],
        [[], {currentScore: 1, notesLeft: 2}],
        [[], {currentScore: 1, timeLeft: 3}],
        [[], {notesLeft: 2, timeLeft: 3}],
        [[], {currentScore: `1`, notesLeft: `2`, timeLeft: `3`}],
        [[], {currentScore: [1], notesLeft: {two: 2}, timeLeft: 3}],
        [[], {currentScore: 1, notesLeft: 2, timeLeft: null}],
        [[], {currentScore: 1, notesLeft: NaN, timeLeft: 3}],
        [[], {currentScore: {}, notesLeft: [NaN], timeLeft: 666}]].forEach(testEqual);
    });
  });

  describe(`Функция на выходе выдаёт строку результата`, () => {
    it(`возвращает строку "Вы заняли i место из t игроков. Это лучше, чем у n% игроков" в случае выигрыша`, () => {
      assert.strictEqual(`Вы заняли 2 место из 7 игроков. Это лучше, чем у 43% игроков`, showResult([1, 1, 5, 8, 8, 11], {currentScore: 8, notesLeft: 3, timeLeft: 3}));
      assert.strictEqual(`Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков`, showResult([], {currentScore: 20, notesLeft: 3, timeLeft: 10}));
      assert.strictEqual(`Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`, showResult([4, 5, 8, 11], {currentScore: 10, notesLeft: 8, timeLeft: 20}));
      assert.strictEqual(`Вы заняли 1 место из 12 игроков. Это лучше, чем у 75% игроков`, showResult([1, 1, 1, 1, 5, 5, 5, 8, 11, 77, 77], {currentScore: 77, notesLeft: 999, timeLeft: 888}));
    });

    it(`возвращает строку "Время вышло! Вы не успели отгадать все мелодии" в случае отсутствия времени`, () => {
      assert.strictEqual(`Время вышло! Вы не успели отгадать все мелодии`, showResult([], {currentScore: 4, notesLeft: 3, timeLeft: 0}));
      assert.strictEqual(`Время вышло! Вы не успели отгадать все мелодии`, showResult([4, 5, 8, 11], {currentScore: 1, notesLeft: 8, timeLeft: 0}));
      assert.strictEqual(`Время вышло! Вы не успели отгадать все мелодии`, showResult([4, 5, 4], {currentScore: 4, notesLeft: 2, timeLeft: 0}));
    });

    it(`возвращает строку "У вас закончились все попытки. Ничего, повезёт в следующий раз!" в случае окончания попыток`, () => {
      assert.strictEqual(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult([4, 5, 8, 11], {currentScore: 1, notesLeft: 0, timeLeft: 33}));
      assert.strictEqual(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult([], {currentScore: 4, notesLeft: 0, timeLeft: 61}));
      assert.strictEqual(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult([4, 5, 4], {currentScore: 2, notesLeft: 0, timeLeft: 12}));
    });

  });

});
