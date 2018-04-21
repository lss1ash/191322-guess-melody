import LevelGenreView from '../views/level-genre-view';
import Game from '../data/game';

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
      Game.nextLevel(userAnswer);
      // ПРОБОВАТЬ ПАТТЕРН СЛУШАТЕЛЬ
    };
  }

  nextLevel() {
    throw new Error(`NextLevel must be replaced`);
  }

  get screen() {
    if (!this._levelGenre) {
      this._init();
    }
    return this._levelGenre.element;
  }

}
