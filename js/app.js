import Game from './data/game';

export default class Application {

  static showWelcome() {
    this._mainSection = document.querySelector(`.app .main`);
    this.game = new Game();
  }

  static showGame() {
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
