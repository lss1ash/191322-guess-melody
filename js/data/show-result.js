const showResult = (previousScores, result = {}) => {

  if (typeof result !== `object` || !(result instanceof Object)) {
    return -1;
  }

  const {currentScore, notesLeft, timeLeft} = result;

  if (!Number.isInteger(currentScore) || !Number.isInteger(notesLeft) || !Number.isInteger(timeLeft)) {
    return -1;
  }

  if (notesLeft === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  if (timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  // const result = answers.reduce((accumulator, {right, fast}) => Number(accumulator) + Number(right) + Number(right && fast), 0);
  // return result - (Options.MAX_TRIES - notesLeft) * 2;
  return {currentScore, notesLeft, timeLeft};
};

export default showResult;
