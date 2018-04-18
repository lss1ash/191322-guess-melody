import AbstractView from './abstract-view';

export default class ResultSuccessView extends AbstractView {
  constructor(result) {
    super();
    this.result = result;
  }

  get template() {
    return `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы - настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${this.result.minutes}&nbsp;минуты и ${this.result.seconds}&nbsp;секунд
        <br>Вы&nbsp;набрали ${this.result.score} баллов (${this.result.scoreFast} быстрых),
        <br>совершив ${this.result.mistakes} ошибки</div>
        <span class="main-comparison">${this.result.comparison}</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
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
