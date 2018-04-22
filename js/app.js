import WelcomeScreen from './screens/welcome-screen';
import Game from './data/game';

const mainSection = document.querySelector(`.app .main`);

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    Application.drawScreen(welcome.screen);
  }

  static showGame() {
    const game = new Game();
    game.start();
  }

  static drawScreen(element) {
    if (mainSection) {
      if (mainSection.firstElementChild) {
        mainSection.replaceChild(element, mainSection.firstElementChild);
      } else {
        mainSection.appendChild(element);
      }
    }
  }

}
