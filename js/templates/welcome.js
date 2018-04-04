import getElementFromString from '../get-element-from-string';
import drawPage from '../draw-page';
import levelArtistTemplate from './level-artist';

// <!-- Приветствие -->

const template = `<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
    Ошибиться можно 3 раза.<br>
    Удачи!
  </p>
</section>`;

const welcomePage = getElementFromString(template);
const play = welcomePage.querySelector(`.main-play`);

const playClickHandler = () => {
  drawPage(levelArtistTemplate);
};
play.addEventListener(`click`, playClickHandler);

export default welcomePage;
