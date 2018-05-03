import LevelGenreView from '../views/level-genre-view';

export default class LevelGenreScreen {
  constructor(level, time) {
    this.AUDIO_START_POSITION = 0;
    this._level = level;
    this._time = time;
  }

  _init() {
    this._levelGenre = new LevelGenreView(this._level, this._time);
    this._levelGenre.onLevelSubmit = () => {
      this._levelGenre.sendButton.disabled = true;
      const userAnswer = [...this._levelGenre.checkBoxes].map((checkbox) => {
        const retValue = checkbox.checked;
        checkbox.checked = false;
        return retValue;
      });
      this.nextLevel(userAnswer);
    };
    this._levelGenre.mistakes = () => this._mistakes;
  }

  set mistakes(mistakes) {
    this._mistakes = mistakes;
  }

  nextLevel() {
    throw new Error(`NextLevel must be implemented`);
  }

  get screen() {
    if (!this._levelGenre) {
      this._init();
    }
    return this._levelGenre.element;
  }

  drawTime(time) {
    this._levelGenre.timer = time;
  }

  rewind() {
    this._levelGenre.level.answers.forEach((answer) => answer.audio.currentTime = this.AUDIO_START_POSITION);
  }

  onScreenShow() {
    this._levelGenre.autoPlay();
  }

  onEnd() {
    this._levelGenre.pauseAll();
  }

}
