export default (seconds, callBack) => {

  if (!Number.isInteger(seconds) || seconds < 0) {
    return -1;
  }

  return {
    seconds,
    init() {
      this._timerID = setInterval(this.tick, 1000);
    },
    tick() {
      if (this.seconds > 0) {
        callBack();
        return --this.seconds;
      }
      this.stop();
      return false;
    },
    stop() {
      this._timerID = clearInterval(this._timerID);
    }
  };
};
