import {getRandom, getMinSec, shuffleArray} from '../utils';
import showResult from './show-result';
import calculateResult from './calculate-result';
import melodies from './melodies';

const previousScores = [4, 2, 9, 10, 10, 10, 7, 2, 7];

const SECONDS_PER_MINUTE = 60;

const Options = {
  ARTIST_SONGS_PER_LEVEL: 3,
  GENRE_SONGS_PER_LEVEL: 4,
  ARTIST: `levelArtist`,
  GENRE: `levelGenre`,
  TOTAL_QUESTIONS: 10,
  ANSWER_SPEED: 30,
  MISTAKES_TO_LOOSE: 3,
  TOTAL_TIME: 5 * SECONDS_PER_MINUTE,
  TIME_TO_STOP: 0
};


const createLevel = (levelType = getRandom(0, 2) === 0 ? Options.ARTIST : Options.GENRE) => {
  const tempMelodies = shuffleArray(melodies.slice());
  const rightMelody = tempMelodies.pop();
  const level = {
    type: levelType,
    question: levelType === Options.ARTIST ? `Кто исполняет эту песню?` : `Выберите ${rightMelody.genre} треки`,
    fastScoreTime: Options.ANSWER_SPEED,
    melodie: rightMelody,
    answers: []
  };
  const songs = levelType === Options.ARTIST ? Options.ARTIST_SONGS_PER_LEVEL : Options.GENRE_SONGS_PER_LEVEL;
  for (let i = 0; i < songs; i++) {
    const melodie = i === 0 ? rightMelody : tempMelodies.pop();
    level.answers.push({
      melodie,
      right: melodie.artist === rightMelody.artist
    });
  }
  level.answers = shuffleArray(level.answers);
  return level;
};


export default class GameModel {
  constructor() {
    this.Options = Options;
    const {minutes, seconds} = getMinSec(Options.TOTAL_TIME);
    this.INITIAL_STATE = {
      currentLevel: 0,
      levels: [],
      mistakes: 0,
      time: Options.TOTAL_TIME,
      minutes,
      seconds,
      userAnswers: [],
      previousScores
    };
  }

  init() {
    this.state = this.INITIAL_STATE;
    this.state = {levels: this._getRandomLevels()};
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
    const {score, fast} = calculateResult(this.userAnswers, this.state.mistakes, this.Options.TOTAL_QUESTIONS);
    const result = {
      minutes: this.state.minutes,
      seconds: this.state.seconds,
      score,
      scoreFast: fast,
      mistakes: this.state.mistakes,
      comparison: showResult(this.state.previousScores, {currentScore: score, notesLeft: Options.MISTAKES_TO_LOOSE - this.state.mistakes, timeLeft: this.state.time})
    };
    this.state.previousScores.push(score);
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
      randomLevels.push(createLevel());
    }
    return randomLevels;
  }

  _checkAnswer(currentAnswer) {
    const correct = this._isCorrectAnswer(currentAnswer);
    const fast = correct && this._isFastAnswer();
    if (!correct) {
      this.state = {mistakes: this.state.mistakes + 1};
    }
    this.state.userAnswers.push({correct, fast});
  }

  _isCorrectAnswer(currentAnswer) {
    const currentLevel = this.state.levels[this.state.currentLevel - 1];
    return currentAnswer.every((value, index) => currentLevel.answers[index].right === value);
  }


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  _isFastAnswer() {
    return false;
  }

  getNextLevel(currentAnswer) {
    if (this._state.currentLevel > 0) {
      this._checkAnswer(currentAnswer);
    }
    if (this.hasNextLevel) {
      const level = this._state.levels[this._state.currentLevel];
      this.state = {currentLevel: this.state.currentLevel + 1};
      return level;
    }
    return false;
  }

  getNormalizedTime() {
    const minutes = this.state.minutes.toString();
    const seconds = this.state.seconds.toString();
    const normalizedMinutes = minutes.length === 2 ? minutes : `0${minutes}`;
    const normalizedSeconds = seconds.length === 2 ? seconds : `0${seconds}`;
    return {normalizedMinutes, normalizedSeconds};
  }

  startGameTimer() {
    // console.log(`tick!`);
    const time = this.state.time - 1;
    const {minutes, seconds} = getMinSec(time);
    this.state = {
      time,
      minutes,
      seconds
    };
    return true;
  }

  fastScoreTick() {
    const level = this._state.levels[this._state.currentLevel - 1];
    // console.log(level.fastScoreTime);
    // console.log(this._state.currentFastScore);
    if (level.fastScoreTime > 0) {
      this._state.levels[this._state.currentLevel - 1].fastScoreTime--;
      return true;
    }
    return false;
  }

}
