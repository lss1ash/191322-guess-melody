import GameModel from './game-model';
import Application from '../application';

export default class Game {
  constructor() {
    this.model = new GameModel();
    this.model.init();
  }

  start() {
    this.showScreen();
  }

  end() {

  }

  nextLevel(currentAnswer) {
    this.showScreen(currentAnswer);
  }

  showScreen(currentAnswer) {
    const level = this.model.getNextLevel(currentAnswer);
    // const levelArtist = new LevelArtistScreen(level);
    // const levelGenre = new LevelGenreScreen(level);
    // levelArtist.nextLevel = levelGenre.nextLevel = this.nextLevel;
    switch (level.type) {
      case this.model.Options.ARTIST: Application.showArtist(level); break;
      case this.model.Options.GENRE: Application.showGenre(level); break;
    }
  }

}
