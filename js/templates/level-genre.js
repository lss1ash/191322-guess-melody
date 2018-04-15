import svgTemplate from './svg';
import getMistakesTemplate from './mistakes';
import {nextGameLevel, getMistakes} from '../main.js';
import AbstractView from '../abstract-view';

export default class LevelGenreView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
    <section class="main main--level main--level-genre">
      ${svgTemplate}
      ${getMistakesTemplate(getMistakes())}
      <div class="main-wrap">
        <h2 class="title">${this.level.question}</h2>
        <form class="genre">
          ${this.level.answers.map((answer, number) => this._melodyTemplate(answer, number + 1)).join(``)}
          <button class="genre-answer-send" disabled type="submit">Ответить</button>
        </form>
      </div>
    </section>`;
  }

  _melodyTemplate({melodie}, number) {
    return `
    <div class="genre-answer">
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
  }

  _onNoteClick({target}) {
    if (target.tagName.toUpperCase() === `INPUT` && target.type.toUpperCase() === `CHECKBOX`) {
      let checked = false;
      [...this._checkBoxes].forEach((checkbox) => {
        checked = checked || checkbox.checked;
      });
      this._sendButton.disabled = !checked;
    }
  }

  onLevelSubmit() {
    this._sendButton.disabled = true;
    const userAnswer = [...this._checkBoxes].map((checkbox) => {
      const retValue = checkbox.checked;
      checkbox.checked = false;
      return retValue;
    });

    nextGameLevel(userAnswer);
  }

  bind() {
    this._form = this.element.querySelector(`form.genre`);
    this._checkBoxes = this.element.querySelectorAll(`.genre-answer input[type=checkbox]`);
    this._sendButton = this.element.querySelector(`.genre-answer-send`);

    this._form.onsubmit = (evt) => {
      evt.preventDefault();
      this._onNoteClick(evt);
    };

    this._checkBoxes.onclick = () => {
      this.onLevelSubmit();
    };
  }
}
