import Game from './data/game';

export default class Application {

  static showWelcome() {
    this._app = document.querySelector(`.app`);
    this.dialog = this._app.querySelector(`.dialog`);
    this._mainSection = this._app.querySelector(`.main`);
    this.game = new Game();
    this.game.init();
  }

  static showGame() {
    this.game.start();
  }

  static replay() {
    this.game.init();
    this.game.start();
  }

  static drawScreen(element) {
    if (this._mainSection) {
      if (this._mainSection.firstElementChild) {
        this._mainSection.replaceChild(element, this._mainSection.firstElementChild);
      } else {
        this._mainSection.appendChild(element);
      }
    }
  }

}
