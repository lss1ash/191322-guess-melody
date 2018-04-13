import {getElementFromString} from '../utils';
import svgTemplate from './svg';
import getMistakesTemplate from './mistakes';
import {nextGameLevel, getMistakes} from '../main.js';

// <!-- Игра на выбор исполнителя -->

const getMelodieMarkup = ({melodie}, number) => {
  return `<div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
    <label class="main-answer" for="answer-${number}">
      <img class="main-answer-preview" src="${melodie.image}"
           alt="${melodie.artist}" width="134" height="134">
      ${melodie.artist}
    </label>
  </div>`;
};

export default (level) => {

  const template = `<section class="main main--level main--level-artist">
    ${svgTemplate}
    ${getMistakesTemplate(getMistakes())}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">

      </form>
    </div>
  </section>`;

  const levelArtistPageElement = getElementFromString(template);
  const mainListElement = levelArtistPageElement.querySelector(`form.main-list`);

  const formClickHandler = ({target}) => {
    if (target.tagName.toUpperCase() === `INPUT` && target.type.toUpperCase() === `RADIO`) {
      const userAnswer = [...mainListElement.querySelectorAll(`input[type=radio]`)].map((radio) => radio.checked);

      nextGameLevel(userAnswer);
    }
  };

  level.answers.forEach((melodie, number) => {
    const melodieElement = getElementFromString(getMelodieMarkup(melodie, number + 1));
    mainListElement.appendChild(melodieElement);
  });

  mainListElement.addEventListener(`click`, formClickHandler);

  return levelArtistPageElement;
};
