// <span class="main-comparison">Вы заняли ${result.place} место из ${result.placesAll}. Это&nbsp;лучше чем у&nbsp;${result.betterPercent}%&nbsp;игроков</span>

import {getElementFromString} from '../utils';
import {initializeGame} from '../main';

// <!-- Результат игры: выигрыш -->

export default (result) => {

  const template = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы - настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${result.minutes}&nbsp;минуты и ${result.seconds}&nbsp;секунд
      <br>Вы&nbsp;набрали ${result.score} баллов (${result.scoreFast} быстрых),
      <br>совершив ${result.mistakes} ошибки</div>
      <span class="main-comparison">${result.comparison}</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const resultPage = getElementFromString(template);
  const replay = resultPage.querySelector(`.main-replay`);

  const replayClickHandler = () => {
    initializeGame();
  };
  replay.addEventListener(`click`, replayClickHandler);

  return resultPage;
};
