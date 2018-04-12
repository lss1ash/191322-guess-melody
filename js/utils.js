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
export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};
