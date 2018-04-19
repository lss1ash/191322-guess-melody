import {getRandom, shuffleArray} from '../utils';

export const Options = {
  ARTIST_SONGS_PER_LEVEL: 3,
  GENRE_SONGS_PER_LEVEL: 4,
  TOTAL_QUESTIONS: 10,
  ANSWER_SPEED: 30,
  GENRE: `levelGenre`,
  ARTIST: `levelArtist`,
  MISTAKES_TO_LOOSE: 3
};

export const INITIAL_STATE = {
  currentLevel: 0,
  levels: [],
  mistakes: 0,
  time: 0,
  userAnswers: []
};

// Music from https://www.youtube.com/audiolibrary/music?feature=blog
const melodies = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

const createRandomArtistLevel = () => {
  const tempMelodies = shuffleArray(melodies.slice());
  const rightMelody = tempMelodies.pop();
  const levelArtist = {
    type: Options.ARTIST,
    question: `Кто исполняет эту песню?`,
    melodie: rightMelody,
    answers: []
  };
  for (let i = 0; i < Options.ARTIST_SONGS_PER_LEVEL; i++) {
    const melodie = i === 0 ? rightMelody : tempMelodies.pop();
    levelArtist.answers.push({
      melodie,
      right: melodie.artist === rightMelody.artist
    });
  }
  levelArtist.answers = shuffleArray(levelArtist.answers);
  return levelArtist;
};

const createRandomGenreLevel = () => {
  const tempMelodies = shuffleArray(melodies.slice());
  const rightMelody = tempMelodies.pop();
  const levelGenre = {
    type: Options.GENRE,
    question: `Выберите ${rightMelody.genre} треки`,
    answers: []
  };
  for (let i = 0; i < Options.GENRE_SONGS_PER_LEVEL; i++) {
    const melodie = i === 0 ? rightMelody : tempMelodies.pop();
    levelGenre.answers.push({
      melodie,
      right: melodie.genre === rightMelody.genre
    });
  }
  levelGenre.answers = shuffleArray(levelGenre.answers);
  return levelGenre;
};

const createLevel = [createRandomArtistLevel, createRandomGenreLevel];

export const getRandomLevels = () => {
  const randomLevels = [];
  for (let i = 0; i < Options.TOTAL_QUESTIONS; i++) {
    randomLevels.push(createLevel[getRandom(0, 2)]());
  }
  return randomLevels;
};
