import LevelView from './level-view';

export default class LevelArtistView extends LevelView {
  constructor(level, time) {
    super();
    this.level = level;
    this.time = time;
  }

  get template() {
    return `
    <section class="main main--level main--level-artist">
      ${this.timerTemplate}
      <div class="main-mistakes">
        ${`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`.repeat(this.mistakes())}
      </div>
      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${this.level.answers.map((answer, number) => this.melodyTemplate(answer, number + 1)).join(``)}
        </form>
      </div>
    </section>`;
  }

  pause() {
    this.level.audio.pause();
    if (this.playButton.classList.contains(this.PAUSE_CLASS)) {
      this.playButton.classList.remove(this.PAUSE_CLASS);
    }
    this.state = this.PlayerState.PAUSED;
  }

  play() {
    this.level.audio.play();
    if (!this.playButton.classList.contains(this.PAUSE_CLASS)) {
      this.playButton.classList.add(this.PAUSE_CLASS);
    }
    this.state = this.PlayerState.PLAYING;
  }

  bind() {
    this._form = this.element.querySelector(`form.main-list`);
    this.radioButtons = this.element.querySelectorAll(`.main-answer-wrapper input[type=radio]`);
    this.playButton = this.element.querySelector(`.player-control`);

    this._timer = {
      timerNode: this.element.querySelector(`.timer-value`),
      minutesNode: this.element.querySelector(`.timer-value-mins`),
      secondsNode: this.element.querySelector(`.timer-value-secs`),
      dotsNode: this.element.querySelector(`.timer-value-dots`)
    };

    this.level.audio.onended = () => this.pause();

    this._form.onclick = (evt) => {
      this.pause();
      this._onFormClick(evt);
    };

    this.playButton.onclick = (evt) => {
      this._onButtonClick(evt);
    };
  }

  mistakes() {
    throw new Error(`Mistakes is required`);
  }

  _onFormClick(evt) {
    if (evt.target.tagName.toUpperCase() === `INPUT` && evt.target.type.toUpperCase() === `RADIO`) {
      this.onFormClick();
    }
  }

  _onButtonClick(evt) {
    if (evt.target.tagName.toUpperCase() === `BUTTON` && evt.target.classList.contains(`player-control`)) {
      evt.preventDefault();
      this._onPlayerToggle();
    }
  }

  _onPlayerToggle() {
    if (this.state === this.PlayerState.PLAYING) {
      this.pause();
    } else {
      this.play();
    }
  }

  onFormClick() {
    throw new Error(`Click handler is required`);
  }

  static melodyTemplate(melodie, number) {
    return `
    <div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
    <label class="main-answer" for="answer-${number}">
    <img class="main-answer-preview" src="${melodie.image.url}"
    alt="${melodie.title}" width="134" height="134">
    ${melodie.title}
    </label>
    </div>`;
  }
}
