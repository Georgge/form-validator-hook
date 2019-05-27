/* eslint-disable array-callback-return */
import {
  createMaxSizeError, createMinSizeError, setStandarError,
  removeStandarError,
} from './error';


function maxSizeValidation(toWrite, maxSize, errorCodes, currentErrors, callback) {
  const sizeError = createMaxSizeError(errorCodes, maxSize);
  if (toWrite + 1 === 0) {
    const errors = setStandarError(currentErrors, sizeError.error);
    return callback(errors, sizeError.message);
  }

  const errors = removeStandarError(currentErrors, sizeError.error);
  return callback(errors, '');
}


function minSizeValidation(toWrite, maxSize, minSize, errorCodes, currentErrors, callback) {
  const sizeError = createMinSizeError(errorCodes, minSize);
  if (toWrite > maxSize - minSize) {
    const errors = setStandarError(currentErrors, sizeError.error);
    return callback(errors, sizeError.message);
  }

  const errors = removeStandarError(currentErrors, sizeError.error);
  return callback(errors, '');
}


function patternMatchValidation(pattern, value, errorCodes, currentErrors, callback) {
  const { notMatch } = errorCodes;
  if (!pattern.test(value)) {
    const errors = setStandarError(currentErrors, notMatch.error);
    return callback(errors, notMatch.message);
  }

  const errors = removeStandarError(currentErrors, notMatch.error);
  return callback(errors, '');
}

function isNumber(value) {
  return !Number.isNaN(Number(value));
}

function isNotNumberValidation(value, errorCodes, currentErrors, callback) {
  const isNum = isNumber(value);
  const { notNumber } = errorCodes;
  if (!isNum) {
    const errors = setStandarError(currentErrors, notNumber.error);
    return callback(errors, notNumber.message);
  }

  const errors = removeStandarError(currentErrors, notNumber.error);
  return callback(errors, '');
}

function hasRequiredValidation(inputFields, state, errorCodes, currentErrors, callback) {
  // eslint-disable-next-line consistent-return
  const validArray = [...inputFields].map((field) => {
    const { name, value } = field;
    const currentField = state[name];

    if (currentField) {
      if (currentField.required && currentField.required === true) {
        if (`${value}`.length > 0) return true;
        return false;
      }
      return 'notRequired';
    }
    return 'fieldNotDefinedInState';
  });

  const validReduceArray = validArray.filter((item, index) => (
    validArray.indexOf(item) === index
  ));

  const errors = setStandarError(currentErrors, errorCodes.error);
  if (validReduceArray.includes(false)) return callback(false, errors, errorCodes.message);

  const notErrors = removeStandarError(currentErrors, errorCodes.error);
  // if (validReduceArray.length === 1 && validReduceArray[0] === 'notRequired') {
  //   return callback(true);
  // }
  return callback(true, notErrors);
}


export {
  maxSizeValidation,
  minSizeValidation,
  patternMatchValidation,
  isNumber,
  isNotNumberValidation,
  hasRequiredValidation,
};
