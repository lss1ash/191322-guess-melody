export default (answers, notesLeft, totalQuestions = 10, mistakesToLoose = 3) => {

  if (!Array.isArray(answers) || answers.length !== totalQuestions) {
    return -1;
  }

  if (!Number.isInteger(notesLeft)) {
    return -1;
  }

  const result = answers.reduce((accumulator, {right, fast}) => Number(accumulator) + Number(right) + Number(right && fast), 0);
  return result - (mistakesToLoose - notesLeft) * 2;
};
