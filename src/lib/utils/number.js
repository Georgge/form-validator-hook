import Errors from './errors.json';
import { setStandarError } from './error';
import {
  maxSizeValidation, minSizeValidation,
  isNotNumberValidation,
} from './generic_validations';

function number(currentValue, state, name, setState) {
  const numberState = state[name];
  const { rules, errors = [], customMessages } = numberState;
  const { numberErrors } = customMessages || Errors;
  const {
    format = 'int',
    maxSize = 7,
    minSize = 0,
    enforceZero = false,
  } = rules;

  const toWrite = maxSize - `${currentValue}`.length;
  let writeDot = false;


  const isNotNumber = isNotNumberValidation(currentValue, numberErrors, errors,
    (valid, errorsArray, msg) => {
      if (msg) {
        const currentMessage = numberState.errorMessage;
        setTimeout(() => {
          setState({
            ...state,
            [name]: {
              ...numberState,
              errorMessage: currentMessage,
            },
          });
        }, 1000);
        numberState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (isNotNumber) return { ...numberState };

  const maxError = maxSizeValidation(toWrite, maxSize, numberErrors, errors,
    (valid, errorsArray, msg) => {
      if (msg) {
        const currentMessage = numberState.errorMessage;
        setTimeout(() => {
          setState({
            ...state,
            [name]: {
              ...numberState,
              errorMessage: currentMessage,
            },
          });
        }, 1000);
        numberState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...numberState };

  numberState.valid = true;
  numberState.errorMessage = '';

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
