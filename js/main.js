import {drawPage} from './utils';
import {Options, INITIAL_STATE, getRandomLevels} from './data/game';
import showResult from './data/show-result';
import getWelcome from './welcome';
import getResultAttemptsLeft from './result-attempts-left';
import getResultSuccess from './result-success';
import getLevelArtist from './level-artist';
import getLevelGenre from './level-genre';

class Game {

  set state(currentState) {
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
      comparison: showResult([], {currentScore: this.state.currentLevel, notesLeft: Options.MISTAKES_TO_LOOSE - this.state.mistakes, timeLeft: 12})
    };
  }

  init() {
    this.state = INITIAL_STATE;
    this.state = {levels: getRandomLevels()};
    drawPage(getWelcome().element);
  }

  nextLevel(answer) {
    if (this.state.currentLevel > 0) {
      this.testCurrentAnswer(answer);
    }
    if (this.state.mistakes === Options.MISTAKES_TO_LOOSE) {
      drawPage(getResultAttemptsLeft().element);
      return;
    }
    const level = this.state.currentLevel < Options.TOTAL_QUESTIONS ? this.state.levels[this.state.currentLevel] : false;
    if (level) {
      this.state = {currentLevel: this.state.currentLevel + 1};

      switch (level.type) {
        case Options.GENRE: drawPage(getLevelGenre(level).element); break;
        case Options.ARTIST: drawPage(getLevelArtist(level).element); break;
      }
      return;
    }
    drawPage(getResultSuccess(this.result));
  }

  testUserAnswer() {
    const currentLevel = this.state.levels[this.state.currentLevel - 1];
    const userAnswers = this.state.userAnswers[this.state.currentLevel - 1];
    return userAnswers.every((value, index) => currentLevel.answers[index].right === value);
  }

  testCurrentAnswer(userAnswer) {
    this.state.userAnswers.push(userAnswer);
    if (!this.testUserAnswer()) {
      this.state = {mistakes: this.state.mistakes + 1};
    }
  }

}

const game = new Game();
export default game;

const contentLoadedHandler = () => {
  game.init();
};
document.addEventListener(`DOMContentLoaded`, contentLoadedHandler);
