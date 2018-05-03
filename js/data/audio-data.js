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
    // fetch(this.URL)
    //     .then(this._loadLevels)
    //     .then((levels) => this._fillAudioSet(levels))
    //     .then((audioURLs) => [...audioURLs].map((url) => this._loadAudio(url)))
    //     .then((audioPromises) => Promise.all(audioPromises))
    //     .then((audios) => this._fillLevels(audios))
    //     .then((levelsPromises) => Promise.all(levelsPromises))
    //     .then((fullLevels) => this.onSuccess(fullLevels))
    //     .catch((error) => this.onError(error));

    // Mock audio loading - slow internet access
    let levels = JSON.parse(`[{"type":"artist","question":"Кто исполняет эту песню?","src":"https://freemusicarchive.org/music/listen/f6eac8260c92255a89ffe6eab864b9682f6f6c58","answers":[{"image":{"url":"https://freemusicarchive.org/file/images/artists/Broke_For_Free_-_2013011621055318.jpg?width=300&height=300","width":300,"height":300},"title":"Broke For Free","isCorrect":false},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Kevin_MacLeod_-_20110715150335323.png?width=300&height=300","width":300,"height":300},"title":"Kevin MacLeod","isCorrect":true},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Scott_Holmes_-_20161110203535496.jpg?width=300&height=300","width":300,"height":300},"title":"Scott Holmes","isCorrect":false}]},{"type":"artist","question":"Кто исполняет эту песню?","src":"https://freemusicarchive.org/music/listen/e41dced1f160802261d5203e079dd619ac490c02","answers":[{"image":{"url":"https://freemusicarchive.org/file/images/artists/Michael_Chapman__The_Woodpiles_-_2012081323009192.jpg?width=290&height=290","width":300,"height":300},"title":"Michael Chapman & The Woodpiles","isCorrect":false},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Tours_-_20120822132441990.png?width=300&height=300","width":300,"height":300},"title":"Tours","isCorrect":true},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Scott_Holmes_-_20161110203535496.jpg?width=300&height=300","width":300,"height":300},"title":"Scott Holmes","isCorrect":false}]},{"type":"artist","question":"Кто исполняет эту песню?","src":"https://freemusicarchive.org/music/listen/265ad41f6533e00d53de0264d36fdedf5c19c5df","answers":[{"image":{"url":"https://freemusicarchive.org/file/images/artists/Stephan_Siebert_-_20160712113333691.jpg?width=300&height=300","width":300,"height":300},"title":"Stephan Siebert","isCorrect":false},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Jason_Shaw_-_20131120155444083.jpg?width=300&height=300","width":300,"height":300},"title":"Jason Shaw","isCorrect":true},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Jahzzar_-_20160323124322227.jpg?width=300&height=300","width":300,"height":300},"title":"Jahzzar","isCorrect":false}]},{"type":"genre","question":"Выберите все джазовые песни","genre":"jazz","answers":[{"src":"https://freemusicarchive.org/music/listen/07e38fa4f67758edbd7a7bf6c8c4fa79903ac32c","genre":"folk"},{"src":"https://freemusicarchive.org/music/listen/b276f26371b7d64a3f143859b95898c24a8938cc","genre":"pop"},{"src":"https://freemusicarchive.org/music/listen/b06740c66f1bddfb5474b731dc3365558da17fc5","genre":"jazz"},{"src":"https://freemusicarchive.org/music/listen/e41dced1f160802261d5203e079dd619ac490c02","genre":"electronic"}]},{"type":"artist","question":"Кто исполняет эту песню?","src":"https://freemusicarchive.org/music/listen/e41dced1f160802261d5203e079dd619ac490c02","answers":[{"image":{"url":"https://freemusicarchive.org/file/images/artists/Comfort_Fit_-_20091216190305442.jpg?width=300&height=300","width":300,"height":300},"title":"Comfort Fit","isCorrect":false},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Tours_-_20120822132441990.png?width=300&height=300","width":300,"height":300},"title":"Tours","isCorrect":true},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Gillicuddy_-_20150103121851574.jpg?width=300&height=300","width":300,"height":300},"title":"Gillicuddy","isCorrect":false}]},{"type":"artist","question":"Кто исполняет эту песню?","src":"https://freemusicarchive.org/music/listen/ef221259aec0c3fc44a938c7fbf4d5a5d28fc9b2","answers":[{"image":{"url":"https://freemusicarchive.org/file/images/artists/Paper_Navy_-_20120226181728099.jpg?width=300&height=300","width":300,"height":300},"title":"Paper Navy","isCorrect":false},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Lobo_Loco_-_20160509152923470.jpg?width=300&height=300","width":300,"height":300},"title":"Loco Loco","isCorrect":true},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Tours_-_20120822132441990.png?width=300&height=300","width":300,"height":300},"title":"Tours","isCorrect":false}]},{"type":"genre","question":"Выберите все фолковые песни","genre":"folk","answers":[{"src":"https://freemusicarchive.org/music/listen/bf9d8ffd177eee1d6c7bb836288bf02ec1a711b2","genre":"folk"},{"src":"https://freemusicarchive.org/music/listen/91cf0844dd845ef3c7b06ed984a1ec3f1c248bb3","genre":"folk"},{"src":"https://freemusicarchive.org/music/listen/07e38fa4f67758edbd7a7bf6c8c4fa79903ac32c","genre":"folk"},{"src":"https://freemusicarchive.org/music/listen/cabcc1cbbbbe854b3e210dc4d5fbc479695d6319","genre":"rock"}]},{"type":"artist","question":"Кто исполняет эту песню?","src":"https://freemusicarchive.org/music/listen/b276f26371b7d64a3f143859b95898c24a8938cc","answers":[{"image":{"url":"https://freemusicarchive.org/file/images/artists/Waylon_Thornton_-_2012061793125465.jpg?width=300&height=300","width":300,"height":300},"title":"Waylon Thornton","isCorrect":false},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Scott_Holmes_-_20161110203535496.jpg?width=300&height=300","width":300,"height":300},"title":"Scott Holmes","isCorrect":true},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Michael_Chapman__The_Woodpiles_-_2012081323009192.jpg?width=290&height=290","width":300,"height":300},"title":"Michael Chapman & The Woodpiles","isCorrect":false}]},{"type":"genre","question":"Выберите все кантри песни","genre":"country","answers":[{"src":"https://freemusicarchive.org/music/listen/ab69ae702493fbee0503a4ac56ff2903c60cfcf8","genre":"rock"},{"src":"https://freemusicarchive.org/music/listen/91cf0844dd845ef3c7b06ed984a1ec3f1c248bb3","genre":"folk"},{"src":"https://freemusicarchive.org/music/listen/265ad41f6533e00d53de0264d36fdedf5c19c5df","genre":"country"},{"src":"https://freemusicarchive.org/music/listen/07e38fa4f67758edbd7a7bf6c8c4fa79903ac32c","genre":"folk"}]},{"type":"artist","question":"Кто исполняет эту песню?","src":"https://freemusicarchive.org/music/listen/e41dced1f160802261d5203e079dd619ac490c02","answers":[{"image":{"url":"https://freemusicarchive.org/file/images/artists/Scott_Holmes_-_20161110203535496.jpg?width=300&height=300","width":300,"height":300},"title":"Scott Holmes","isCorrect":false},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Tours_-_20120822132441990.png?width=300&height=300","width":300,"height":300},"title":"Tours","isCorrect":true},{"image":{"url":"https://freemusicarchive.org/file/images/artists/Stephan_Siebert_-_20160712113333691.jpg?width=300&height=300","width":300,"height":300},"title":"Stephan Siebert","isCorrect":false}]}]`);

    const mockAudio = () => {
      return {
        play() {
          console.log(`Audio play()`);
        },
        pause() {
          console.log(`Audio pause()`);
        },
        fastSeek() {
          console.log(`Audio rewind()`);
        }
      }
    };

    levels = levels.map((level) => {
      switch (level.type) {
        case LevelType.ARTIST: level.audio = mockAudio(); break;
        case LevelType.GENRE: level.answers.forEach((answer, index) => {
          level.answers[index].audio = mockAudio();
        }); break;
      }
      return level;
    });
    this.onSuccess(levels);
  }
}
