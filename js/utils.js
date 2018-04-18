const mainSection = document.querySelector(`.app .main`);

export const drawPage = (pageElement) => {
  if (mainSection) {
    if (mainSection.firstElementChild) {
      mainSection.replaceChild(pageElement, mainSection.firstElementChild);
    } else {
      mainSection.appendChild(pageElement);
    }
  }
};

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
