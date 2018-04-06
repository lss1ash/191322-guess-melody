import {assert} from 'chai';
import showResult from './show-result';

describe(`Функция вывода результата игрока`, () => {

  describe(`Функция на вход принимает массив результатов игр других игроков`, () => {
    it(`возвращает -1, если первый параметр - не массив `, () => {
      assert.equal(-1, showResult());
      assert.equal(-1, showResult(1));
      assert.equal(-1, showResult(true));
      assert.equal(-1, showResult(`test`));
      assert.equal(-1, showResult(NaN));
      assert.equal(-1, showResult(null));
      assert.equal(-1, showResult({}));
    });
  });

  describe(`Функция на вход принимает объект результата с кол-вом набранных баллов, кол-вом оставшихся нот и кол-вом оставшегося времени`, () => {
    it(`возвращает -1, если второй параметр - не объект `, () => {
      assert.equal(-1, showResult([]));
      assert.equal(-1, showResult([], `123`));
      assert.equal(-1, showResult([], 12.3));
      assert.equal(-1, showResult([], NaN));
      assert.equal(-1, showResult([], true));
      assert.equal(-1, showResult([], []));
      assert.equal(-1, showResult([], 555));
      assert.equal(-1, showResult([], null));
    });

    it(`возвращает -1, если любой из трёх параметров объекта результата - не число`, () => {
      assert.equal(-1, showResult([], {}));
      assert.equal(-1, showResult([], {currentScore: 1}));
      assert.equal(-1, showResult([], {currentScore: 1, notesLeft: 2}));
      assert.equal(-1, showResult([], {currentScore: 1, timeLeft: 3}));
      assert.equal(-1, showResult([], {notesLeft: 2, timeLeft: 3}));

      assert.equal(-1, showResult([], {currentScore: `1`, notesLeft: `2`, timeLeft: `3`}));
      assert.equal(-1, showResult([], {currentScore: [1], notesLeft: {two: 2}, timeLeft: 3}));
      assert.equal(-1, showResult([], {currentScore: 1, notesLeft: 2, timeLeft: null}));
      assert.equal(-1, showResult([], {currentScore: 1, notesLeft: NaN, timeLeft: 3}));
      assert.equal(-1, showResult([], {currentScore: {}, notesLeft: [NaN], timeLeft: 666}));
    });
  });

  describe(`Функция на выходе выдаёт строку результата`, () => {
    it(`возвращает строку "Вы заняли i место из t игроков. Это лучше, чем у n% игроков" в случае выигрыша`, () => {
      assert.equal(`Вы заняли 2 место из 7 игроков. Это лучше, чем у 43% игроков`, showResult([1, 1, 5, 8, 8, 11], {currentScore: 8, notesLeft: 3, timeLeft: 3}));
      assert.equal(`Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков`, showResult([], {currentScore: 20, notesLeft: 3, timeLeft: 10}));
      assert.equal(`Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`, showResult([4, 5, 8, 11], {currentScore: 10, notesLeft: 8, timeLeft: 20}));
      assert.equal(`Вы заняли 1 место из 12 игроков. Это лучше, чем у 75% игроков`, showResult([1, 1, 1, 1, 5, 5, 5, 8, 11, 77, 77], {currentScore: 77, notesLeft: 999, timeLeft: 888}));
    });

    it(`возвращает строку "Время вышло! Вы не успели отгадать все мелодии" в случае отсутствия времени`, () => {
      assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, showResult([], {currentScore: 4, notesLeft: 3, timeLeft: 0}));
      assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, showResult([4, 5, 8, 11], {currentScore: 1, notesLeft: 8, timeLeft: 0}));
      assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, showResult([4, 5, 4], {currentScore: 4, notesLeft: 2, timeLeft: 0}));
    });

    it(`возвращает строку "У вас закончились все попытки. Ничего, повезёт в следующий раз!" в случае окончания попыток`, () => {
      assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult([4, 5, 8, 11], {currentScore: 1, notesLeft: 0, timeLeft: 33}));
      assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult([], {currentScore: 4, notesLeft: 0, timeLeft: 61}));
      assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showResult([4, 5, 4], {currentScore: 2, notesLeft: 0, timeLeft: 12}));
    });

  });

});
