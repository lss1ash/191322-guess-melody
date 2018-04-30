import LevelView from './level-view';

export default class LevelGenreView extends LevelView {
  constructor(level, time) {
    super();
    this.level = level;
    this.time = time;
  }

  mistakes() {
    throw new Error(`Mistakes is required`);
  }

  get template() {
    return `
    <section class="main main--level main--level-genre">
      ${this.timerTemplate}
      <div class="main-mistakes">
        ${`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`.repeat(this.mistakes())}
      </div>
      <div class="main-wrap">
        <h2 class="title">${this.level.question}</h2>
        <form class="genre">
          ${this.level.answers.map((answer, number) => this._melodyTemplate(answer, number + 1)).join(``)}
          <button class="genre-answer-send" disabled type="submit">Ответить</button>
        </form>
      </div>
    </section>`;
  }

  _melodyTemplate(melodie, number) {
    return `
    <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
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
      [...this.checkBoxes].forEach((checkbox) => {
        checked = checked || checkbox.checked;
      });
      this.sendButton.disabled = !checked;
    }
  }

  onLevelSubmit() {
    throw new Error(`Submit handler is required`);
  }

  bind() {
    this._form = this.element.querySelector(`form.genre`);
    this.checkBoxes = this._form.querySelectorAll(`.genre-answer input[type=checkbox]`);
    this.sendButton = this._form.querySelector(`.genre-answer-send`);
    this._timer = {
      minutesNode: this.element.querySelector(`.timer-value-mins`),
      secondsNode: this.element.querySelector(`.timer-value-secs`)
    };

    this._form.onsubmit = (evt) => {
      evt.preventDefault();
      this.onLevelSubmit();
    };

    this._form.onclick = (evt) => {
      this._onNoteClick(evt);
    };
  }
}
