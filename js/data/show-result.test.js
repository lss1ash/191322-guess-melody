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
    });
  });

});
