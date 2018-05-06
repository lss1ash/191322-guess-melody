import Application from '../app';
import WelcomeView from '../views/welcome-view';
import {getElementFromString} from '../utils';

export default class WelcomeScreen {

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
    const spinner = getElementFromString(`<div class="spinner"></div>`);
    this.spinner = this._welcome.element.insertBefore(spinner, this._welcome.playButton);
    this._welcome.playButton.style.opacity = 0;
  }

  hideSpinner() {
    this._welcome.element.removeChild(this.spinner);
    this._welcome.playButton.style.opacity = 100;
  }

  _init() {
    this._welcome = new WelcomeView();
  }
}
