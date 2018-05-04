import AbstractView from './abstract-view';

export default class LevelView extends AbstractView {
  constructor() {
    super();
    this.SECONDS_TO_BLINK = `30`;
    this.PAUSE_CLASS = `player-control--pause`;
    this.BLINK_CLASS = `timer-value--red-blink`;
    this.PlayerState = {
      PAUSED: `paused`,
      PLAYING: `playing`
    };
    this.state = this.PlayerState.PAUSED;
  }

  set timer(time) {
    this._timer.minutesNode.innerText = time.normalizedMinutes;
    this._timer.secondsNode.innerText = time.normalizedSeconds;
    if (time.normalizedMinutes === `00` && time.normalizedSeconds <= +this.SECONDS_TO_BLINK) {
      if (!this._timer.timerNode.classList.contains(this.BLINK_CLASS)) {
        this._timer.timerNode.classList.add(this.BLINK_CLASS);
      }
    }
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
