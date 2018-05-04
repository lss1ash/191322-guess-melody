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

  _melodyTemplate(answer, number) {
    return `
    <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control" data-number="${number}"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}">
      <label class="genre-answer-check" for="a-${number}"></label>
    </div>`;
  }

  _onFormClick(evt) {
    if (evt.target.tagName.toUpperCase() === `INPUT` && evt.target.type.toUpperCase() === `CHECKBOX`) {
      this._onNoteClick();
    } else if (evt.target.tagName.toUpperCase() === `BUTTON`) {
      evt.preventDefault();
      if (evt.target.classList.contains(`player-control`)) {
        this._onButtonClick(evt.target);
      } else if (evt.target.classList.contains(`genre-answer-send`)) {
        this.pauseAll();
        this.onLevelSubmit();
      }
    }
  }

  _onNoteClick() {
    let checked = false;
    [...this.checkBoxes].forEach((checkbox) => {
      checked = checked || checkbox.checked;
    });
    this.sendButton.disabled = !checked;
  }

  _onButtonClick(target) {
    if (this.PlayerState.PLAYING) {
      if (!target.classList.contains(this.PAUSE_CLASS)) {
        this.pauseAll();
        this._play(target);
      } else {
        this.pauseAll();
      }
    } else {
      this._play(target);
    }
  }

  pauseAll() {
    this.level.answers.forEach((answer) => {
      if (!answer.audio.paused) {
        answer.audio.pause();
      }
      [...this._playButtons].forEach((button) => {
        if (button.classList.contains(this.PAUSE_CLASS)) {
          button.classList.remove(this.PAUSE_CLASS);
        }
      });
    });
    this.state = this.PlayerState.PAUSED;
  }

  _play(target) {
    this.level.answers[+target.dataset.number - 1].audio.play();
    this.state = this.PlayerState.PLAYING;
    if (!target.classList.contains(this.PAUSE_CLASS)) {
      target.classList.add(this.PAUSE_CLASS);
    }
  }

  autoPlay() {
    for (let i = 0; i < this.level.answers.length; i++) {
      if (!this.level.answers[i].audio.ended) {
        this._play(this._playButtons[i]);
        return;
      }
    }
  }

  onLevelSubmit() {
    throw new Error(`Submit handler is required`);
  }

  bind() {
    this._form = this.element.querySelector(`form.genre`);
    this.checkBoxes = this._form.querySelectorAll(`.genre-answer input[type=checkbox]`);
    this._playButtons = this._form.querySelectorAll(`.player-control`);
    this.sendButton = this._form.querySelector(`.genre-answer-send`);

    this._timer = {
      timerNode: this.element.querySelector(`.timer-value`),
      minutesNode: this.element.querySelector(`.timer-value-mins`),
      secondsNode: this.element.querySelector(`.timer-value-secs`),
      dotsNode: this.element.querySelector(`.timer-value-dots`)
    };

    this.level.answers.forEach((answer, index) => {
      this.level.answers[index].audio.onended = () => {
        this.pauseAll();
        this.autoPlay();
      };
    });

    this._form.onsubmit = (evt) => {
      evt.preventDefault();
      this.pauseAll();
      this.onLevelSubmit();
    };

    this._form.onclick = (evt) => {
      this._onFormClick(evt);
    };
  }
}
