export default class Timer {
  constructor(seconds, callBackTick, callBackStop) {
    this.seconds = seconds;
    this.callBackTick = callBackTick;
    this.callBackStop = callBackStop;
  }
  start() {
    if (!Number.isInteger(this.seconds) || this.seconds <= 0) {
      return false;
    }
    this._timerID = setInterval(this.tick.bind(this), 1000);
    return true;
  }
  tick() {
    if (this.seconds >= 0) {
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
