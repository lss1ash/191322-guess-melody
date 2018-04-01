import getElementFromString from '../getElementFromString.js';
import drawPage from '../drawPage.js';
import welcomeTemplate from './welcome.js';

// <!-- Результат игры: проигрыш закончились попытки -->

const template = `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Какая жалость!</h2>
  <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;

const resultPage = getElementFromString(template);
const replay = resultPage.querySelector(`.main-replay`);

const replayClickHandler = () => {
  drawPage(welcomeTemplate);
};
replay.addEventListener(`click`, replayClickHandler);

export default resultPage;
