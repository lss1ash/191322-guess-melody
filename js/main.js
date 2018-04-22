import Application from './application';

const onContentLoaded = () => {
  Application.showWelcome();
};
document.addEventListener(`DOMContentLoaded`, onContentLoaded);
