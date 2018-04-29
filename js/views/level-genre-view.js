import LevelView from './level-view';

const PlayerState = {
  PAUSED: `paused`,
  PLAYING: `playing`
};

export default class LevelGenreView extends LevelView {
  constructor(level, time) {
    super();
    this.level = level;
    this.time = time;
    this.classPaused = `player-control--pause`;
    this.state = PlayerState.PAUSED;
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

  // ${answer.audio.outerHTML}

  _melodyTemplate(answer, number) {
    return `
    <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">

          <button class="player-control player-control--pause" data-number="${number}"></button>
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
      this._onButtonClick(evt.target);
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
    if (PlayerState.PLAYING) {
      if (target.classList.contains(this.classPaused)) {
        this._pauseAll();
        this._play(target);
      } else {
        this._pauseAll();
      }
    } else {
      this._play(target);
    }
  }

  _pauseAll() {
    this.level.answers.forEach((answer) => {
      if (!answer.audio.paused) {
        answer.audio.pause();
      }
      [...this.playButtons].forEach((button) => {
        if (!button.classList.contains(this.classPaused)) {
          button.classList.add(this.classPaused);
        }
      });
    });
    this.state = PlayerState.PAUSED;
  }

  _play(target) {
    this.level.answers[+target.dataset.number - 1].audio.play();
    if (target.classList.contains(this.classPaused)) {
      target.classList.remove(this.classPaused);
    }
  }

  onLevelSubmit() {
    throw new Error(`Submit handler is required`);
  }

  bind() {
    this._form = this.element.querySelector(`form.genre`);
    this.checkBoxes = this._form.querySelectorAll(`.genre-answer input[type=checkbox]`);
    this.playButtons = this._form.querySelectorAll(`.genre-answer .player-control`);
    this.sendButton = this._form.querySelector(`.genre-answer-send`);
    this._timer = {
      minutesNode: this.element.querySelector(`.timer-value-mins`),
      secondsNode: this.element.querySelector(`.timer-value-secs`)
    };

    this.level.answers.forEach((answer) => {
      answer.onpaused = () => this._pauseAll();
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
