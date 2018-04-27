import Application from './app';

const onContentLoaded = () => {
  Application.showWelcome();
};
document.addEventListener(`DOMContentLoaded`, onContentLoaded);
