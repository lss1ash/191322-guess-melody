import {drawPage} from './utils';
import getLevelArtist from './level-artist';
import getLevelGenre from './level-genre';
import {GAME} from './data/game';
import game from './main';
import WelcomeView from './views/welcome-view';

export default () => {
  const welcomeView = new WelcomeView();

  welcomeView.onPlayClick = () => {
    const level = game.nextLevel();
    if (level) {
      switch (level.type) {
        case GAME.GENRE: drawPage(getLevelGenre(level).element); break;
        case GAME.ARTIST: drawPage(getLevelArtist(level).element); break;
      }
    }
  };

  return welcomeView;
};
