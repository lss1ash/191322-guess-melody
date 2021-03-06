const SECONDS_PER_MINUTE = 60;

export const getElementFromString = (str) => {
  const element = document.createElement(`section`);
  element.innerHTML = str;
  return element.firstElementChild ? element.firstElementChild : false;
};

// min <= random < max
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getMinSec = (time) => {
  const minutes = Math.floor(time / SECONDS_PER_MINUTE);
  const seconds = time - (minutes * SECONDS_PER_MINUTE);
  return {
    minutes,
    seconds
  };
};

export const getNormalizedTime = (secondsLeft) => {
  const {minutes, seconds} = getMinSec(secondsLeft);
  const normalizedMinutes = minutes.toString().length === 2 ? minutes.toString() : `0${minutes}`;
  const normalizedSeconds = seconds.toString().length === 2 ? seconds.toString() : `0${seconds}`;
  return {normalizedMinutes, normalizedSeconds};
};
