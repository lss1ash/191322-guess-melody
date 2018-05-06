import LevelArtistView from '../views/level-artist-view';

export default class LevelArtistScreen {
  constructor(level, time) {
    this.AUDIO_START_POSITION = 0;
    this._level = level;
    this._time = time;
  }

  get screen() {
    if (!this._levelArtist) {
      this._init();
    }
    return this._levelArtist.element;
  }

  set mistakes(mistakes) {
    this._mistakes = mistakes;
  }

  nextLevel() {
    throw new Error(`NextLevel must be implemented`);
  }

  drawTime(time) {
    this._levelArtist.timer = time;
  }

  rewind() {
    this._levelArtist.level.audio.currentTime = this.AUDIO_START_POSITION;
  }

  _init() {
    this._levelArtist = new LevelArtistView(this._level, this._time);
    this._levelArtist.onFormClick = () => {
      const userAnswer = [...this._levelArtist.radioButtons].map((radio) => radio.checked);
      this.nextLevel(userAnswer);
    };
    this._levelArtist.mistakes = () => this._mistakes;
  }

  onScreenShow() {
    this._levelArtist.play();
  }

  onEnd() {
    this._levelArtist.pause();
  }
}
