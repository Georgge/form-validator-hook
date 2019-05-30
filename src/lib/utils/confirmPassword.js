import Errors from './errors.json';
import { setTemporalError } from './error';
import {
  maxSizeValidation, minSizeValidation, equalValuesValidation,
} from './generic_validations';

function confirmPassword(currentValue, state, name, setState) {
  const confirmState = state[name];
  const {
    rules, errors = [], passwordFather, customMessages,
    temporalMessagesTime,
  } = confirmState;
  const { confirmPasswordErrors } = customMessages || Errors;
  const passwordState = passwordFather ? state[passwordFather] : false;
  const {
    maxSize = 16,
    minSize = 8,
  } = rules;

  const toWrite = maxSize - `${currentValue}`.length;

  if (passwordFather === '' || passwordFather === undefined) {
    const { notPasswordFather } = confirmPasswordErrors;
    throw new Error(`[${notPasswordFather.error}] ${notPasswordFather.message}`);
  }


  const maxError = maxSizeValidation(toWrite, maxSize, confirmPasswordErrors, errors,
    (valid, errorsArray, msg) => {
      if (msg) {
        const currentError = confirmState.errorMessage;
        setTemporalError(currentError, state, name, setState, temporalMessagesTime);
        confirmState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...confirmState };


  confirmState.valid = true;
  confirmState.errorMessage = '';
  confirmState.value = currentValue;
  confirmState.toWrite = toWrite;

  minSizeValidation(toWrite, maxSize, minSize, confirmPasswordErrors, confirmState.errors,
    (valid, errorsArray, msg) => {
      confirmState.errors = errorsArray;
      if (msg) {
        confirmState.valid = valid;
        confirmState.errorMessage = msg;
      }
    });

  if (passwordState) {
    const { value } = passwordState;
    const { notEqual } = confirmPasswordErrors;
    equalValuesValidation(currentValue, value, { ...notEqual }, confirmState.errors,
      (valid, errorsArray, msg) => {
        confirmState.errors = errorsArray;
        if (msg) {
          confirmState.valid = valid;
          confirmState.errorMessage = msg;
        }
      });
  }

  return { ...confirmState };
}

export default confirmPassword;
