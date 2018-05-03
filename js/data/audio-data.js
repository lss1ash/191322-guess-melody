const LevelType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export default class AudioData {
  constructor(onSuccess = () => {}, onError = () => {}) {
    this.URL = `https://es.dump.academy/guess-melody/questions`;
    this.onSuccess = onSuccess;
    this.onError = onError;
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
      audio.preload = `auto`;
      audio.src = url;
    });
  }

  _parseLevel(level) {
    switch (level.type) {
      case LevelType.ARTIST: return [level.src];
      case LevelType.GENRE: return level.answers.map((answer) => answer.src);
    }
    return false;
  }

  _fillAudioSet(levels) {
    return new Promise((resolve) => {
      const audioURLs = new Set();
      this.levels = levels;
      levels.forEach((level) => {
        const URLs = this._parseLevel(level);
        if (URLs) {
          URLs.forEach((audioURL) => audioURLs.add(audioURL));
        }
      });
      resolve(audioURLs);
    });
  }

  _fillLevels(audios) {
    this.audios = audios;
    return this.levels.map((level) => this._fillLevelWithAudio(level));
  }

  _fillLevelWithAudio(level) {
    return new Promise((resolve) => {
      switch (level.type) {
        case LevelType.ARTIST: level.audio = this._findAudio(level.src); break;
        case LevelType.GENRE: level.answers.forEach((answer, index) => {
          level.answers[index].audio = this._findAudio(answer.src);
        }); break;
      }
      resolve(level);
    });
  }

  _findAudio(src) {
    for (let i = 0; i < this.audios.length; i++) {
      if (this.audios[i].src === src) {
        return this.audios[i];
      }
    }
    return false;
  }

  get() {
    fetch(this.URL)
        .then(this._loadLevels)
        .then((levels) => this._fillAudioSet(levels))
        .then((audioURLs) => [...audioURLs].map((url) => this._loadAudio(url)))
        .then((audioPromises) => Promise.all(audioPromises))
        .then((audios) => this._fillLevels(audios))
        .then((levelsPromises) => Promise.all(levelsPromises))
        .then((fullLevels) => this.onSuccess(fullLevels))
        .catch((error) => this.onError(error));
  }
}
