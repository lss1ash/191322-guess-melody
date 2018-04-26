import {getRandom, shuffleArray} from '../utils';
import showResult from './show-result';
import calculateResult from './calculate-result';
import Timer from './timer';
import melodies from './melodies';

const previousScores = [4, 2, 9, 10, 10, 10, 7, 2, 7];

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

const Genre = {
  COUNTRY: `country`,
  BLUES: `blues`,
  FOLK: `folk`,
  CLASSICAL: `classical`,
  ELECTRONIC: `electronic`,
  HIP_HOP: `hip-hop`,
  JAZZ: `jazz`,
  POP: `pop`,
  ROCK: `rock`
};

// const createLevel = (levelType = getRandom(0, 2) === 0 ? Options.ARTIST : Options.GENRE) => {
//   const tempMelodies = shuffleArray(melodies.slice());
//   const rightMelody = tempMelodies.pop();
//   const level = {
//     type: levelType,
//     question: levelType === Options.ARTIST ? `Кто исполняет эту песню?` : `Выберите ${rightMelody.genre} треки`,
//     fastScoreTime: Options.ANSWER_SPEED,
//     melodie: rightMelody,
//     answers: []
//   };
//   const songs = levelType === Options.ARTIST ? Options.ARTIST_SONGS_PER_LEVEL : Options.GENRE_SONGS_PER_LEVEL;
//   for (let i = 0; i < songs; i++) {
//     const melodie = i === 0 ? rightMelody : tempMelodies.pop();
//     level.answers.push({
//       melodie,
//       right: melodie.artist === rightMelody.artist
//     });
//   }
//   level.answers = shuffleArray(level.answers);
//   return level;
// };


export default class GameModel {
  constructor() {
    this.Options = Options;
    this.LevelType = LevelType;
    this.INITIAL_STATE = {
      currentLevel: 0,
      levels: [],
      mistakes: 0,
      time: Options.TOTAL_TIME,
      userAnswers: [],
      previousScores
    };
  }

  init() {
    this.state = this.INITIAL_STATE;
    // this.state = {levels: this._getRandomLevels()};
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
      this.state.previousScores.push(calculatedResult.score);
    }
    const result = {
      score: calculatedResult.score,
      scoreFast: calculatedResult.fast,
      time: this.state.time,
      mistakes: this.state.mistakes,
      comparison: showResult(this.state.previousScores, {currentScore: calculatedResult.score, notesLeft: Options.MISTAKES_TO_LOOSE - this.state.mistakes, timeLeft: this.state.time})
    };
    return result;
  }

  get hasNextLevel() {
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

  _getRandomLevels() {
    const randomLevels = [];
    for (let i = 0; i < Options.TOTAL_QUESTIONS; i++) {
      // randomLevels.push(createLevel());
    }
    return randomLevels;
  }

  _checkAnswer(currentAnswer) {
    const right = this._isCorrectAnswer(currentAnswer);
    const fast = right && this._isFastAnswer();
    if (!right) {
      this.state = {mistakes: this.state.mistakes + 1};
    }
    this.state.userAnswers.push({right, fast});
    // console.log(`{${right}, ${fast}}`);
  }

  _isCorrectAnswer(currentAnswer) {
    const currentLevel = this.state.levels[this.state.currentLevel - 1];
    // if (currentLevel.type === this.LevelType.ARTIST)
    return currentAnswer.every((value, index) => currentLevel.answers[index].right === value);
  }

  _isFastAnswer() {
    if (this._fastScoreTimer) {
      return this._fastScoreTimer.seconds > 0;
    }
    return false;
  }

  getNextLevel(currentAnswer) {
    if (this._state.currentLevel > 0) {
      this._checkAnswer(currentAnswer);
    }
    if (this.hasNextLevel) {
      const level = this._state.levels[this._state.currentLevel];
      this.state = {currentLevel: this.state.currentLevel + 1};
      this.getFastTimer();
      // console.log(level.answers);
      return level;
    }
    return false;
  }

  getFastTimer() {
    if (this._fastScoreTimer) {
      this._fastScoreTimer.stop();
    }
    this._fastScoreTimer = new Timer(Options.ANSWER_SPEED);
    this._fastScoreTimer.start();
  }

}
