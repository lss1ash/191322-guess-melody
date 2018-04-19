import game from './main';
import LevelArtistView from '../views/level-artist-view';

export default class LevelArtistScreen {
  constructor(level) {
    this._level = level;
  }

  _init() {
    this._levelArtist = new LevelArtistView(this._level);
    this._levelArtist.onFormClick = ({target}) => {
      if (target.tagName.toUpperCase() === `INPUT` && target.type.toUpperCase() === `RADIO`) {
        const userAnswer = [...this._levelArtist.element.querySelectorAll(`input[type=radio]`)].map((radio) => radio.checked);
        game.nextLevel(userAnswer);
      }
    };
  }

  get screen() {
    if (!this._levelArtist) {
      this._init();
    }
    return this._levelArtist.element;
  }

}
