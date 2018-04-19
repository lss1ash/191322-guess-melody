import game from './main';
import LevelGenreView from '../views/level-genre-view';

export default class LevelGenreScreen {
  constructor(level) {
    this._level = level;
  }

  _init() {
    this._levelGenre = new LevelGenreView(this._level);
    this._levelGenre.onLevelSubmit = () => {
      this._levelGenre.sendButton.disabled = true;
      const userAnswer = [...this._levelGenre.checkBoxes].map((checkbox) => {
        const retValue = checkbox.checked;
        checkbox.checked = false;
        return retValue;
      });
      game.nextLevel(userAnswer);
    };
  }

  get screen() {
    if (!this._levelGenre) {
      this._init();
    }
    return this._levelGenre.element;
  }

}
