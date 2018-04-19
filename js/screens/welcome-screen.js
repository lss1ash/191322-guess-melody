// import {drawPage} from '../utils';
// import getLevelArtist from './level-artist';
// import getLevelGenre from './level-genre';
// import {Options} from '../data/game';
// import game from '../main';
import WelcomeView from '../views/welcome-view';

export default class WelcomeScreen {

  _init() {
    this._welcome = new WelcomeView();
    this._welcome.onPlayClick = () => {
      // const level = game.nextLevel();
      // if (level) {
      //   switch (level.type) {
      //     case Options.GENRE: drawPage(getLevelGenre(level).element); break;
      //     case Options.ARTIST: drawPage(getLevelArtist(level).element); break;
      //   }
      // }
    };
  }

  get screen() {
    if (!this._welcome) {
      this._init();
    }
    return this._welcome.element;
  }

}
