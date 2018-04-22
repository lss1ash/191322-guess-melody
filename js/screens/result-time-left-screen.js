import ResultTimeLeftView from '../views/result-time-left-view';

export default class ResultTimeLeftScreen {

  _init() {
    this._resultTimeLeft = new ResultTimeLeftView();
    this._resultTimeLeft.onReplayClick = () => {
      this.replay();
    };
  }

  replay() {
    throw new Error(`replay() must be replaced`);
  }

  get screen() {
    if (!this._resultTimeLeft) {
      this._init();
    }
    return this._resultTimeLeft.element;
  }

}
