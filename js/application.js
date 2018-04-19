const mainSection = document.querySelector(`.app .main`);

const drawScreen = (pageElement) => {
  if (mainSection) {
    if (mainSection.firstElementChild) {
      mainSection.replaceChild(pageElement, mainSection.firstElementChild);
    } else {
      mainSection.appendChild(pageElement);
    }
  }
};

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    drawScreen(welcome.element);
  }

  static showGame() {
    const model = new QuestModel();
    const gameScreen = new GameScreen(model);
    drawScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(stats) {
    const statistics = new StatsScreen(stats);
    drawScreen(statistics.element);
  }

}
