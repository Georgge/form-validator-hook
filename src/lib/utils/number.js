import Errors from './errors.json';
import { setStandarError } from './error';
import {
  maxSizeValidation, minSizeValidation,
  isNotNumberValidation,
} from './generic_validations';

function number(currentValue, state, name) {
  const { number_errors } = Errors;
  const numberState = state[name];
  const { rules, errors = [] } = numberState;
  const {
    format = 'int',
    max_size = 7,
    min_size = 5,
    enforce_zero = false,
  } = rules;

  const toWrite = max_size - `${currentValue}`.length;
  let writeDot = false;


  const isNotNumber = isNotNumberValidation(currentValue, number_errors, errors,
    (errorsArray, msg) => {
      numberState.errors = errorsArray;
      numberState.error_message = msg;
      if (msg.length > 0) return true;
      return false;
    });
  if (isNotNumber) return { ...numberState };

  const maxError = maxSizeValidation(toWrite, max_size, number_errors, errors,
    (errorsArray, msg) => {
      numberState.errors = errorsArray;
      numberState.error_message = msg;
      if (msg.length > 0) return true;
      return false;
    });
  if (maxError) return { ...numberState };

  if (format === 'float' || format === 'int') {
    const { not_integer } = number_errors;

    if (currentValue.includes('.') && format === 'int') {
      const errs = setStandarError(errors, not_integer.error);
      numberState.errors = errs;
      numberState.error_message = not_integer.msg;
      return { ...numberState };
    }

    if (currentValue[currentValue.length - 1] === '.') writeDot = !writeDot;
  } else {
    const { invalid_format } = number_errors;
    throw new Error(`${invalid_format.error} -> ${invalid_format.message}`);
  }

  let virtualValue = currentValue;
  if (!writeDot && currentValue !== '') virtualValue = Number(currentValue);
  if (currentValue === '' && enforce_zero) virtualValue = Number(currentValue);
  if (currentValue === '' && !enforce_zero) virtualValue = '';

  numberState.value = virtualValue;
  numberState.to_write = toWrite;

  minSizeValidation(toWrite, max_size, min_size, number_errors, numberState.errors,
    (arrayErrors, msg) => {
      numberState.errors = arrayErrors;
      numberState.error_message = msg;
    });

  return { ...numberState };
}

export default number;
