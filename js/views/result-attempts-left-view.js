import AbstractView from './abstract-view';

export default class ResultAttemptsLeftView extends AbstractView {

  get template() {
    return `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
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
