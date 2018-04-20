import svgTemplate from '../templates/svg';
import getMistakesTemplate from '../templates/mistakes';
import AbstractView from './abstract-view';
import game from '../main';

export default class LevelArtistView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
    <section class="main main--level main--level-artist">
      ${svgTemplate}
      ${getMistakesTemplate(game.state.mistakes)}
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
          ${this.level.answers.map((answer, number) => this._melodyTemplate(answer, number + 1)).join(``)}
        </form>
      </div>
    </section>`;
  }

  _melodyTemplate({melodie}, number) {
    return `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
      <label class="main-answer" for="answer-${number}">
        <img class="main-answer-preview" src="${melodie.image}"
             alt="${melodie.artist}" width="134" height="134">
        ${melodie.artist}
      </label>
    </div>`;
  }

  onFormClick() {
    throw new Error(`Click handler is required`);
  }

  bind() {
    this._form = this.element.querySelector(`form.main-list`);
    this._checkBoxes = this.element.querySelectorAll(`.genre-answer input[type=checkbox]`);
    this._sendButton = this.element.querySelector(`.genre-answer-send`);

    this._form.onclick = (evt) => {
      this.onFormClick(evt);
    };
  }
}