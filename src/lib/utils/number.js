import Errors from './errors.json';
import { setStandarError } from './error';
import {
  maxSizeValidation, minSizeValidation,
  isNotNumberValidation,
} from './generic_validations';

function number(currentValue, state, name) {
  const { numberErrors } = Errors;
  const numberState = state[name];
  const { rules, errors = [] } = numberState;
  const {
    format = 'int',
    maxSize = 7,
    minSize = 5,
    enforceZero = false,
  } = rules;

  const toWrite = maxSize - `${currentValue}`.length;
  let writeDot = false;

  numberState.valid = true;
  numberState.errorMessage = '';


  const isNotNumber = isNotNumberValidation(currentValue, numberErrors, errors,
    (valid, errorsArray, msg) => {
      numberState.errors = errorsArray;
      if (msg) {
        numberState.valid = valid;
        numberState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (isNotNumber) return { ...numberState };

  const maxError = maxSizeValidation(toWrite, maxSize, numberErrors, errors,
    (valid, errorsArray, msg) => {
      numberState.errors = errorsArray;
      if (msg) {
        numberState.valid = valid;
        numberState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...numberState };

  if (format === 'float' || format === 'int') {
    const { notInteger } = numberErrors;

    if (currentValue.includes('.') && format === 'int') {
      const errs = setStandarError(errors, notInteger.error);
      numberState.valid = false;
      numberState.errors = errs;
      numberState.errorMessage = notInteger.msg;
      return { ...numberState };
    }

    if (currentValue[currentValue.length - 1] === '.') writeDot = !writeDot;
  } else {
    const { invalidFormat } = numberErrors;
    throw new Error(`${invalidFormat.error} -> ${invalidFormat.message}`);
  }

  let virtualValue = currentValue;
  if (!writeDot && currentValue !== '') virtualValue = Number(currentValue);
  if (currentValue === '' && enforceZero) virtualValue = Number(currentValue);
  if (currentValue === '' && !enforceZero) virtualValue = '';

  numberState.value = virtualValue;
  numberState.toWrite = toWrite;

  minSizeValidation(toWrite, maxSize, minSize, numberErrors, numberState.errors,
    (valid, arrayErrors, msg) => {
      numberState.errors = arrayErrors;
      if (msg) {
        numberState.valid = valid;
        numberState.errorMessage = msg;
      }
    });

  return { ...numberState };
}

export default number;
