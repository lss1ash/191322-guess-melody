export default class Statistic {

  constructor(onSuccess = () => {}, onError = () => {}) {

    this.onSuccess = onSuccess;
    this.onError = onError;
    this.URL = `https://es.dump.academy/guess-melody/stats/191322`;
    this.params = {
      headers: {
        'Content-Type': `application/json`
      },
      mode: `cors`,
      cache: `no-store`
    };
  }

  prepareRequest(type, score) {
    const params = this.params;
    params.method = type;
    if (type === `POST`) {
      params.body = JSON.stringify({
        score
      });
    }
    return new Request(this.URL, params);
  }

  get() {
    fetch(this.prepareRequest(`GET`))
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            return [];
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })
        .then((data) => this.onSuccess(data))
        .catch((err) => this.onError(err));
  }

  post(score) {
    fetch(this.prepareRequest(`POST`, score))
        .then((response) => {
          if (response.ok) {
            this.onSuccess();
          }
          throw new Error(`Ошибка сохранения данных: ${response.status} ${response.statusText}`);
        })
        .catch((err) => this.onError(err));
  }
}
