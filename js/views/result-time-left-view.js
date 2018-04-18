import AbstractView from './abstract-view';

export default class ResultTimeLeftView extends AbstractView {

  get template() {
    return `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  }

  onReplayClick() {
    throw new Error(`You need to create handler first!`);
  }

  bind() {
    this.element.querySelector(`.main-replay`).onclick = (evt) => {
      evt.preventDefault();
      this.onReplayClick();
    };
  }
}
