import ResultTimeLeftView from '../views/result-time-left-view';

export default class ResultTimeLeftScreen {

  get screen() {
    if (!this._resultTimeLeft) {
      this._init();
    }
    return this._resultTimeLeft.element;
  }

  replay() {
    throw new Error(`replay() must be implemented`);
  }

  _init() {
    this._resultTimeLeft = new ResultTimeLeftView();
    this._resultTimeLeft.onReplayClick = () => {
      this.replay();
    };
  }
}
