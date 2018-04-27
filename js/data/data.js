const LevelType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export default class Data {
  constructor(URL) {
    this.URL = URL;
    this.audioURLs = new Set();
  }

  loadLevels(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Не удалось загрузить информацию о музыке с сервера: ${response.statusText}`);
  }

  loadAudio(url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.volume = 1;
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = () => reject(`Не удалось загрузить аудио: ${url}`);
      audio.src = url;
      audio.preload = `auto`;
    });
  }

  parseLevel(level) {
    switch (level.type) {
      case LevelType.ARTIST: this.audioURLs.add(level.src); break;
      case LevelType.GENRE: level.answers.forEach((answer) => this.audioURLs.add(answer.src)); break;
    }
  }

  fillAudioSet(levels) {
    return new Promise((resolve) => {
      this.levels = levels;
      levels.forEach((level) => this.parseLevel(level));
      resolve();
    });
  }

  // , (error) => `Ошибка при чтении полученных данных: ${error}`)
  // get(resolve) {
  get() {

    // const getLevels(levels) => {
    //   return new Promise
    // };

    fetch(this.URL)
        .then((response) => {
          if (response.ok) {
            const JSON = response.json();
            console.dir(JSON);
            return JSON;
          }
          throw new Error(`Не удалось загрузить информацию о музыке с сервера: ${response.statusText}`);
        })
        .then((levels) => {
          return this.fillAudioSet(levels);
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
