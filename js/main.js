import welcomeTemplate from './templates/welcome.js';
import drawPage from './drawPage.js';

const contentLoadedHandler = () => {
  drawPage(welcomeTemplate);
};

document.addEventListener(`DOMContentLoaded`, contentLoadedHandler);
