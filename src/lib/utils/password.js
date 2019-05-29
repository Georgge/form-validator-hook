import Errors from './errors.json';
import {
  maxSizeValidation, minSizeValidation, patternMatchValidation,
} from './generic_validations';

function password(currentValue, state, name) {
  const passwordState = state[name];
  const { rules, errors = [], customMessages } = passwordState;
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

  passwordState.valid = true;
  passwordState.errorMessage = '';


  const maxError = maxSizeValidation(toWrite, maxSize, passwordErrors, errors,
    (valid, errorsArray, msg) => {
      passwordState.errors = errorsArray;
      if (msg) {
        passwordState.valid = valid;
        passwordState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...passwordState };


  // Current value is setting in state
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
