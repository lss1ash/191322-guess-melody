import {getElementFromString, drawPage} from '../utils';
import resultTemplate from './result';
// import resultTimeLeftTemplate from './result-time-left';
import levelArtistTemplate from './level-artist';
import levelGenreTemplate from './level-genre';
import svgTemplate from './svg';
import getMistakesTemplate from './mistakes';
import {nextGameLevel, getMistakes} from '../main.js';
import {GAME} from '../data/game';

// <!-- Игра на выбор жанра -->

const getMelodieMarkup = ({melodie}, number) => {
  return `<div class="genre-answer">
    <div class="player-wrapper">
      <div class="player">
        <audio src="${melodie.src}"></audio>
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

export default (level) => {

  const template = `<section class="main main--level main--level-genre">
    ${svgTemplate}
    ${getMistakesTemplate(getMistakes())}
    <div class="main-wrap">
      <h2 class="title">${level.question}</h2>
      <form class="genre"></form>
    </div>
  </section>`;

  const levelGenrePageElement = getElementFromString(template);
  const mainListElement = levelGenrePageElement.querySelector(`form.genre`);

  level.answers.forEach((answer, number) => {
    const melodieElement = getElementFromString(getMelodieMarkup(answer, number + 1));
    mainListElement.appendChild(melodieElement);
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
    const userAnswer = [...checkBoxes].map((checkbox) => {
      const retValue = checkbox.checked;
      checkbox.checked = false;
      return retValue;
    });

    const nextLevel = nextGameLevel(userAnswer);
    if (nextLevel) {
      switch (nextLevel.type) {
        case GAME.GENRE: drawPage(levelGenreTemplate(nextLevel)); break;
        case GAME.ARTIST: drawPage(levelArtistTemplate(nextLevel)); break;
      }
    } else {
      drawPage(resultTemplate(TEST_RESULT));
    }
  };

  mainListElement.addEventListener(`click`, formClickHandler);
  mainListElement.addEventListener(`submit`, formSubmitHandler);

  return levelGenrePageElement;
};
