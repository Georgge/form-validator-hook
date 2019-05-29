import Errors from './errors.json';
import { maxSizeValidation, minSizeValidation } from './generic_validations';

function text(currentValue, state, name) {
  const textState = state[name];
  const { textErrors } = Errors;
  const { rules, errors = [] } = textState;
  const {
    maxSize = 100,
    minSize = 0,
  } = rules;

  const toWrite = maxSize - `${currentValue}`.length;

  textState.errorMessage = '';

  const maxError = maxSizeValidation(toWrite, maxSize, textErrors, errors,
    (valid, errorsArray, msg) => {
      textState.valid = valid;
      textState.errors = errorsArray;
      if (msg) {
        textState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...textState };

  textState.value = currentValue;
  textState.toWrite = toWrite;

  minSizeValidation(toWrite, maxSize, minSize, textErrors, textState.errors,
    (valid, errorsArray, msg) => {
      textState.valid = valid;
      textState.errors = errorsArray;
      if (msg) textState.errorMessage = msg;
    });

  return { ...textState };
}

export default text;
