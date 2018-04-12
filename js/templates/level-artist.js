import {getElementFromString, drawPage, getRandomArbitrary} from '../utils';
import levelGenreTemplate from './level-genre';
import testMelodies from '../data/test-melodies';
import svgTemplate from './svg';
import getMistakesTemplate from './mistakes';

// <!-- Игра на выбор исполнителя -->

const getSongMarkup = (song, number) => {
  return `<div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
    <label class="main-answer" for="answer-${number}">
      <img class="main-answer-preview" src="${song.image}"
           alt="${song.artist}" width="134" height="134">
      ${song.artist}
    </label>
  </div>`;
};

const formClickHandler = ({target}) => {
  if (target.tagName.toUpperCase() === `INPUT` && target.type.toUpperCase() === `RADIO`) {
    const randomStart = getRandomArbitrary(0, testMelodies.length - 4);
    drawPage(levelGenreTemplate(`Rock'n'Roll`, testMelodies.slice(randomStart, randomStart + 4)));
  }
};

export default (answers) => {

  const template = `<section class="main main--level main--level-artist">
    ${svgTemplate}
    ${getMistakesTemplate(2)}
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

  answers.forEach((song, number) => {
    const songElement = getElementFromString(getSongMarkup(song, number + 1));
    mainListElement.appendChild(songElement);
  });

  mainListElement.addEventListener(`click`, formClickHandler);

  return levelArtistPageElement;
};
