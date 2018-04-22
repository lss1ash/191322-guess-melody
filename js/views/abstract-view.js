import {getElementFromString} from '../utils';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  set timer(time) {
    this._timer.minutesNode.innerText = time.normalizedMinutes;
    this._timer.secondsNode.innerText = time.normalizedSeconds;
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return getElementFromString(this.template);
  }

  bind() {
    // bind handlers if required
  }
}
