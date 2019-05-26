import Errors from './errors.json';
import { maxSizeValidation, minSizeValidation } from './generic_validations';

function text(currentValue, state, name) {
  const textState = state[name];
  const { text_errors } = Errors;
  const { rules, errors = [] } = textState;
  const {
    max_size = 100,
    min_size = 0,
  } = rules;

  const toWrite = max_size - `${currentValue}`.length;

  const maxError = maxSizeValidation(toWrite, max_size, text_errors, errors,
    (errorsArray, msg) => {
      textState.errors = errorsArray;
      textState.error_message = msg;
      if (msg.length > 0) return true;
      return false;
    });
  if (maxError) return { ...textState };

  textState.value = currentValue;
  textState.to_write = toWrite;

  minSizeValidation(toWrite, max_size, min_size, text_errors, textState.errors,
    (errorsArray, msg) => {
      textState.errors = errorsArray;
      if (errorsArray.length > 0 && msg !== '') textState.error_message = msg;
    });

  return { ...textState };
}

export default text;
