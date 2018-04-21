import GameModel from './game-model';
import Application from '../application';
import LevelArtistScreen from '../screens/level-artist-screen';
import LevelGenreScreen from '../screens/level-genre-screen';

export default class Game {
  constructor() {
    this.model = new GameModel();
    this.levelArtistScreen = new LevelArtistScreen();
    this.levelGenreScreen = new LevelGenreScreen();
    this.model.init();
  }

  start() {

  }

  end() {

  }

  showScreen() {
    const level = this.model.getNextLevel();
    switch (level.type) {
      case this.model.Options.ARTIST: Application.drawScreen(this.levelArtistScreen); break;
      case this.model.Options.GENRE: Application.drawScreen(this.levelGenreScreen); break;
    }
  }

}
