import WelcomeScreen from './screens/welcome-screen';
import Game from './data/game';
import Data from './data/data';

// const URL = `https://es.dump.academy/guess-melody/questions`;
const URL = `https://es.dump.academy/guess-melody/questionasdasdasdas`;

export default class Application {

  static showWelcome() {
    this._mainSection = document.querySelector(`.app .main`);
    const welcome = new WelcomeScreen();
    Application.drawScreen(welcome.screen);

    this.data = new Data(URL);
    const audio = this.data.get();
  }

  static showGame() {
    const game = new Game();
    game.start();
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
