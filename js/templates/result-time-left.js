import getElementFromString from '../get-element-from-string';
import drawPage from '../draw-page';
import welcomeTemplate from './welcome';

// <!-- Результат игры: проигрыш время вышло -->

const template = `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;

const resultPage = getElementFromString(template);
const replay = resultPage.querySelector(`.main-replay`);

const replayClickHandler = () => {
  drawPage(welcomeTemplate);
};
replay.addEventListener(`click`, replayClickHandler);

export default resultPage;
