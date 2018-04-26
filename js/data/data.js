export default class Data {
  constructor(URL) {
    this.URL = URL;
  }

  loadLevels() {
    return fetch(this.URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })
        .catch((err) => new Error(`Необработанное исколючение: ${err}`));
    // .then((data) => data)
  }

  loadAudio(url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.onload = () => resolve(audio);
      audio.onerror = () => reject(`Не удалось загрузить аудио: ${url}`);
      audio.src = url;
    });
  }
}
