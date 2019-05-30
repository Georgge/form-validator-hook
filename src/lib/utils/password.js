import Errors from './errors.json';
import { setTemporalError } from './error';
import {
  maxSizeValidation, minSizeValidation, patternMatchValidation,
} from './generic_validations';

function password(currentValue, state, name, setState) {
  const passwordState = state[name];
  const {
    rules, errors = [], customMessages, temporalMessagesTime,
  } = passwordState;
  const { passwordErrors } = customMessages || Errors;
  const {
    maxSize = 16,
    minSize = 8,
    upperCases = true,
    lowerCases = true,
    numbers = true,
    specials = true,
  } = rules;

  const toWrite = maxSize - `${currentValue}`.length;
  const fullSecurity = upperCases && lowerCases && numbers && specials;


  const maxError = maxSizeValidation(toWrite, maxSize, passwordErrors, errors,
    (valid, errorsArray, msg) => {
      if (msg) {
        const currentMessage = passwordState.errorMessage;
        console.log(currentMessage);
        setTemporalError(currentMessage, state, name, setState, temporalMessagesTime);
        passwordState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...passwordState };

  passwordState.valid = true;
  passwordState.errorMessage = '';
  passwordState.value = currentValue;
  passwordState.toWrite = toWrite;

  minSizeValidation(toWrite, maxSize, minSize, passwordErrors, passwordState.errors,
    (valid, errorsArray, msg) => {
      passwordState.errors = errorsArray;
      if (msg) {
        passwordState.valid = valid;
        passwordState.errorMessage = msg;
      }
    });

  if (fullSecurity) {
    const { fullSecurity: fse } = passwordErrors;
    const pattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*_-])[\w!@#$%^&*]/;
    patternMatchValidation(pattern, currentValue, { ...fse }, errors,
      (valid, errorsArray, msg) => {
        passwordState.errors = errorsArray;
        if (msg) {
          passwordState.valid = valid;
          passwordState.errorMessage = msg;
        }
      });
  }

  return { ...passwordState };
}

export default password;
