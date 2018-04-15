import {drawPage} from './utils';
import {GAME, INITIAL_STATE, getRandomLevels} from './data/game';
import showResult from './data/show-result';
import WelcomeView from './templates/welcome';
import ResultAttemptsLeftView from './templates/result-attempts-left';
import ResultSuccessView from './templates/result-success';
import LevelArtistView from './templates/level-artist';
import LevelGenreView from './templates/level-genre';

let gameState;

const compileResult = () => {
  return {
    minutes: 10,
    seconds: 23,
    score: gameState.currentLevel,
    scoreFast: gameState.currentLevel,
    mistakes: gameState.mistakes,
    comparison: showResult([], {currentScore: gameState.currentLevel, notesLeft: GAME.MISTAKES_TO_LOOSE - gameState.mistakes, timeLeft: 12})
  };
};

export const resetGameState = () => Object.assign({}, INITIAL_STATE);
export const nextGameLevel = (answer) => {
  if (gameState.currentLevel > 0) {
    testCurrentAnswer(answer);
  }
  if (gameState.mistakes === GAME.MISTAKES_TO_LOOSE) {
    drawPage(new ResultAttemptsLeftView().element);
    return;
  }
  const level = gameState.currentLevel < GAME.TOTAL_QUESTIONS ? gameState.levels[gameState.currentLevel] : false;
  if (level) {
    gameState.currentLevel++;

    switch (level.type) {
      case GAME.GENRE: drawPage(new LevelGenreView(level).element); break;
      case GAME.ARTIST: drawPage(new LevelArtistView(level).element); break;
    }
    return;
  }
  drawPage(new ResultSuccessView(compileResult()));
};
export const getMistakes = () => gameState.mistakes;
export const initializeGame = () => {
  gameState = resetGameState();
  gameState.levels = getRandomLevels();
  drawPage(new WelcomeView().element);
};

const testUserAnswer = () => {
  return gameState.userAnswers[gameState.currentLevel - 1].every((value, index) => gameState.levels[gameState.currentLevel - 1].answers[index].right === value);
};

const testCurrentAnswer = (userAnswer) => {
  gameState.userAnswers.push(userAnswer);
  if (!testUserAnswer()) {
    gameState.mistakes++;
  }
};

const contentLoadedHandler = () => {
  initializeGame();
};
document.addEventListener(`DOMContentLoaded`, contentLoadedHandler);
