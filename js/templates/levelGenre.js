import getElementFromString from '../getElementFromString.js';
import drawPage from '../drawPage.js';
import resultTemplate from './result.js';
import resultAttemptsLeftTemplate from './resultAttemptsLeft.js';
import resultTimeLeftTemplate from './resultTimeLeft.js';

// <!-- Игра на выбор жанра -->

const template = `<section class="main main--level main--level-genre">
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">05</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">00</span>
    </div>
  </svg>
  <div class="main-mistakes">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
  </div>

  <div class="main-wrap">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" disabled type="submit">Ответить</button>
    </form>
  </div>
</section>`;

const levelGenrePage = getElementFromString(template);
const genreBoxes = levelGenrePage.querySelectorAll(`.genre-answer input[type=checkbox]`);
const answer = levelGenrePage.querySelector(`.genre-answer-send`);

const changeBoxCheckedHandler = () => {
  let checked = false;
  [...genreBoxes].forEach((checkbox) => {
    checked = checked || checkbox.checked;
  });
  answer.disabled = !checked;
};

// Возвращает случайное число между min (включительно) и max (не включая max)
const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const answerClickHandler = (e) => {
  e.preventDefault();

  answer.disabled = true;
  [...genreBoxes].forEach((checkbox) => {
    checkbox.checked = false;
  });

  switch (Math.floor(getRandomArbitrary(0, 3))) {
    case 0: drawPage(resultTemplate); break;
    case 1: drawPage(resultAttemptsLeftTemplate); break;
    case 2: drawPage(resultTimeLeftTemplate); break;
  }
};

[...genreBoxes].forEach((checkbox) => checkbox.addEventListener(`change`, changeBoxCheckedHandler));
answer.addEventListener(`click`, answerClickHandler);

export default levelGenrePage;