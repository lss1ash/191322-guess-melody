import Application from '../app';
import WelcomeView from '../views/welcome-view';

export default class WelcomeScreen {

  _init() {
    this._welcome = new WelcomeView();
  }

  get screen() {
    if (!this._welcome) {
      this._init();
    }
    return this._welcome.element;
  }

  setHandler() {
    this._welcome.onPlayClick = () => {
      Application.showGame();
    };
  }

  showSpinner() {
    this._welcome.playButton.classList.add(`.main-play--spinning`);
  }

  hideSpinner() {
    this._welcome.playButton.classList.remove(`.main-play--spinning`);
  }
}
