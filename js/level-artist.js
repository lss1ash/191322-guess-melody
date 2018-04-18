import game from './main';
import LevelArtistView from './views/level-artist-view';

export default (data) => {
  const levelArtist = new LevelArtistView(data);

  levelArtist.onFormClick = ({target}) => {
    if (target.tagName.toUpperCase() === `INPUT` && target.type.toUpperCase() === `RADIO`) {
      const userAnswer = [...levelArtist.element.querySelectorAll(`input[type=radio]`)].map((radio) => radio.checked);
      game.nextLevel(userAnswer);
    }
  };

  return levelArtist;
};
