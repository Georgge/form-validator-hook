import Errors from './errors.json';
import { removeStandarError } from './error';
import {
  maxSizeValidation, minSizeValidation, patternMatchValidation,
} from './generic_validations';

function pattern(currentValue, state, name, stateChange) {
  const patternState = state[name];
  const { pattern_errors } = Errors;
  const { pattern: pttrn, rules, errors = [] } = patternState;
  const {
    max_size = 100,
    min_size = 0,
  } = rules;

  const toWrite = max_size - `${currentValue}`.length;

  if (pttrn === '' || pttrn === undefined) {
    const { not_pattern } = pattern_errors;
    throw new Error(`${not_pattern.error} ${not_pattern.message}`);
  }

  if (rules.clear_max_size_error && !stateChange) {
    throw new Error('setState function is requiered');
  }

  const maxError = maxSizeValidation(toWrite, max_size, pattern_errors, errors,
    (errorsArray, msg) => {
      const { max_size: max } = pattern_errors;
      const errorMsg = patternState.error_message;
      patternState.errors = errorsArray;
      patternState.error_message = msg;
      if (msg.length > 0) {
        setTimeout(() => {
          const errs = removeStandarError(errors, max.error);
          stateChange({
            [name]: {
              ...state[name],
              errors: errs,
              error_message: errorMsg,
            },
          });
        }, 1200);
        return true;
      }
      return false;
    });
  if (maxError) return { ...patternState };


  // Current value is setting in state
  patternState.value = currentValue;
  patternState.to_write = toWrite;

  patternMatchValidation(pttrn, currentValue, pattern_errors, patternState.errors,
    (errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (errorsArray.length > 0 && msg !== '') patternState.error_message = msg;
    });

  minSizeValidation(toWrite, max_size, min_size, pattern_errors, patternState.errors,
    (errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (errorsArray.length > 0 && msg !== '') patternState.error_message = msg;
    });

  return { ...patternState };
}

export default pattern;
