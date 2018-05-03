import LevelArtistView from '../views/level-artist-view';

export default class LevelArtistScreen {
  constructor(level, time) {
    this.AUDIO_START_POSITION = 0;
    this._level = level;
    this._time = time;
  }

  _init() {
    this._levelArtist = new LevelArtistView(this._level, this._time);
    this._levelArtist.onFormClick = () => {
      const userAnswer = [...this._levelArtist.radioButtons].map((radio) => radio.checked);
      this.nextLevel(userAnswer);
    };
    this._levelArtist.mistakes = () => this._mistakes;
  }

  set mistakes(mistakes) {
    this._mistakes = mistakes;
  }

  nextLevel() {
    throw new Error(`NextLevel must be implemented`);
  }

  get screen() {
    if (!this._levelArtist) {
      this._init();
    }
    return this._levelArtist.element;
  }

  drawTime(time) {
    this._levelArtist.timer = time;
  }

  rewind() {
    this._levelArtist.level.audio.fastSeek(this.AUDIO_START_POSITION);
  }

  onScreenShow() {
    this._levelArtist.play();
  }

  onEnd() {
    this._levelArtist.pause();
  }

}
