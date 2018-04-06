const Options = {
  QUESTIONS_NUMBER: 10, // требуемое количество ответов
  ANSWER_SPEED: 30, // скорость быстрого ответа на вопрос, секунд
  MAX_TRIES: 3 // максимальное количество ошибок
};

export default (answers, notesLeft) => {

  if (!Array.isArray(answers) || answers.length !== Options.QUESTIONS_NUMBER) {
    return -1;
  }

  if (!Number.isInteger(notesLeft)) {
    return -1;
  }

  const result = answers.reduce((accumulator, {right, fast}) => Number(accumulator) + Number(right) + Number(right && fast), 0);
  return result - (Options.MAX_TRIES - notesLeft) * 2;
};
