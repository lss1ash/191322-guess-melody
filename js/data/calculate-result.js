export default (answers, mistakes, totalQuestions = 10) => {

  if (!Array.isArray(answers) || answers.length !== totalQuestions) {
    return -1;
  }

  if (!Number.isInteger(mistakes)) {
    return -1;
  }

  let resultScore = answers.reduce((accumulator, {right, fast}) => Number(accumulator) + Number(right) + Number(right && fast), 0);
  resultScore = resultScore - mistakes * 2;
  const resultFast = answers.reduce((accumulator, {right, fast}) => Number(accumulator) + Number(right && fast), 0);
  return {score: resultScore, fast: resultFast};
};
