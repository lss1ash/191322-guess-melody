import AbstractView from './abstract-view';

export default class LevelView extends AbstractView {
  constructor() {
    super();
  }

  set timer(time) {
    this._timer.minutesNode.innerText = time.normalizedMinutes;
    this._timer.secondsNode.innerText = time.normalizedSeconds;
  }

  get timerTemplate() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">${this.time.normalizedMinutes}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${this.time.normalizedSeconds}</span>
      </div>
      </svg>`;
  }
}
