import Errors from './errors.json';
import { setStandarError } from './error';

function text(currentValue, object) {
  const textState = object;
  const { text_errors } = Errors;
  const { rules } = textState;
  const {
    max_size = 100,
    min_size = 0,
  } = rules;
  const toWrite = max_size - currentValue.length;
  let errors = [];

  if (toWrite + 1 === 0) {
    const { max_size: max } = text_errors;
    const msg = `${max.message}${max_size}.`;
    errors = [...errors, max.error];
    const error = setStandarError(textState, errors, msg);
    return { ...error };
  }

  textState.value = currentValue;
  textState.toWrite = toWrite;

  if (toWrite > max_size - min_size) {
    const { min_size: min } = text_errors;
    const msg = `${min.message}${min_size}.`;
    errors = [...errors, min.error];
    const error = setStandarError(textState, errors, msg);
    return { ...error };
  }

  return {
    ...textState, errors: [], error_message: '',
  };
}

export default text;
