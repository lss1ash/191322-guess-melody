import WelcomeScreen from './screens/welcome-screen';

import Game from './data/game';

export default class Application {
  constructor() {
    this.mainSection = document.querySelector(`.app .main`);
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    Application.drawScreen(welcome.screen);
  }

  static showGame() {
    const game = new Game();
    game.start();
  }

  static drawScreen(element) {
    if (this.mainSection) {
      if (this.mainSection.firstElementChild) {
        this.mainSection.replaceChild(element, this.mainSection.firstElementChild);
      } else {
        this.mainSection.appendChild(element);
      }
    }
  }

}
