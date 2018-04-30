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
import DialogView from '../views/dialog-view';

export default class Game {
  constructor() {
    this.model = new GameModel();
    this.dialog = new DialogView(Application.dialog);
    this.model.onStatisticGetSuccess = () => this.getAudio();
    this.model.onStatisticGetError = (error) => this.showError(`Ошибка получения статистических данных`, error);
    this.model.onStatisticPostError = (error) => this.showError(`Ошибка сохранения статистических данных`, error);
    this.model.init();
  }

  start() {
    this.timerInit();
    this.showScreen();
  }

  end() {
    this.level.onEnd();
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
      this.level.onScreenShow();
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
    console.log(`spinner has been shown`);
    // welcome.showSpinner();

    const onAudioLoaded = (levels) => {
      this.model.state.levels = levels;
      // welcome.hideSpinner();
      welcome.setHandler();
      console.log(`spinner has been hidden`);
    };

    // const onAudioLoadingError = () => {
    const onAudioLoadingError = (error) => {
      this.dialog.show(`Ошибка при загрузке аудио`, `${error}`);
    };
    const audio = new AudioData(onAudioLoaded, onAudioLoadingError);
    audio.get();
  }

  showError(header, error) {
    this.dialog.show(`${header}`, `${error}`);
  }
}
