const LevelType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export default class Data {
  constructor(URL) {
    this.URL = URL;
    this.audioURLs = new Set();
    this.audio = [];
  }

  loadLevels() {
    return fetch(this.URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Не удалось загрузить информацию о музыке с сервера: ${response.statusText}`);
        });
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
    switch (level) {
      case LevelType.ARTIST: this.audioURLs.add(level.src); break;
      case LevelType.GENRE: level.answers.forEach((answer) => this.audioURLs.add(answer.src)); break;
    }
  }

  get() {
    this.loadLevels()
        .then((levels) => {
          levels.forEach((level) => this.parseLevel(level));
        }, (error) => `Ошибка при чтении полученных данных: ${error}`)
        .then(() => {
          const audioPromises = [];
          for (let URL of this.audioURLs.values()) {
            audioPromises.push(this.loadAudio(URL));
          }
          return audioPromises;
        })
        .then((audioPromises) => Promise.all(audioPromises))
        .then((audio) => audio)
        .catch((error) => `Ошибка загрузки аудиофайлов: ${error}`);
  }
}
