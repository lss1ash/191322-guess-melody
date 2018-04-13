import {drawPage} from './utils';
import {GAME, INITIAL_STATE, getRandomLevels} from './data/game';
import welcomeTemplate from './templates/welcome';
import resultAttemptsLeftTemplate from './templates/result-attempts-left';

let gameState;

export const resetGameState = () => Object.assign({}, INITIAL_STATE);
export const nextGameLevel = (answer) => {
  if (gameState.currentLevel > 0) {
    if (!testCurrentAnswer(answer)) {
      drawPage(resultAttemptsLeftTemplate);
      return false;
    }
  }
  const level = gameState.currentLevel < GAME.TOTAL_QUESTIONS ? gameState.levels[gameState.currentLevel] : false;
  if (level) {
    gameState.currentLevel++;
  }
  return level;
};
export const getMistakes = () => gameState.mistakes;
export const initializeGame = () => {
  gameState = resetGameState();
  gameState.levels = getRandomLevels();
  drawPage(welcomeTemplate);
};

const testUserAnswer = () => {
  return gameState.userAnswers[gameState.currentLevel - 1].every((value, index) => gameState.levels[gameState.currentLevel - 1].answers[index].right === value);
};

const testCurrentAnswer = (userAnswer) => {
  gameState.userAnswers.push(userAnswer);
  if (!testUserAnswer()) {
    gameState.mistakes++;
    return gameState.mistakes < GAME.MISTAKES_TO_LOOSE;
  }
  return true;
};

const contentLoadedHandler = () => {
  initializeGame();
};
document.addEventListener(`DOMContentLoaded`, contentLoadedHandler);
