import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/* eslint-disable array-callback-return */
import { createMaxSizeError, createMinSizeError, setStandarError, removeStandarError } from './error';

function maxSizeValidation(toWrite, maxSize, errorCodes, currentErrors, callback) {
  var sizeError = createMaxSizeError(errorCodes, maxSize);

  if (toWrite + 1 === 0) {
    var _errors = setStandarError(currentErrors, sizeError.error);

    return callback(_errors, sizeError.message);
  }

  var errors = removeStandarError(currentErrors, sizeError.error);
  return callback(errors, '');
}

function minSizeValidation(toWrite, maxSize, minSize, errorCodes, currentErrors, callback) {
  var sizeError = createMinSizeError(errorCodes, minSize);

  if (toWrite > maxSize - minSize) {
    var _errors2 = setStandarError(currentErrors, sizeError.error);

    return callback(_errors2, sizeError.message);
  }

  var errors = removeStandarError(currentErrors, sizeError.error);
  return callback(errors, '');
}

function patternMatchValidation(pattern, value, errorCodes, currentErrors, callback) {
  var notMatch = errorCodes.notMatch;

  if (!pattern.test(value)) {
    var _errors3 = setStandarError(currentErrors, notMatch.error);

    return callback(_errors3, notMatch.message);
  }

  var errors = removeStandarError(currentErrors, notMatch.error);
  return callback(errors, '');
}

function isNumber(value) {
  return !Number.isNaN(Number(value));
}

function isNotNumberValidation(value, errorCodes, currentErrors, callback) {
  var isNum = isNumber(value);
  var notNumber = errorCodes.notNumber;

  if (!isNum) {
    var _errors4 = setStandarError(currentErrors, notNumber.error);

    return callback(_errors4, notNumber.message);
  }

  var errors = removeStandarError(currentErrors, notNumber.error);
  return callback(errors, '');
}

function hasRequiredValidation(inputFields, state, errorCodes, currentErrors, callback) {
  // eslint-disable-next-line consistent-return
  var validArray = _toConsumableArray(inputFields).map(function (field) {
    var name = field.name,
        value = field.value;
    var currentField = state[name];

    if (currentField) {
      if (currentField.required && currentField.required === true) {
        if ("".concat(value).length > 0) return true;
        return false;
      }

      return 'notRequired';
    }

    return 'fieldNotDefinedInState';
  });

  var validReduceArray = validArray.filter(function (item, index) {
    return validArray.indexOf(item) === index;
  });
  var errors = setStandarError(currentErrors, errorCodes.error);
  if (validReduceArray.includes(false)) return callback(false, errors, errorCodes.message);
  var notErrors = removeStandarError(currentErrors, errorCodes.error); // if (validReduceArray.length === 1 && validReduceArray[0] === 'notRequired') {
  //   return callback(true);
  // }

  return callback(true, notErrors);
}

export { maxSizeValidation, minSizeValidation, patternMatchValidation, isNumber, isNotNumberValidation, hasRequiredValidation };