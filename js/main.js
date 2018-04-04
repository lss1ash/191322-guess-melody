import welcomeTemplate from './templates/welcome';
import drawPage from './draw-page';

const contentLoadedHandler = () => {
  drawPage(welcomeTemplate);
};

document.addEventListener(`DOMContentLoaded`, contentLoadedHandler);
