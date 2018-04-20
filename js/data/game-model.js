import {getRandom, shuffleArray} from '../utils';
import showResult from './show-result';
import melodies from './melodies';

const previousScores = [4, 2, 9, 10, 10, 10, 7, 2, 7];

const Options = {
  ARTIST_SONGS_PER_LEVEL: 3,
  GENRE_SONGS_PER_LEVEL: 4,
  ARTIST: `levelArtist`,
  GENRE: `levelGenre`,
  TOTAL_QUESTIONS: 10,
  ANSWER_SPEED: 30,
  MISTAKES_TO_LOOSE: 3
};

const createLevel = (levelType = getRandom(0, 2) === 0 ? Options.ARTIST : Options.GENRE) => {
  const tempMelodies = shuffleArray(melodies.slice());
  const rightMelody = tempMelodies.pop();
  const level = {
    type: levelType,
    question: levelType === Options.ARTIST ? `Кто исполняет эту песню?` : `Выберите ${rightMelody.genre} треки`,
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
    this.INITIAL_STATE = {
      currentLevel: 0,
      currentFastScore: 0,
      levels: [],
      mistakes: 0,
      time: 0,
      userAnswers: [],
      previousScores
    };
  }

  init() {
    this.state = this.INITIAL_STATE;
    this.state = {levels: this._getRandomLevels()};
  }

  _getRandomLevels() {
    const randomLevels = [];
    for (let i = 0; i < Options.TOTAL_QUESTIONS; i++) {
      randomLevels.push(createLevel());
    }
    return randomLevels;
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
    return {
      minutes: 10,
      seconds: 23,
      score: this.state.currentLevel,
      scoreFast: this.state.currentFastScore,
      mistakes: this.state.mistakes,
      comparison: showResult(this.previousScores, {currentScore: this.state.currentLevel, notesLeft: Options.MISTAKES_TO_LOOSE - this.state.mistakes, timeLeft: 12})
    };
  }

  set answer(currentAnswer) {

  }

  get nextLevel() {

  }


}


// class Game {
//
//
//   nextLevel(answer) {
//     if (this.state.currentLevel > 0) {
//       this.testCurrentAnswer(answer);
//     }
//     if (this.state.mistakes === Options.MISTAKES_TO_LOOSE) {
//       drawPage(getResultAttemptsLeft().element);
//       return;
//     }
//     const level = this.state.currentLevel < Options.TOTAL_QUESTIONS ? this.state.levels[this.state.currentLevel] : false;
//     if (level) {
//       this.state = {currentLevel: this.state.currentLevel + 1};
//
//       switch (level.type) {
//         case Options.GENRE: drawPage(getLevelGenre(level).element); break;
//         case Options.ARTIST: drawPage(getLevelArtist(level).element); break;
//       }
//       return;
//     }
//     drawPage(getResultSuccess(this.result));
//   }
//
//   testUserAnswer() {
//     const currentLevel = this.state.levels[this.state.currentLevel - 1];
//     const userAnswers = this.state.userAnswers[this.state.currentLevel - 1];
//     return userAnswers.every((value, index) => currentLevel.answers[index].right === value);
//   }
//
//   testCurrentAnswer(userAnswer) {
//     this.state.userAnswers.push(userAnswer);
//     if (!this.testUserAnswer()) {
//       this.state = {mistakes: this.state.mistakes + 1};
//     }
//   }
//
// }
