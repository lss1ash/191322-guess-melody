import AbstractView from './abstract-view';

export default class LevelArtistView extends AbstractView {
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
    <section class="main main--level main--level-artist">
      ${this._timeTemplate()}
      <div class="main-mistakes">
        ${`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`.repeat(this.mistakes())}
      </div>
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

  _timeTemplate() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${this.time.normalizedMinutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${this.time.normalizedSeconds}</span>
      </div>
    </svg>`;
  }

  onFormClick() {
    throw new Error(`Click handler is required`);
  }

  bind() {
    this._form = this.element.querySelector(`form.main-list`);
    this._checkBoxes = this.element.querySelectorAll(`.genre-answer input[type=checkbox]`);
    this._sendButton = this.element.querySelector(`.genre-answer-send`);
    this._timer = {
      minutesNode: this.element.querySelector(`.timer-value-mins`),
      secondsNode: this.element.querySelector(`.timer-value-secs`)
    };

    this._form.onclick = (evt) => {
      this.onFormClick(evt);
    };
  }
}
