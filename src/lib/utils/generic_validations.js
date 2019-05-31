/* eslint-disable array-callback-return */
import {
  createMaxSizeError, createMinSizeError, setStandarError,
  removeStandarError,
} from './error';


function maxSizeValidation(toWrite, maxSize, errorCodes, currentErrors, callback) {
  const sizeError = createMaxSizeError(errorCodes, maxSize);
  if (toWrite + 1 === 0) {
    const errors = setStandarError(currentErrors, sizeError.error);
    return callback(false, errors, sizeError.message);
  }

  const errors = removeStandarError(currentErrors, sizeError.error);
  return callback(true, errors);
}


function minSizeValidation(toWrite, maxSize, minSize, errorCodes, currentErrors, callback) {
  const sizeError = createMinSizeError(errorCodes, minSize);
  if (toWrite > maxSize - minSize) {
    const errors = setStandarError(currentErrors, sizeError.error);
    return callback(false, errors, sizeError.message);
  }

  const errors = removeStandarError(currentErrors, sizeError.error);
  return callback(true, errors);
}


function patternMatchValidation(pattern, value, errorCodes, currentErrors, callback) {
  if (!pattern.test(value)) {
    const errors = setStandarError(currentErrors, errorCodes.error);
    return callback(false, errors, errorCodes.message);
  }

  const errors = removeStandarError(currentErrors, errorCodes.error);
  return callback(true, errors, '');
}


function isNumber(value) {
  return !Number.isNaN(Number(value));
}


function isNotNumberValidation(value, errorCodes, currentErrors, callback) {
  const isNum = isNumber(value);
  const { notNumber } = errorCodes;
  if (!isNum) {
    const errors = setStandarError(currentErrors, notNumber.error);
    return callback(false, errors, notNumber.message);
  }

  const errors = removeStandarError(currentErrors, notNumber.error);
  return callback(true, errors, '');
}


function hasRequiredValidation(inputFields, state, errorCodes, currentErrors, callback) {
  // eslint-disable-next-line consistent-return
  const validArray = [...inputFields].map((field) => {
    const { name } = field;
    const currentField = state[name];
    const { value } = currentField;

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
  return callback(true, notErrors);
}


function hasInvalidFieldsValidation(inputFields, state, errorCodes, currentErrors, callback) {
  const validArray = [...inputFields].map((field) => {
    const { name } = field;
    const currentField = state[name];

    if (currentField) {
      if (currentField.valid === false) {
        return false;
      }
      return true;
    }
    return 'fieldNotDefinedInState';
  });

  const validReduceArray = validArray.filter((item, index) => (
    validArray.indexOf(item) === index
  ));

  const errors = setStandarError(currentErrors, errorCodes.error);
  if (validReduceArray.includes(false)) return callback(false, errors, errorCodes.message);

  const notErrors = removeStandarError(currentErrors, errorCodes.error);
  return callback(true, notErrors);
}


function equalValuesValidation(valueOne, valueTwo, errorCode, currentErrors, callback) {
  if (valueOne !== valueTwo) {
    const errors = setStandarError(currentErrors, errorCode.error);
    return callback(false, errors, errorCode.message);
  }
  const errors = removeStandarError(currentErrors, errorCode.error);
  return callback(true, errors);
}


export {
  maxSizeValidation,
  minSizeValidation,
  patternMatchValidation,
  isNumber,
  isNotNumberValidation,
  hasRequiredValidation,
  hasInvalidFieldsValidation,
  equalValuesValidation,
};
