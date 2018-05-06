import ResultAttemptsLeftView from '../views/result-attempts-left-view';

export default class ResultAttemptsLeftScreen {

  get screen() {
    if (!this._resultAttemptsLeft) {
      this._init();
    }
    return this._resultAttemptsLeft.element;
  }

  replay() {
    throw new Error(`replay() must be implemented`);
  }

  _init() {
    this._resultAttemptsLeft = new ResultAttemptsLeftView();
    this._resultAttemptsLeft.onReplayClick = () => {
      this.replay();
    };
  }
}
