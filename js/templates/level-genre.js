import {getElementFromString, drawPage, getRandomArbitrary} from '../utils';
import resultTemplate from './result';
import resultAttemptsLeftTemplate from './result-attempts-left';
import resultTimeLeftTemplate from './result-time-left';

// <!-- Игра на выбор жанра -->

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

  // const genreBoxesElements = levelGenrePage.querySelectorAll(`.genre-answer input[type=checkbox]`);
  // const changeBoxCheckedHandler = () => {
  //   let checked = false;
  //   [...genreBoxes].forEach((checkbox) => {
  //     checked = checked || checkbox.checked;
  //   });
  //   answer.disabled = !checked;
  // };
  //
  // const answerClickHandler = (e) => {
  //   e.preventDefault();
  //
  //   answer.disabled = true;
  //   [...genreBoxes].forEach((checkbox) => {
  //     checkbox.checked = false;
  //   });
  //
  //   const result = {
  //     minutes: 3,
  //     seconds: 12,
  //     score: 10,
  //     scoreFast: 10,
  //     mistakes: 2,
  //     place: 3,
  //     placesAll: 15,
  //     betterPercent: 66
  //   };
  //
  //   switch (Math.floor(getRandomArbitrary(0, 3))) {
  //     case 0: drawPage(resultTemplate(result)); break;
  //     case 1: drawPage(resultAttemptsLeftTemplate); break;
  //     case 2: drawPage(resultTimeLeftTemplate); break;
  //   }
  // };


  answers.forEach((song, number) => {
    const songElement = getElementFromString(getSongMarkup(song, number + 1));
    // songElement.addEventListener(`click`, answerClickHandler);
    levelGenrePageElement.appendChild(songElement);
  });

  levelGenrePageElement.appendChild(getElementFromString(`<button class="genre-answer-send" disabled type="submit">Ответить</button>`));


  // [...genreBoxes].forEach((checkbox) => checkbox.addEventListener(`change`, changeBoxCheckedHandler));
  // answer.addEventListener(`click`, answerClickHandler);

  return levelGenrePageElement;
};
