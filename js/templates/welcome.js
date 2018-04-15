import {drawPage} from '../utils';
import levelArtistTemplate from './level-artist';
import levelGenreTemplate from './level-genre';
import {nextGameLevel} from '../main.js';
import {GAME} from '../data/game';

import AbstractView from '../abstract-view';

export default class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
        Ошибиться можно 3 раза.<br>
        Удачи!
      </p>
    </section>`;
  }

  onPlayClick() {
    const level = nextGameLevel();
    if (level) {
      switch (level.type) {
        case GAME.GENRE: drawPage(levelGenreTemplate(level)); break;
        case GAME.ARTIST: drawPage(levelArtistTemplate(level)); break;
      }
    }
  }

  bind() {
    this.element.querySelector(`.main-play`).onclick = (evt) => {
      evt.preventDefault();
      this.onPlayClick();
    };
  }
}
