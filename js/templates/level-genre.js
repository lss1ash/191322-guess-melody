import {nextGameLevel} from '../main.js';
import LevelGenreView from './level-genre-view';

export default (data) => {
  const levelGenre = new LevelGenreView(data);

  levelGenre.onLevelSubmit = () => {
    levelGenre.sendButton.disabled = true;
    const userAnswer = [...levelGenre.checkBoxes].map((checkbox) => {
      const retValue = checkbox.checked;
      checkbox.checked = false;
      return retValue;
    });
    nextGameLevel(userAnswer);
  };

  return levelGenre;
};
