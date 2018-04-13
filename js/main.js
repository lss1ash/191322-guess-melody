import welcomeTemplate from './templates/welcome';
import {drawPage} from './utils';
import {GAME, INITIAL_STATE, getRandomLevels} from './data/game';

let gameState = resetGameState();
gameState.levels = getRandomLevels();
export const resetGameState = () => Object.assign({}, INITIAL_STATE);
export const nextGameLevel = () => gameState.currentLevel < GAME.TOTAL_QUESTIONS ? gameState.levels.pop() : false;
export const getMistakes = () => gameState.mistakes;

const contentLoadedHandler = () => {
  drawPage(welcomeTemplate);
};
document.addEventListener(`DOMContentLoaded`, contentLoadedHandler);
