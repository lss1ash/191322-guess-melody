export default class Statistic {

  constructor(onSuccess = () => {}, onError = () => {}) {
    const URL = `https://es.dump.academy/guess-melody/stats/191322`;

    this.params = {
      headers: {
        'Content-Type': `application/json`
      },
      mode: `cors`,
      cache: `no-store`
    };

    this.request = new Request(URL, this.params);
  }

  get(score) {
    this.params.method = `GET`;
    fetch(this.request)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            return [];
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })

  }

  post(score) {
    this.params.method = `POST`;
    fetch(this.request)

  }
}
