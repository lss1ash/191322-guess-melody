import Application from '../app';
import WelcomeView from '../views/welcome-view';

export default class WelcomeScreen {

  _init() {
    this._welcome = new WelcomeView();
    this._welcome.onPlayClick = () => {
      Application.showGame();
    };
  }

  get screen() {
    if (!this._welcome) {
      this._init();
    }
    return this._welcome.element;
  }

}
