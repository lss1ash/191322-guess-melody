import game from './main';
import ResultAttemptsLeftView from '../views/result-attempts-left-view';

export default class ResultAttemptsLeftScreen {

  _init() {
    this._resultAttemptsLeft = new ResultAttemptsLeftView();
    this._resultAttemptsLeft.onReplayClick = () => {
      game.init();
    };
  }

  get screen() {
    if (!this._resultAttemptsLeft) {
      this._init();
    }
    return this._resultAttemptsLeft.element;
  }

}
