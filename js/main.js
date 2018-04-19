import Application from './application';
// import {drawPage} from './utils';
// import {Options, INITIAL_STATE, getRandomLevels} from './data/game';
// import showResult from './data/show-result';
// import getWelcome from './welcome';
// import getResultAttemptsLeft from './result-attempts-left';
// import getResultSuccess from './result-success';
// import getLevelArtist from './level-artist';
// import getLevelGenre from './level-genre';
//

//
// const game = new Game();
// export default game;

const onContentLoaded = () => {
  // game.init();
  Application.showWelcome();
};
document.addEventListener(`DOMContentLoaded`, onContentLoaded);
