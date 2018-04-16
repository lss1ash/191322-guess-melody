import game from '../main';
import ResultTimeLeftView from './result-time-left-view';

export default (data) => {
  const resultTimeLeft = new ResultTimeLeftView(data);

  resultTimeLeft.onReplayClick = () => {
    game.init();
  };

  return resultTimeLeft;
};
