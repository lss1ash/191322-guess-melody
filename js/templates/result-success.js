import game from '../main';
import ResultSuccessView from './result-success-view';

export default (data) => {
  const resultSuccessView = new ResultSuccessView(data);

  resultSuccessView.onReplayClick = () => {
    game.init();
  };

  return resultSuccessView;
};
