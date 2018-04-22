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

export const shuffleArray = (array) => {
  for (let index in array) {
    if (Object.prototype.hasOwnProperty.call(array, index)) {
      const randomIndex = getRandom(0, array.length);
      [array[randomIndex], array[index]] = [array[index], array[randomIndex]];
    }
  }
  return array;
};

export const getMinSec = (time) => {
  const minutes = Math.floor(time / SECONDS_PER_MINUTE);
  const seconds = time - (minutes * SECONDS_PER_MINUTE);
  return {
    minutes,
    seconds
  };
};
