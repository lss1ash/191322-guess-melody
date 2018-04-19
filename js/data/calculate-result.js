import {Options} from './game';

export default (answers, notesLeft) => {

  if (!Array.isArray(answers) || answers.length !== Options.TOTAL_QUESTIONS) {
    return -1;
  }

  if (!Number.isInteger(notesLeft)) {
    return -1;
  }

  const result = answers.reduce((accumulator, {right, fast}) => Number(accumulator) + Number(right) + Number(right && fast), 0);
  return result - (Options.MISTAKES_TO_LOOSE - notesLeft) * 2;
};
