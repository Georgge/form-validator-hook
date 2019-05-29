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

  patternState.valid = true;
  patternState.errorMessage = '';

  if (pttrn === '' || pttrn === undefined) {
    const { notPattern } = patternErrors;
    throw new Error(`${notPattern.error} ${notPattern.message}`);
  }

  const maxError = maxSizeValidation(toWrite, maxSize, patternErrors, errors,
    (valid, errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (msg) {
        patternState.valid = valid;
        patternState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...patternState };


  // Current value is setting in state
  patternState.value = currentValue;
  patternState.toWrite = toWrite;

  patternMatchValidation(pttrn, currentValue, { ...patternErrors.notMatch }, patternState.errors,
    (valid, errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (msg) {
        patternState.valid = valid;
        patternState.errorMessage = msg;
      }
    });

  minSizeValidation(toWrite, maxSize, minSize, patternErrors, patternState.errors,
    (valid, errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (msg) {
        patternState.valid = valid;
        patternState.errorMessage = msg;
      }
    });

  return { ...patternState };
}

export default pattern;
