import welcomeTemplate from './templates/welcome';
import {drawPage} from './utils';

const contentLoadedHandler = () => {
  drawPage(welcomeTemplate);
};

document.addEventListener(`DOMContentLoaded`, contentLoadedHandler);
