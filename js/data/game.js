import GameModel from './game-model';
import Application from '../application';
import LevelArtistScreen from '../screens/level-artist-screen';
import LevelGenreScreen from '../screens/level-genre-screen';
import ResultSuccessScreen from '../screens/result-success-screen';
import ResultAttemptsLeftScreen from '../screens/result-attempts-left-screen';
import ResultTimeLeftScreen from '../screens/result-time-left-screen';

export default class Game {
  constructor() {
    this.model = new GameModel();
    this.model.init();
  }

  start() {
    this.showScreen();
  }

  end() {
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
  }

  showScreen(currentAnswer) {
    const level = this.model.getNextLevel(currentAnswer);
    if (level) {
      const levelArtist = new LevelArtistScreen(level);
      const levelGenre = new LevelGenreScreen(level);
      levelArtist.mistakes = this.model.state.mistakes;
      levelGenre.mistakes = this.model.state.mistakes;
      levelArtist.nextLevel = levelGenre.nextLevel = (userAnswer) => this.nextLevel(userAnswer);
      switch (level.type) {
        case this.model.Options.ARTIST: Application.drawScreen(levelArtist.screen); break;
        case this.model.Options.GENRE: Application.drawScreen(levelGenre.screen); break;
      }
    } else {
      this.end();
    }
  }

}
