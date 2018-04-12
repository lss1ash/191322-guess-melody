import {getElementFromString, drawPage, getRandomArbitrary} from '../utils';
import resultTemplate from './result';
import resultAttemptsLeftTemplate from './result-attempts-left';
import resultTimeLeftTemplate from './result-time-left';

// <!-- Игра на выбор жанра -->

const TEST_RESULT = {
  minutes: 3,
  seconds: 12,
  score: 10,
  scoreFast: 10,
  mistakes: 2,
  place: 3,
  placesAll: 15,
  betterPercent: 66
};

const getSongMarkup = (song, number) => {
  return `<div class="genre-answer">
    <div class="player-wrapper">
      <div class="player">
        <audio></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}">
    <label class="genre-answer-check" for="a-${number}"></label>
  </div>`;
};

export default (genre, answers) => {

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
      <h2 class="title">Выберите ${genre} треки</h2>
      <form class="genre">

      </form>
    </div>
  </section>`;

  const levelGenrePageElement = getElementFromString(template);
  const mainListElement = levelGenrePageElement.querySelector(`form.genre`);

  answers.forEach((song, number) => {
    const songElement = getElementFromString(getSongMarkup(song, number + 1));
    mainListElement.appendChild(songElement);
  });

  const checkBoxes = mainListElement.querySelectorAll(`.genre-answer input[type=checkbox]`);
  const sendButton = getElementFromString(`<button class="genre-answer-send" disabled type="submit">Ответить</button>`);
  mainListElement.appendChild(sendButton);

  const formClickHandler = ({target}) => {
    if (target.tagName.toUpperCase() === `INPUT` && target.type.toUpperCase() === `CHECKBOX`) {
      let checked = false;
      [...checkBoxes].forEach((checkbox) => {
        checked = checked || checkbox.checked;
      });
      sendButton.disabled = !checked;
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    sendButton.disabled = true;
    [...checkBoxes].forEach((checkbox) => {
      checkbox.checked = false;
    });

    switch (Math.floor(getRandomArbitrary(0, 3))) {
      case 0: drawPage(resultTemplate(TEST_RESULT)); break;
      case 1: drawPage(resultAttemptsLeftTemplate); break;
      case 2: drawPage(resultTimeLeftTemplate); break;
    }

  };

  mainListElement.addEventListener(`click`, formClickHandler);
  mainListElement.addEventListener(`submit`, formSubmitHandler);

  return levelGenrePageElement;
};
