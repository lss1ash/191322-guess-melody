import GameModel from './game-model';
import Application from '../app';
import LevelArtistScreen from '../screens/level-artist-screen';
import LevelGenreScreen from '../screens/level-genre-screen';
import ResultSuccessScreen from '../screens/result-success-screen';
import ResultAttemptsLeftScreen from '../screens/result-attempts-left-screen';
import ResultTimeLeftScreen from '../screens/result-time-left-screen';

export default class Game {
  constructor() {
    this.model = new GameModel();
    this.model.init();
    this.timerInit();
  }

  start() {
    this.showScreen();
    this.fastScoreTimerInit();
  }

  end() {
    clearInterval(this._fastInterval);
    const result = this.model.result;
    let resultScreen = false;
    if (result.score === this.model.Options.TOTAL_QUESTIONS) {
      resultScreen = new ResultSuccessScreen(result);
    }
    if (result.mistakes === this.model.Options.MISTAKES_TO_LOOSE) {
      resultScreen = new ResultAttemptsLeftScreen();
    }
    if (result.seconds === 0 && result.minutes === 0) {
      resultScreen = new ResultTimeLeftScreen();
    }
    if (resultScreen) {
      resultScreen.replay = () => Application.showWelcome();
      Application.drawScreen(resultScreen.screen);
    }
  }

  nextLevel(currentAnswer) {
    this.showScreen(currentAnswer);
    this.fastScoreTimerInit();
  }

  showScreen(currentAnswer) {
    const level = this.model.getNextLevel(currentAnswer);
    const time = this.model.getNormalizedTime();
    if (level) {
      switch (level.type) {
        case this.model.Options.ARTIST:
          this.level = new LevelArtistScreen(level, time);
          break;
        case this.model.Options.GENRE:
          this.level = new LevelGenreScreen(level, time);
          break;
      }
      this.level.mistakes = this.model.state.mistakes;
      this.level.nextLevel = (userAnswer) => this.nextLevel(userAnswer);
      Application.drawScreen(this.level.screen);
    } else {
      this.end();
    }
  }

  timerInit() {
    this._interval = setInterval(() => {
      if (!this.model.tick()) {
        clearInterval(this._interval);
        this.end();
      }
      this.level.drawTime(this.model.getNormalizedTime());
    }, 1000);
  }

  fastScoreTimerInit() {
    if (this._fastInterval) {
      clearInterval(this._fastInterval);
    }
    this._fastInterval = setInterval(() => {
      if (!this.model.fastScoreTick()) {
        clearInterval(this._fastInterval);
      }
    }, 1000);
  }

}
