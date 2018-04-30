import GameModel from './game-model';
import Timer from './timer';
import AudioData from './audio-data';
import Application from '../app';
import {getNormalizedTime} from '../utils';
import WelcomeScreen from '../screens/welcome-screen';
import LevelArtistScreen from '../screens/level-artist-screen';
import LevelGenreScreen from '../screens/level-genre-screen';
import ResultSuccessScreen from '../screens/result-success-screen';
import ResultAttemptsLeftScreen from '../screens/result-attempts-left-screen';
import ResultTimeLeftScreen from '../screens/result-time-left-screen';

export default class Game {
  constructor() {
    this.model = new GameModel();
    this.model.init();
    this.getAudio();
  }

  start() {
    this.timerInit();
    this.showScreen();
  }

  end() {
    const result = this.model.result;
    let resultScreen = false;
    if (this.model.state.currentLevel === this.model.Options.TOTAL_QUESTIONS) {
      const leftSeconds = this.model.Options.TOTAL_TIME - result.time;
      const normalizedLeftTime = getNormalizedTime(leftSeconds);
      result.minutes = normalizedLeftTime.normalizedMinutes;
      result.seconds = normalizedLeftTime.normalizedSeconds;
      resultScreen = new ResultSuccessScreen(result);
    } else if (result.mistakes === this.model.Options.MISTAKES_TO_LOOSE) {
      resultScreen = new ResultAttemptsLeftScreen();
    } else if (result.time === 0) {
      resultScreen = new ResultTimeLeftScreen();
    }
    if (resultScreen) {
      resultScreen.replay = () => Application.showWelcome();
      Application.drawScreen(resultScreen.screen);
    }
  }

  nextLevel(currentAnswer) {
    this.showScreen(currentAnswer);
  }

  showScreen(currentAnswer) {
    const level = this.model.getNextLevel(currentAnswer);
    const time = getNormalizedTime(this._timer.seconds);
    if (level) {
      switch (level.type) {
        case this.model.LevelType.ARTIST:
          this.level = new LevelArtistScreen(level, time);
          break;
        case this.model.LevelType.GENRE:
          this.level = new LevelGenreScreen(level, time);
          break;
      }
      this.level.mistakes = this.model.state.mistakes;
      this.level.nextLevel = (userAnswer) => this.nextLevel(userAnswer);
      Application.drawScreen(this.level.screen);
    } else {
      this._timer.stop();
    }
  }

  timerInit() {
    this._timer = new Timer(this.model.Options.TOTAL_TIME, () => {
      this.model.state = {time: this._timer.seconds};
      this.level.drawTime(getNormalizedTime(this._timer.seconds));
    },
    () => this.end());
    this._timer.start();
  }

  getAudio() {
    const welcome = new WelcomeScreen();
    Application.drawScreen(welcome.screen);

    const onAudioLoaded = (levels, audios) => {
      this.model.state.levels = levels;
      this.model.audios = audios;
      welcome.setHandler();
    };

    const onAudioLoadingError = () => {
    };
    const audio = new AudioData(onAudioLoaded, onAudioLoadingError);
    audio.get();
  }


}
