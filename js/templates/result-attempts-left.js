import game from '../main';
import ResultAttemptsLeftView from './result-attempts-left-view';

export default (data) => {
  const resultAttemptsLeft = new ResultAttemptsLeftView(data);

  resultAttemptsLeft.onReplayClick = () => {
    game.init();
  };

  return resultAttemptsLeft;
};
