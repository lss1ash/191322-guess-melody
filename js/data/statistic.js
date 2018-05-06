export default class Statistic {

  constructor() {

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

  get(onSuccess = () => {}, onError = () => {}) {
    fetch(this.prepareRequest(`GET`))
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            // Соответствует Д13, так как возвращаем пустой массив ТОЛЬКО в том случае, если код вернулся 404.
            // Иначе бросаем ошибку -> else if нужен
            return [];
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })
        .then((data) => onSuccess(data))
        .catch((err) => onError(err));
  }

  post(score, onSuccess = () => {}, onError = () => {}) {
    fetch(this.prepareRequest(`POST`, score))
        .then((response) => {
          if (response.ok) {
            return onSuccess();
          }
          throw new Error(`Ошибка сохранения данных: ${response.status} ${response.statusText}`);
        })
        .catch((err) => onError(err));
  }
}
