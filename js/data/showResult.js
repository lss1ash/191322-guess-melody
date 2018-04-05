const showResult = (previousScores, result) => {
  //

  if (typeof result !== `object` || result === null) {
    return -1;
  }

  //   {currentScore, notesLeft, timeLeft} = result;
  //
  //   if (!Number.isInteger(notesLeft)) {
  //     return -1;
  //   }
  //
  //   // const result = answers.reduce((accumulator, {right, fast}) => Number(accumulator) + Number(right) + Number(right && fast), 0);
  //   // return result - (Options.MAX_TRIES - notesLeft) * 2;
  return 1;
};

export default showResult;
