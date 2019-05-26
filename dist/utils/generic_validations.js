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

export { maxSizeValidation, minSizeValidation, patternMatchValidation, isNumber, isNotNumberValidation };