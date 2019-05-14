import Errors from './errors.json';
import { setStandarError } from './error';

function number(currentValue, stateObject) {
  const { number_errors } = Errors;
  const numberState = stateObject;
  const { rules } = numberState;
  const {
    format = 'int',
    max_size = 7,
    min_size = 1,
    enforce_zero = false,
  } = rules;
  const isNumber = !Number.isNaN(Number(currentValue));
  const toWrite = max_size - `${currentValue}`.length;
  let writeDot = false;
  let errors = [];


  if (!isNumber) {
    const { not_number } = number_errors;
    errors = [...errors, not_number.error];
    const error = setStandarError(numberState, errors, not_number.message);
    return { ...error };
  }

  if (toWrite + 1 === 0) {
    const { max_size: max } = number_errors;
    const msg = `${max.message}${max_size}.`;
    errors = [...errors, max.error];
    const error = setStandarError(numberState, errors, msg);
    return { ...error };
  }

  if (format === 'float' || format === 'int') {
    const { not_integer } = number_errors;

    if (currentValue.includes('.') && format === 'int') {
      errors = [...errors, not_integer.error];
      const error = setStandarError(numberState, errors, not_integer.message);
      return { ...error };
    }

    if (currentValue[currentValue.length - 1] === '.') writeDot = !writeDot;
  } else {
    const { invalid_format } = number_errors;
    console.error(invalid_format.message);
    throw new Error(invalid_format.error);
  }


  let virtualValue = currentValue;
  if (!writeDot && currentValue !== '') virtualValue = Number(currentValue);
  if (currentValue === '' && enforce_zero) virtualValue = Number(currentValue);
  if (currentValue === '' && !enforce_zero) virtualValue = '';

  numberState.value = virtualValue;

  if (toWrite > max_size - min_size) {
    const { min_size: min } = number_errors;
    const msg = `${min.message}${min_size}.`;
    errors = [...errors, min.error];
    const error = setStandarError(numberState, errors, msg);
    return { ...error };
  }

  return {
    ...numberState, errors: [], error_message: '', toWrite,
  };
}

export default number;
