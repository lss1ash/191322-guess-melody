export default class Timer {
  constructor(seconds, callBackTick, callBackStop) {
    if (!Number.isInteger(seconds) || seconds < 0) {
      return -1;
    }
    this.seconds = seconds;
    this.callBackTick = callBackTick;
    this.callBackStop = callBackStop;
  }
  start() {
    this._timerID = setInterval(this.tick.bind(this), 1000);
  }
  tick() {
    if (this.seconds > 0) {
      if (this.callBackTick) {
        this.callBackTick();
      }
      return --this.seconds;
    }
    this.stop();
    return false;
  }
  stop() {
    this._timerID = clearInterval(this._timerID);
    if (this.callBackStop) {
      this.callBackStop();
    }
  }
}
