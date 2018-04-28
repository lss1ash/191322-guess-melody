const LevelType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export default class Data {
  constructor(URL) {
    this.URL = URL;
    this.audioURLs = new Set();
  }

  _loadLevels(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Не удалось загрузить информацию о музыке с сервера: ${response.statusText}`);
  }

  _loadAudio(url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.volume = 1;
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = () => reject(`Не удалось загрузить аудио: ${url}`);
      audio.src = url;
      audio.preload = `auto`;
    });
  }

  _parseLevel(level) {
    switch (level.type) {
      case LevelType.ARTIST: this.audioURLs.add(level.src); break;
      case LevelType.GENRE: level.answers.forEach((answer) => this.audioURLs.add(answer.src)); break;
    }
  }

  _fillAudioSet(levels) {
    return new Promise((resolve) => {
      this.levels = levels;
      levels.forEach((level) => this._parseLevel(level));
      resolve();
    });
  }

  get() {

    fetch(this.URL)
        .then(this._loadLevels)
        .then((levels) => {
          console.dir(levels);
          return this._fillAudioSet(levels);
        })
        .then(() => console.dir(this.audioURLs))
        .catch((error) => console.log(`Ошибка получения : ${error}`));


    // .then((levels) => levels.forEach((level) => this.parseLevel(level)))
    // .then(() => {
    //   const audioPromises = [];
    //   for (let URL of this.audioURLs.values()) {
    //     audioPromises.push(this.loadAudio(URL));
    //   }
    //   return audioPromises;
    // })
    // .then((audioPromises) => Promise.all(audioPromises))
    // .then(resolve)
    // .catch((error) => `Ошибка загрузки аудиофайлов: ${error}`);

  }
}
