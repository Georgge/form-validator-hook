import Errors from './errors.json';
import {
  maxSizeValidation, minSizeValidation, patternMatchValidation,
} from './generic_validations';

function pattern(currentValue, state, name) {
  const patternState = state[name];
  const { patternErrors } = Errors;
  const { pattern: pttrn, rules, errors = [] } = patternState;
  const {
    maxSize = 100,
    minSize = 0,
  } = rules;

  const toWrite = maxSize - `${currentValue}`.length;

  if (pttrn === '' || pttrn === undefined) {
    const { notPattern } = patternErrors;
    throw new Error(`${notPattern.error} ${notPattern.message}`);
  }

  const maxError = maxSizeValidation(toWrite, maxSize, patternErrors, errors,
    (errorsArray, msg) => {
      patternState.errors = errorsArray;
      patternState.errorMessage = msg;
      if (msg.length > 0) return true;
      return false;
    });
  if (maxError) return { ...patternState };


  // Current value is setting in state
  patternState.value = currentValue;
  patternState.toWrite = toWrite;

  patternMatchValidation(pttrn, currentValue, patternErrors, patternState.errors,
    (errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (errorsArray.length > 0 && msg !== '') patternState.errorMessage = msg;
    });

  minSizeValidation(toWrite, maxSize, minSize, patternErrors, patternState.errors,
    (errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (errorsArray.length > 0 && msg !== '') patternState.errorMessage = msg;
    });

  return { ...patternState };
}

export default pattern;
