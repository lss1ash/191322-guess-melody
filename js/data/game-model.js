import showResult from './show-result';
import calculateResult from './calculate-result';
import Statistic from './statistic';
import Timer from './timer';

const SECONDS_PER_MINUTE = 60;

const Options = {
  ARTIST_SONGS_PER_LEVEL: 3,
  GENRE_SONGS_PER_LEVEL: 4,
  TOTAL_QUESTIONS: 10,
  ANSWER_SPEED: 30,
  MISTAKES_TO_LOOSE: 3,
  TOTAL_TIME: 5 * SECONDS_PER_MINUTE,
  TIME_TO_STOP: 0
};

const LevelType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export default class GameModel {
  constructor() {
    this.Options = Options;
    this.LevelType = LevelType;
    this.statistic = new Statistic();
    this.INITIAL_STATE = {
      currentLevel: 0,
      levels: [],
      mistakes: 0,
      time: Options.TOTAL_TIME,
      userAnswers: [],
      statistic: []
    };
  }

  init() {
    this.state = this.INITIAL_STATE;
    this.statistic.get((statistic) => this._onStatisticGetSuccess(statistic), (error) => this.onStatisticGetError(error));
  }

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
    let calculatedResult = {score: 0, fast: 0};
    if (this.state.userAnswers.length === Options.TOTAL_QUESTIONS) {
      calculatedResult = calculateResult(this.state.userAnswers, this.state.mistakes, this.Options.TOTAL_QUESTIONS);
      this.statistic.post(calculatedResult.score, () => {}, (error) => this.onStatisticPostError(error));
    }
    const result = {
      score: calculatedResult.score,
      scoreFast: calculatedResult.fast,
      time: this.state.time,
      mistakes: this.state.mistakes,
      comparison: showResult(this.state.statistic, {currentScore: calculatedResult.score, notesLeft: Options.MISTAKES_TO_LOOSE - this.state.mistakes, timeLeft: this.state.time})
    };
    return result;
  }

  get _hasNextLevel() {
    if (this.state.mistakes === Options.MISTAKES_TO_LOOSE) {
      return false;
    }
    if (this.state.time === Options.TIME_TO_STOP) {
      return false;
    }
    if (this.state.currentLevel === Options.TOTAL_QUESTIONS) {
      return false;
    }
    return true;
  }

  _checkAnswer(currentAnswer) {
    const right = this._isCorrectAnswer(currentAnswer);
    const fast = right && this._isFastAnswer();
    if (!right) {
      this.state = {mistakes: this.state.mistakes + 1};
    }
    this.state.userAnswers.push({right, fast});
  }

  _isCorrectAnswer(currentAnswer) {
    const currentLevel = this.state.levels[this.state.currentLevel - 1];
    if (currentLevel.type === this.LevelType.GENRE) {
      return currentAnswer.every((value, index) => (currentLevel.answers[index].genre === currentLevel.genre) === value);
    }
    return currentAnswer.every((value, index) => currentLevel.answers[index].isCorrect === value);
  }

  _isFastAnswer() {
    if (this._fastScoreTimer) {
      return this._fastScoreTimer.seconds > 0;
    }
    return false;
  }

  _getFastTimer() {
    if (this._fastScoreTimer) {
      this._fastScoreTimer.stop();
    }
    this._fastScoreTimer = new Timer(Options.ANSWER_SPEED);
    this._fastScoreTimer.start();
  }

  getNextLevel(currentAnswer) {
    if (this._state.currentLevel > 0) {
      this._checkAnswer(currentAnswer);
    }
    if (this._hasNextLevel) {
      const level = this._state.levels[this._state.currentLevel];
      this.state = {currentLevel: this.state.currentLevel + 1};
      this._getFastTimer();
      // console.log(level.answers);
      return level;
    }
    return false;
  }

  _onStatisticGetSuccess(statistic) {
    this.state = {statistic};
    this.onStatisticGetSuccess();
  }

  onStatisticGetSuccess() {
    throw new Error(`Must be implemented`);
  }

  onStatisticGetError(error) {
    throw new Error(`Ошибка получения статистических данных: ${error}`);
  }

  onStatisticPostError(error) {
    throw new Error(`Ошибка сохранения статистических данных: ${error}`);
  }
}
