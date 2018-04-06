const showResult = (previousScores, result = {}) => {

  if (typeof result !== `object` || !(result instanceof Object)) {
    return -1;
  }

  const {currentScore, notesLeft, timeLeft} = result;

  if (!Number.isInteger(currentScore) || !Number.isInteger(notesLeft) || !Number.isInteger(timeLeft)) {
    return -1;
  }

  if (currentScore < 0 || notesLeft < 0 || timeLeft < 0) {
    return -1;
  }

  if (notesLeft === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  if (timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  previousScores.push(currentScore);
  const allScores = previousScores.length;
  previousScores.sort((a, b) => a - b);

  const filteredScores = [];
  previousScores.forEach((value) => {
    if (!filteredScores.includes(value)) {
      filteredScores.push(value);
    }
  });

  const currentPlace = filteredScores.length - filteredScores.indexOf(currentScore);
  const currentPercent = Math.round(previousScores.indexOf(currentScore) / allScores * 100);
  return `Вы заняли ${currentPlace} место из ${allScores} игроков. Это лучше, чем у ${currentPercent}% игроков`;
};

export default showResult;
