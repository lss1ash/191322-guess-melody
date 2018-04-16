import game from '../main';
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
    game.nextLevel(userAnswer);
  };

  return levelGenre;
};
