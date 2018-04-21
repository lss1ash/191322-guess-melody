import ResultSuccessView from '../views/result-success-view';

export default class ResultSuccessScreen {
  constructor(data) {
    this._data = data;
  }

  _init() {
    this._resultSuccess = new ResultSuccessView(this._data);
    this._resultSuccess.onReplayClick = () => {
      // game.init();
    };
  }

  get screen() {
    if (!this._resultSuccess) {
      this._init();
    }
    return this._resultSuccess.element;
  }

}
