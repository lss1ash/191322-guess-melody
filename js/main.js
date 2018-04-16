import {drawPage} from './utils';
import {GAME, INITIAL_STATE, getRandomLevels} from './data/game';
import showResult from './data/show-result';
import getWelcome from './templates/welcome';
import getResultAttemptsLeft from './templates/result-attempts-left';
import getResultSuccess from './templates/result-success';
import getLevelArtist from './templates/level-artist';
import getLevelGenre from './templates/level-genre';

class Game {

  setState(currentState) {
    if (!this._state) {
      this._state = {};
    }
    this._state = Object.assign(this._state, currentState);
  }

  get state() {
    return this._state;
  }

  get result() {
    return {
      minutes: 10,
      seconds: 23,
      score: this.state.currentLevel,
      scoreFast: this.state.currentLevel,
      mistakes: this.state.mistakes,
      comparison: showResult([], {currentScore: this.state.currentLevel, notesLeft: GAME.MISTAKES_TO_LOOSE - this.state.mistakes, timeLeft: 12})
    };
  }

  init() {
    this.setState(INITIAL_STATE);
    this.setState({levels: getRandomLevels()});
    drawPage(getWelcome().element);
  }

  nextLevel(answer) {
    if (this.state.currentLevel > 0) {
      this.testCurrentAnswer(answer);
    }
    if (this.state.mistakes === GAME.MISTAKES_TO_LOOSE) {
      drawPage(getResultAttemptsLeft().element);
      return;
    }
    const level = this.state.currentLevel < GAME.TOTAL_QUESTIONS ? this.state.levels[this.state.currentLevel] : false;
    if (level) {
      this.setState({currentLevel: this.state.currentLevel + 1});

      switch (level.type) {
        case GAME.GENRE: drawPage(getLevelGenre(level).element); break;
        case GAME.ARTIST: drawPage(getLevelArtist(level).element); break;
      }
      return;
    }
    drawPage(getResultSuccess(this.result));
  }

  testUserAnswer() {
    return this.result.userAnswers[this.result.currentLevel - 1].every((value, index) => this.result.levels[this.result.currentLevel - 1].answers[index].right === value);
  }

  testCurrentAnswer(userAnswer) {
    this.state.userAnswers.push(userAnswer);
    if (!this.testUserAnswer()) {
      this.setState({mistakes: this.state.mistakes + 1});
    }
  }

}

const game = new Game();
export default game;

const contentLoadedHandler = () => {
  game.init();
};
document.addEventListener(`DOMContentLoaded`, contentLoadedHandler);
